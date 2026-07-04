<script setup>
import katex from 'katex'
import MarkdownIt from 'markdown-it'
import { computed, onMounted, ref, watch } from 'vue'
import { notebookModules } from '../notebooks.generated'

const props = defineProps({
  path: {
    type: String,
    required: true,
  },
})

const md = new MarkdownIt({
  html: true,
  linkify: true,
  breaks: false,
})

const loading = ref(true)
const error = ref('')
const notebook = ref(null)

const normalizedPath = computed(() => {
  return props.path.startsWith('/') ? props.path : `/${props.path}`
})

const title = computed(() => {
  const metadataTitle = notebook.value?.metadata?.title
  if (metadataTitle) return metadataTitle

  const fileName = normalizedPath.value.split('/').pop() || 'Notebook'
  return fileName
    .replace(/\.ipynb$/i, '')
    .replace(/[_-]+/g, ' ')
    .replace(/\b\w/g, (letter) => letter.toUpperCase())
    .replace(/\bKl\b/g, 'KL')
    .replace(/\bMle\b/g, 'MLE')
    .replace(/\bLr\b/g, 'LR')
    .replace(/\bLp\b/g, 'Lp')
    .replace(/\bAdamw\b/g, 'AdamW')
})

const notebookStats = computed(() => {
  const cells = notebook.value?.cells || []
  const markdown = cells.filter((cell) => cell.cell_type === 'markdown').length
  const code = cells.filter((cell) => cell.cell_type === 'code').length
  const outputs = cells.reduce((count, cell) => count + (cell.outputs?.length || 0), 0)

  return [
    { label: 'Cells', value: cells.length },
    { label: 'Markdown', value: markdown },
    { label: 'Code', value: code },
    { label: 'Outputs', value: outputs },
  ]
})

const folderLabel = computed(() => {
  const parts = normalizedPath.value.split('/').filter(Boolean)
  return parts.length > 1 ? parts.slice(0, -1).join(' / ') : 'notebook'
})

function sourceToString(source) {
  if (Array.isArray(source)) return source.join('')
  return source || ''
}

function dataToString(value) {
  if (Array.isArray(value)) return value.join('')
  return value || ''
}

function escapeHtml(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

function highlightCode(source) {
  const code = sourceToString(source)
  const tokenPattern = /("""[\s\S]*?"""|'''[\s\S]*?'''|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|#[^\n]*|\b(?:False|None|True|and|as|assert|async|await|break|class|continue|def|del|elif|else|except|finally|for|from|global|if|import|in|is|lambda|nonlocal|not|or|pass|raise|return|try|while|with|yield)\b|\b(?:abs|dict|enumerate|filter|float|int|len|list|map|max|min|print|range|set|str|sum|tuple|zip)\b|\b\d+(?:\.\d+)?\b)/g
  let result = ''
  let lastIndex = 0

  for (const match of code.matchAll(tokenPattern)) {
    const token = match[0]
    const index = match.index || 0
    result += escapeHtml(code.slice(lastIndex, index))

    let className = 'nb-token-number'
    if (token.startsWith('#')) className = 'nb-token-comment'
    else if (token.startsWith('"') || token.startsWith("'")) className = 'nb-token-string'
    else if (/^(abs|dict|enumerate|filter|float|int|len|list|map|max|min|print|range|set|str|sum|tuple|zip)$/.test(token)) className = 'nb-token-builtin'
    else if (/^\d/.test(token)) className = 'nb-token-number'
    else className = 'nb-token-keyword'

    result += `<span class="${className}">${escapeHtml(token)}</span>`
    lastIndex = index + token.length
  }

  result += escapeHtml(code.slice(lastIndex))
  return result
}

function imageUrlFromText(value) {
  const match = value.match(/Image\(url=['"]([^'"]+)['"]/)
  return match?.[1] || ''
}

function renderFormula(formula, displayMode) {
  const normalizedFormula = formula
    .trim()
    .replace(/\\begin\{split\}/g, '\\begin{aligned}')
    .replace(/\\end\{split\}/g, '\\end{aligned}')

  try {
    const html = katex.renderToString(normalizedFormula, {
      displayMode,
      throwOnError: false,
      strict: false,
      trust: false,
    })
    return displayMode ? `<div class="notebook-math-display">${html}</div>` : `<span class="notebook-math-inline">${html}</span>`
  } catch {
    return `<pre class="notebook-math-fallback">${escapeHtml(formula.trim())}</pre>`
  }
}

function renderMarkdown(source) {
  const mathBlocks = []
  let content = sourceToString(source)

  function stashMath(formula, displayMode) {
    const token = `@@NOTEBOOK_MATH_${mathBlocks.length}@@`
    mathBlocks.push(renderFormula(formula, displayMode))
    return token
  }

  content = content
    .replace(/\$\$\s*([\s\S]*?)\s*\$\$/g, (_, formula) => stashMath(formula, true))
    .replace(/\\\[\s*([\s\S]*?)\s*\\\]/g, (_, formula) => stashMath(formula, true))
    .replace(/\\begin\{(aligned|split|equation|gather|align)\}[\s\S]*?\\end\{\1\}/g, (formula) => stashMath(formula, true))
    .replace(/(^|[^$])\$([^$\n]+)\$/g, (_, prefix, formula) => `${prefix}${stashMath(formula, false)}`)

  let html = md.render(content)
  mathBlocks.forEach((mathHtml, index) => {
    html = html.replaceAll(`@@NOTEBOOK_MATH_${index}@@`, mathHtml)
  })

  return html
}

function outputItems(output) {
  if (!output) return []

  if (output.output_type === 'stream') {
    return [{ type: 'text', value: dataToString(output.text) }]
  }

  if (output.output_type === 'error') {
    return [{ type: 'error', value: dataToString(output.traceback || output.evalue) }]
  }

  const data = output.data || {}
  const items = []

  if (data['text/html']) {
    items.push({ type: 'html', value: dataToString(data['text/html']) })
  }

  if (data['image/png']) {
    items.push({ type: 'image', mime: 'image/png', value: dataToString(data['image/png']) })
  }

  if (data['image/jpeg']) {
    items.push({ type: 'image', mime: 'image/jpeg', value: dataToString(data['image/jpeg']) })
  }

  if (data['image/svg+xml']) {
    items.push({ type: 'svg', value: dataToString(data['image/svg+xml']) })
  }

  if (!items.length && data['text/plain']) {
    const text = dataToString(data['text/plain'])
    const imageUrl = imageUrlFromText(text)
    items.push(imageUrl ? { type: 'remote-image', value: imageUrl } : { type: 'text', value: text })
  }

  return items
}

async function loadNotebook() {
  loading.value = true
  error.value = ''
  notebook.value = null

  const loader = notebookModules[normalizedPath.value]
  if (!loader) {
    error.value = `Notebook not found: ${normalizedPath.value}`
    loading.value = false
    return
  }

  try {
    const raw = await loader()
    notebook.value = JSON.parse(raw)
  } catch (err) {
    error.value = err instanceof Error ? err.message : String(err)
  } finally {
    loading.value = false
  }
}

onMounted(loadNotebook)
watch(() => props.path, loadNotebook)
</script>

<template>
  <section class="notebook-viewer">
    <div v-if="loading" class="notebook-state">Loading notebook...</div>
    <div v-else-if="error" class="notebook-state notebook-error">{{ error }}</div>

    <template v-else-if="notebook">
      <header class="notebook-header">
        <p class="notebook-eyebrow">Jupyter Notebook</p>
        <h1>{{ title }}</h1>
        <div class="notebook-meta">
          <span>{{ folderLabel }}</span>
          <span>{{ normalizedPath }}</span>
        </div>
        <dl class="notebook-stats">
          <div v-for="stat in notebookStats" :key="stat.label">
            <dt>{{ stat.label }}</dt>
            <dd>{{ stat.value }}</dd>
          </div>
        </dl>
      </header>

      <article class="notebook-cells">
        <section
          v-for="(cell, index) in notebook.cells"
          :key="index"
          class="notebook-cell"
          :class="`notebook-cell-${cell.cell_type}`"
        >
          <div v-if="cell.cell_type === 'markdown'" class="notebook-markdown" v-html="renderMarkdown(cell.source)" />

          <template v-else-if="cell.cell_type === 'code'">
            <div class="notebook-cell-bar">
              <span>Code cell {{ index + 1 }}</span>
              <span v-if="cell.outputs?.length">{{ cell.outputs.length }} output{{ cell.outputs.length > 1 ? 's' : '' }}</span>
            </div>
            <div class="notebook-input">
              <span class="notebook-prompt">In [{{ cell.execution_count ?? ' ' }}]</span>
              <pre><code v-html="highlightCode(cell.source)" /></pre>
            </div>

            <div v-if="cell.outputs?.length" class="notebook-outputs">
              <template v-for="(output, outputIndex) in cell.outputs" :key="outputIndex">
                <div class="notebook-output-label">Output {{ outputIndex + 1 }}</div>
                <div
                  v-for="(item, itemIndex) in outputItems(output)"
                  :key="`${outputIndex}-${itemIndex}`"
                  class="notebook-output"
                  :class="`notebook-output-${item.type}`"
                >
                  <div v-if="item.type === 'html'" v-html="item.value" />
                  <img v-else-if="item.type === 'image'" :src="`data:${item.mime};base64,${item.value}`" alt="Notebook output" />
                  <img v-else-if="item.type === 'remote-image'" :src="item.value" alt="Notebook output" />
                  <div v-else-if="item.type === 'svg'" v-html="item.value" />
                  <pre v-else>{{ item.value }}</pre>
                </div>
              </template>
            </div>
          </template>

          <pre v-else class="notebook-raw">{{ sourceToString(cell.source) }}</pre>
        </section>
      </article>
    </template>
  </section>
</template>
