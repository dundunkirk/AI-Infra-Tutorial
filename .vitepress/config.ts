import { defineConfig } from 'vitepress'
import mathjax3 from 'markdown-it-mathjax3'
import { generatedSidebar } from './sidebar.generated'

export default defineConfig({
  base: '/llm-lab/',
  title: 'llm-lab',
  description: 'LLM 原理与工程实践的个人学习记录',
  lang: 'zh-CN',
  srcExclude: ['README.md', 'AGENTS.md'],
  lastUpdated: true,

  markdown: {
    config: (md) => {
      md.use(mathjax3)
    },
  },

  themeConfig: {
    nav: [],

    sidebar: generatedSidebar,

    socialLinks: [
      { icon: 'github', link: 'https://github.com/dundunkirk/llm-lab' },
    ],

    search: {
      provider: 'local',
    },

    footer: {
      message: 'Personal notes on LLM fundamentals and engineering practice',
    },

    lastUpdated: {
      text: 'Last updated',
      formatOptions: {
        dateStyle: 'medium',
        timeStyle: 'short',
      },
    },

    docFooter: {
      prev: 'Previous',
      next: 'Next',
    },
  },
})
