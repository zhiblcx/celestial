import type { NavigationLink, Site, User } from './types.ts'

export const SITE: Site = {
  author: 'nicole',
  url: 'https://godruoyi.com',
  title: 'celestial',
  description: '',
  shortDescription: '',
}

export const NavigationLinks: NavigationLink[] = [
  { name: 'Posts', url: '/posts' },
  { name: 'Category', url: '/categories' },
  { name: 'Timeline', url: '/timeline' },
  { name: 'About', url: '/posts/gblog' },
  { name: 'Friends', url: '/friends' },
]

export const Friends: User[] = [
  //   {
  //     avatar: 'https://tcxx.info/wp-content/themes/StarryW/images/bg/me.jpg',
  //     social: {
  //       twitter: 'Tiancaixinxin',
  //       blog: 'https://tcxx.info/',
  //       github: 'TCXX',
  //     },
  //     title: '我不是天才，我只是甜菜。',
  //     name: '甜欣屋',
  //     description:
  //       '技术圈的欧阳娜娜，旅居美国硅谷，生命不息作死不止，探索人生无限可能，女权主义者，希望世界和平',
  //   },
]

export const FooterLinks = [
  {
    section: 'Blog',
    links: [
      { name: 'Posts', url: '/posts' },
      { name: 'Timeline', url: '/timeline' },
      { name: 'Categories', url: '/categories' },
      //   { name: 'About Me', url: '/posts/about-godruoyi' },
    ],
  },
  {
    section: 'Other',
    links: [
      //   { name: 'RSS', url: '/rss.xml' },
      //   { name: 'Site Map', url: '/sitemap-index.xml' },
      //   { name: 'Twitter', url: 'https://x.com/godruoyi' },
    ],
  },
]

export const GoogleAnalytics = {
  enable: true,
  id: 'G-TKQ4L3ZDSF',
}

export const SEO = {
  title: SITE.title,
  description: SITE.description,
  structuredData: {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    inLanguage: 'en-US',
    '@id': SITE.url,
    url: SITE.url,
    name: SITE.title,
    description: SITE.description,
    isPartOf: {
      '@type': 'WebSite',
      url: SITE.url,
      name: SITE.title,
      description: SITE.description,
    },
  },
}
