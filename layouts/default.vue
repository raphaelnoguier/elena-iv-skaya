<template>
  <div id="app">
    <Loader/>
    <DragComponent v-if="$route.name === 'index'" :series="$store.getters.currentDoc.data.series" ref="dragComponent"/>
    <DragCursor ref="cursor" v-if="!$route.path.includes('about')" :class="$route.name === 'index' && 'homepage'" />
    <div id="smooth-component" :class="domLoaded ? 'loaded': ''">
      <nuxt/>
    </div>
    <Navigation ref="nav" :class="[transitioning && 'transitioning', $route.name === 'index' && 'home',$route.name.toLowerCase() === 'serie-slug' && 'serie-page']"/>
    <ImageTransition/>
  </div>
</template>
<script>
import Navigation from "~/components/Navigation"
import DragCursor from '~/components/DragCursor'
import Loader from "~/components/Loader"
import scrollbar from "~/utils/scrollbar.js"
import DragComponent from "~/components/DragComponent"
import ImageTransition from "~/components/ImageTransition"
import browser from '~/utils/browser.js'
import anime from 'animejs'

export default {
  components: {
    Navigation,
    DragComponent,
    ImageTransition,
    Loader,
    DragCursor
  },
  data() {
    return {
      domLoaded: false,
      transitioning: false,
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
      }
    },
  },
  watch: {
    '$route'(to, from) {
      this.$nextTick(() => {
        if(from.name === 'index' && browser.desktop && window.innerWidth > 768) {
          let position = scrollbar.getOffset(this.container)
          this.$store.commit('SET_SCROLL_POSITION', position)
        }
      })
    }
  }
 }
</script>

