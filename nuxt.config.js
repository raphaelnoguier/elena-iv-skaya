
const pkg = require('./package')
const Prismic = require('prismic-javascript');
const prismicConfig = require('./prismic.config.js');


module.exports = {
  mode: 'universal',
  loading: {
    color: "rgba(255, 0, 255, 0)"
  },
  /*
  ** Headers
  */
  head: {
    title: pkg.name,
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
  },
  router: {
    scrollBehavior(to, from, savedPosition) {
      if (savedPosition) {
        return {x: 0, y: 0}
      }
    }
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
        return api.query("", { pageSize : 100 });
      }).then((response) => {
        let routes = response.results.map((doc) => {
          if(doc.type === 'commons') return ''
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
    postcss: [
      require('autoprefixer')({
        browsers: ['> 5%']
      })
    ]
  }
}
