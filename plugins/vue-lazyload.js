import Vue from 'vue'
import VueLazyload from 'vue-lazyload'

Vue.use(VueLazyload, {
  observer: true,
  preLoad: 1.5,
  loading: require('~/assets/img/placeholder.png')
})