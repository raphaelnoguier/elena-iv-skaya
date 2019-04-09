<template>
  <div id="app">
    <Loader/>
    <div id="smooth-component" :data-background="isDark ? 'dark': ''" :class="domLoaded ? 'loaded': ''">
      <nuxt/>
    </div>
    <Navigation ref="nav" :class="transitioning ? 'transitioning': ''"/>
    <ImageTransition/>
  </div>
</template>
<script>
import LazyLoad from "vanilla-lazyload";
import Navigation from "~/components/Navigation"
import Loader from "~/components/Loader"
import scrollbar from "~/utils/scrollbar.js"
import ImageTransition from "~/components/ImageTransition"
import browser from '~/utils/browser.js'
import anime from 'animejs'

export default {
  components: {
    Navigation,
    ImageTransition,
    Loader,
  },
  data() {
    return {
      domLoaded: false,
      nav: null,
      container: null,
      transitionComponent: null,
      transitioning: false,
      isDark: false
    }
  },
  mounted() {
    this.container = this.$el.querySelector('#smooth-component')
    this.transitionComponent = this.container.querySelector('.transition-wrapper')
    window.addEventListener('resize', this.resize)

    if (browser.desktop && window.innerWidth > 768) {
      scrollbar.add(this.container, this.onScrollDefault)
    }
  },
  updated() {
    console.log('change')
    this.lazyLoadAssets()
  },
  beforeDestroy() {
    if(browser.desktop && window.innerWidth > 768) {
      scrollbar.unlisten(this.container, this.onScrollDefault)
      scrollbar.destroyAll()
      window.removeEventListener('resize', this.resize)
    }
  },
  methods: {
    lazyLoadAssets() {
      let lazyLoadInstance = new LazyLoad({
        elements_selector: "img",
        threshold: 500
      });
    },
    resize () {
      if (browser.desktop && window.innerWidth > 768) {
        scrollbar.add(this.container, this.onScrollDefault)
      } else {
        scrollbar.destroyAll()
      }
    },
    onScrollDefault(status) {
    }
  },
  watch: {
    '$route'(to, from) {
      this.$nextTick(() => {
        //keep scroll pos on going back to index
        if(from.name === 'index' && browser.desktop && window.innerWidth > 768) {
          let position = scrollbar.getOffset(this.container)
          this.$store.commit('SET_SCROLL_POSITION', position)
        }
      })
    }
  }
 }
</script>

