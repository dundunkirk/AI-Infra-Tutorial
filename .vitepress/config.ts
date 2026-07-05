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
  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/llm-lab/favicon.svg' }],
  ],

  markdown: {
    config: (md) => {
      md.use(mathjax3)
    },
  },

  themeConfig: {
    nav: [],

    sidebar: generatedSidebar,

    socialLinks: [
      {
        icon: {
          svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M3 12h18"/><path d="M12 3c2.5 2.6 3.8 5.8 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.8-3.8-9s1.3-6.4 3.8-9z"/></svg>',
        },
        link: 'https://zeztzchen.github.io/daily-llm-board/',
        ariaLabel: 'Daily LLM Board',
      },
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
