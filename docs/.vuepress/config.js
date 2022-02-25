module.exports = {
  lang: 'en-US',
  title: 'Lando',
  description: 'Lando Laravel Plugin Documentation',
  base: '/laravel/',
  head: [
    ['meta', {name: 'viewport', content: 'width=device-width, initial-scale=1'}],
    ['link', {rel: 'icon', href: '/laravel/favicon.ico', size: 'any'}],
    ['link', {rel: 'icon', href: '/laravel/favicon.svg', type: 'image/svg+xml'}],
    ['link', {rel: 'preconnect', href: '//fonts.googleapis.com'}],
    ['link', {rel: 'preconnect', href: '//fonts.gstatic.com', crossorigin: true}],
    ['link', {rel: 'stylesheet', href: '//fonts.googleapis.com/css2?family=Lexend:wght@500&display=swap'}],
  ],
  theme: '@lando/vuepress-theme-default-plus',
  themeConfig: {
    landoDocs: true,
    logo: '/images/icon.svg',
    docsDir: 'docs',
    docsBranch: 'main',
    repo: 'lando/laravel',
    sidebarHeader: {
      enabled: true,
      title: 'Laravel Plugin',
      icon: '/images/laravelicon.png',
    },
    sidebar: [
      {
        text: 'Overview',
        link: '/index.md',
      },
      '/getting-started.md',
      '/config.md',
      '/tooling.md',
      {
        text: 'Guides',
        collapsible: true,
        children: [
          {
            text: 'Importing a remote database and files into Lando using Laravel Envoy',
            link: '/import-remote-db-laravel-envoy.md',
          },
        ],
      },
      '/support.md',
      {text: 'Examples', link: 'https://github.com/lando/laravel/tree/main/examples'},
      {text: 'Release Notes', link: 'https://github.com/lando/laravel/releases'},
      '/development.md',
    ],
  },
};
