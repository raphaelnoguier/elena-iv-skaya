<template>
  <div id="app" :class="{ 'loaded': domLoaded, 'dark': $route.name === 'about' || $route.name === 'About' }">
    <Loader/>
    <Navigation/>
    <ImageTransition/>
    <nuxt/>
  </div>
</template>
<script>
import Navigation from "~/components/Navigation"
import Loader from "~/components/Loader"
import scrollbar from "~/utils/scrollbar.js"
import ImageTransition from "~/components/ImageTransition"
import browser from '~/utils/browser.js'

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
    }
  },
  mounted() {
    this.container = this.$el
    this.nav = this.container.querySelector('.nav')
    this.transitionComponent = this.container.querySelector('.transition-wrapper')
    window.addEventListener('resize', this.resize)

    if (browser.desktop && window.innerWidth > 768) {
      scrollbar.add(this.container, this.onScrollDefault)
    }
  },
  beforeDestroy() {
    if(browser.desktop && window.innerWidth > 768) {
      scrollbar.unlisten(this.container, this.onScrollDefault)
      scrollbar.destroyAll()
      window.removeEventListener('resize', this.resize)
    }
  },
  methods: {
    resize () {
      if (browser.desktop && window.innerWidth > 768) {
        scrollbar.add(this.container, this.onScrollDefault)
      } else {
        scrollbar.destroyAll()
        this.nav.style.top = 0
      }
    },
    onScrollDefault(status) {
      let offset = status.offset
      this.nav.style.top = offset.y + 'px'
      this.transitionComponent.style.top = offset.y + 'px'
    }
  },
  watch: {
    '$route'(to, from) {
      this.$nextTick(() => {
        //keep scroll pos on going back to index
        if(from.name === 'index' && browser.desktop && window.innerWidth > 768) {
          let position = scrollbar.getOffset(this.$el)
          this.$store.commit('SET_SCROLL_POSITION', position)
        }
      })
    }
  }
 }
</script>

