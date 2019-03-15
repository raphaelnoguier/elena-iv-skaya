const pkg = require('./package')
const Prismic = require('prismic-javascript');
const PrismicDOM = require('prismic-dom');
const prismicConfig = require('./prismic.config.js');


module.exports = {
  mode: 'universal',

  /*
  ** Headers
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
  ** Global CSS
  */
  css: [
    '~/assets/scss/main.scss'
  ],

  /*
  ** Plugins
  */
  plugins: [
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    ['prismic-nuxt', {
      endpoint: prismicConfig.apiEndpoint,
      linkResolver:prismicConfig.linkResolver,
      htmlSerializer: function (type, element, content, children) {
        // console.log(type,element, content, children);
        // PrismicDOM.RichText.asHtml(content, linkResolver, htmlSerializer)
      }
    }]
  ],
  generate: {
    routes: function (callback) {
      Prismic.getApi(prismicConfig.apiEndpoint)
      .then((api) => {
        return api.query("");
      }).then((response) => {
        let routes = response.results.map((doc) => {
          if(doc.type === 'page' || doc.type === 'about') {
            return '/' + doc.uid
          }
          else if (doc.type === 'serie') {
            return '/serie/' + doc.uid
          }
        })
        callback(null, routes)
      })
      .catch(callback)
    }
  },
  /*
  ** Build configuration
  */
  build: {
    extend(config, ctx) {

    }
  }
}
