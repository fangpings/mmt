import { readFileSync, readdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vitepress'

const root = fileURLToPath(new URL('../', import.meta.url))
const files = readdirSync(root).filter(file => file.endsWith('.md')).sort()
const page = (file: string) => ({
  text: readFileSync(`${root}${file}`, 'utf8').match(/^# (.+)$/m)?.[1] ?? file,
  link: file === 'README.md' ? '/' : `/${file.replace(/\.md$/, '')}`
})
const chapters = (from: number, to: number) => files
  .filter(file => /^\d{2}-.+\.md$/.test(file) && Number(file.slice(0, 2)) >= from && Number(file.slice(0, 2)) <= to)
  .map(page)

// VitePress serializes this function for both search indexing and querying.
function tokenize(text: string) {
  return Array.from(new Intl.Segmenter('zh-CN', { granularity: 'word' }).segment(text))
    .filter(part => part.isWordLike)
    .map(part => part.segment)
}

export default defineConfig({
  base: '/mmt/',
  lang: 'zh-CN',
  title: '凯恩斯主义与现代货币理论',
  description: '从有效需求到财政货币制度：理论、账户、政策与中美比较',
  rewrites: { 'README.md': 'index.md' },
  markdown: {
    config(md) {
      const normalizeLink = md.normalizeLink.bind(md)
      md.normalizeLink = (url: string) => {
        // Keep local Markdown portable while publishing sibling-repo references.
        const sibling = url.match(/^\.\.\/\.\.\/(us-econ|cn-econ)\/textbook\/(.+)\.md([?#].*)?$/)
        if (sibling) {
          const [, repo, slug, suffix = ''] = sibling
          return normalizeLink(`https://fangpings.github.io/${repo}/${slug === 'README' ? '' : `${slug}.html`}${suffix}`)
        }
        return normalizeLink(url.replace(/^(?:\.\/)?README\.md(?=[?#]|$)/, './'))
      }
    }
  },
  themeConfig: {
    siteTitle: '凯恩斯主义与 MMT',
    nav: [
      { text: '全书目录', link: '/' },
      { text: '开始阅读', link: '/01-what-are-we-comparing' },
      { text: '核心争论', link: '/appendix-d-disputes' },
      { text: '中美教材', items: [
        { text: '美国经济', link: 'https://fangpings.github.io/us-econ/' },
        { text: '中国经济', link: 'https://fangpings.github.io/cn-econ/' }
      ] }
    ],
    socialLinks: [{ icon: 'github', link: 'https://github.com/fangpings/mmt' }],
    sidebar: [
      { text: '阅读入口', items: [{ text: '全书目录与阅读路线', link: '/' }] },
      ...([
        ['第一篇 · 建立共同语言', 1, 4],
        ['第二篇 · 传统凯恩斯主义', 5, 9],
        ['第三篇 · MMT 的理论结构', 10, 14],
        ['第四篇 · 财政与货币操作', 15, 18],
        ['第五篇 · 政策分歧', 19, 24],
        ['第六篇 · 历史与中美制度', 25, 27],
        ['第七篇 · 独立政策设计', 28, 28]
      ] as const).map(([text, from, to]) => ({ text, collapsed: false, items: chapters(from, to) })),
      { text: '配套附录', collapsed: false, items: files.filter(file => file.startsWith('appendix-')).map(page) }
    ],
    outline: { level: [2, 3], label: '本页目录' },
    docFooter: { prev: '上一节', next: '下一节' },
    sidebarMenuLabel: '章节目录',
    darkModeSwitchLabel: '切换外观',
    lightModeSwitchTitle: '切换为浅色',
    darkModeSwitchTitle: '切换为深色',
    returnToTopLabel: '回到顶部',
    search: {
      provider: 'local',
      options: {
        miniSearch: { options: { tokenize } },
        translations: {
          button: { buttonText: '搜索教材', buttonAriaLabel: '搜索教材' },
          modal: {
            displayDetails: '显示详情',
            resetButtonTitle: '清除搜索',
            backButtonTitle: '返回',
            noResultsText: '没有找到相关内容',
            footer: { selectText: '选择', navigateText: '切换', closeText: '关闭' }
          }
        }
      }
    }
  }
})
