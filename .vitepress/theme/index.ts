import DefaultTheme from 'vitepress/theme'
import HomeLanding from './HomeLanding.vue'
import NotebookViewer from './NotebookViewer.vue'
import 'katex/dist/katex.min.css'
import './style.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('HomeLanding', HomeLanding)
    app.component('NotebookViewer', NotebookViewer)
  },
}
