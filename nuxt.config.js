const pkg = require('./package')
const Prismic = require('prismic-javascript');
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
  ],
  generate: {
    routes: function (callback) {
      Prismic.getApi(prismicConfig.apiEndpoint)
      .then((api) => {
        return api.query("");
      }).then((response) => {
        let routes = response.results.map((doc) => {
          if(doc.type === 'page' || doc.type === 'about') {
            return '/about' , '/'
          }
          if (doc.type === 'serie') {
            return '/serie/' + doc.uid
          }
        })
        routes.push('404');
        callback(null, routes)
      }), function(err) {
        console(err);
      };
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
