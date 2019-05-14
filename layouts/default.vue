<template>
  <div id="app">
    <Loader/>
    <DragComponent v-if="$route.name === 'index'" :series="series" ref="dragComponent"/>
    <DragCursor ref="cursor" v-if="!$route.path.includes('about')" :class="[$route.name === 'index' ? 'homepage' : '']" />
    <FakeNav ref="fakeNav"/>
    <div ref="smoothComponent" :class="domLoaded ? 'loaded': ''" class="scroll-content">
      <nuxt ref="nuxt"/>
    </div>
    <FixedElements ref="fixedElements"/>
    <Navigation ref="nav" :class="[transitioning && 'transitioning', $route.name === 'index' && 'home',$route.name.toLowerCase() === 'serie-slug' && 'serie-page']"/>
    <ImageTransition/>
  </div>
</template>
<script>
import raf from '~/utils/raf.js'
import TweenLite from 'gsap'
import FixedElements from '~/components/FixedElements'
import FakeNav from '~/components/FakeNav'
import Navigation from "~/components/Navigation"
import DragCursor from '~/components/DragCursor'
import Loader from "~/components/Loader"
import DragComponent from "~/components/DragComponent"
import ImageTransition from "~/components/ImageTransition"
import browser from '~/utils/browser.js'


export default {
  components: {
    FakeNav,
    FixedElements,
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
      scrolled: 0,
      disableDragComponent: false,
      scroll: {y: 0},
      series: this.$store.getters.homeSeries
    }
  },
  mounted() {
    this.calcScroll()
    window.addEventListener('resize', this.resize)
    window.addEventListener('scroll', this.onScrollDefault)
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.onScrollDefault)
    window.removeEventListener('resize', this.resize)
  },
  methods: {
    calcScroll() {
      history.scrollRestoration = 'manual'
      this.$nextTick(() => {
        if(window.innerWidth > 768) raf.add(this.loopScrollAnimation)
        this.totalHeight = this.$refs.nuxt.$el.getBoundingClientRect().height
        TweenLite.set(this.$refs.smoothComponent, { height: this.totalHeight });
        TweenLite.set(this.$refs.fakeNav.$el, { height: this.totalHeight });
      })
    },
    onScrollDefault() {
      this.scrolled = -window.scrollY;
    },
    roundTwo(num) {
      return Math.floor(num * 100) / 100;
    },
    loopScrollAnimation() {
      this.scroll.y = this.roundTwo(0.1 * (this.scrolled - this.scroll.y) + this.scroll.y)
      TweenLite.set(this.$refs.smoothComponent, { y: this.scroll.y, force3D: true });
    },
    resetScroll() {
      TweenLite.set(this.$refs.smoothComponent, { height: '', y: 0 });
      TweenLite.set(this.$refs.fakeNav.$el, { height: '' });

      raf.remove(this.loopScrollAnimation)
    },
    resize () {
      if(window.innerWidth > 768) this.calcScroll()
      else this.resetScroll()
    },
  },
  watch: {
    '$route'(to, from) {
      this.$nextTick(() => {
        if(from.name === 'index' && browser.desktop && window.innerWidth > 768) {
          let position = window.scrollY
          this.$store.commit('SET_SCROLL_POSITION', position)
        }
      })
    }
  }
 }
</script>

