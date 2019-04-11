
const pkg = require('./package')
const Prismic = require('prismic-javascript');
const prismicConfig = require('./prismic.config.js');
const anime = require('./node_modules/animejs/lib/anime')


module.exports = {
  mode: 'universal',
  loading: false,
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
    {
      src: '~/plugins/vue-lazyload',
      ssr: false
    }
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
  ],
  generate: {
    routes: function (callback) {
      Prismic.getApi(prismicConfig.apiEndpoint, { accessToken: prismicConfig.accessToken })
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
