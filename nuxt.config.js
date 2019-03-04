const pkg = require('./package')


module.exports = {
  mode: 'universal',

  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  /*
  ** Global CSS
  */
  css: [
    '~/assets/scss/main.scss'
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    ['prismic-nuxt', {
      endpoint: 'https://elena-iv-skaya.cdn.prismic.io/api/v2',
      deferLoad: true,
      linkResolver: function (doc, ctx) {
        if (doc.type === 'home') {
          return '/';
        }
        if (doc.type === 'about') {
          return '/about';
        }
        if (doc.type === 'series') {
          return '/series';
        }
        return '/';
      },
      htmlSerializer: function (type, element, content, children) {
        // Optional HTML Serializer
      }
    }]
  ],

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {

    }
  }
}
