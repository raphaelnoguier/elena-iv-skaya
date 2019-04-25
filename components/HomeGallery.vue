<template>
  <div class="gallery-wrapper" ref="gallery">
    <div v-for="(serie, index) in series" :key="index" class="gallery-item-wrapper" :class="serie.serie.data.cover_ratio.includes('Big') && 'full'">
      <div class="gallery-item" :class="getClass(serie.serie.data.cover_ratio)">
        <nuxt-link v-on:click.native="updateTransitionImg(serie.serie.data.cover_serie_image.url, index)" :to="`/serie/${serie.serie.uid}`">
          <img :src="serie.serie.data.cover_serie_image.url" alt="home-gallery-cover" />
          <div class="item-title">
            <h3>{{serie.serie.data.title[0].text}}</h3>
            <span>{{serie.serie.data.category}}</span>
          </div>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
import calcOffset from '~/utils/offset.js';
import scrollbar from "~/utils/scrollbar.js"
import reveal from "~/utils/reveal.js"
import browser from '~/utils/browser.js'
import math from '~/utils/math.js'
import lerp from '~/utils/lerp.js'
import raf from '~/utils/raf.js'
export default {
  data() {
    return {
      appContainer: null,
      galleryItems: null,
      parallax: [],
      offsetY: 0,
      running: false,
      index: 0,
      yPosition: 0,
      scrollPosition: 0,
      downPosition: 0,
      downY: 0,
      isDrag: false,
      dragStep: 50,
      lerp: lerp(),
      containerBounds: null,
      homeHeaderBounds: null,
      sliderContent: null,
    }
  },
  mounted () {
    this.appContainer = document.getElementById('smooth-component')
    this.containerBounds = this.$el.getBoundingClientRect()
    this.sliderContent = this.$el
    this.homeHeaderBounds = this.$parent.$refs.homeHeader.$el.getBoundingClientRect()
    this.progressDrag = this.$parent.$refs.homeHeader.$refs.progressDrag

    this.$parent.$el.addEventListener('mousemove', this.moveCursor)
    this.$el.addEventListener('mouseenter', this.enter)
    this.$el.addEventListener('mouseleave', this.exit)

    window.addEventListener('resize', this.resize)
    this.$el.addEventListener('mouseup', this.up)
    this.$el.addEventListener('mousedown', this.down)
    this.$el.addEventListener('mousemove', this.move)

    this.sliderContent.addEventListener('touchstart', this.down)
    this.sliderContent.addEventListener('touchend', this.up)
    this.sliderContent.addEventListener('touchmove', this.move)

    this.$nextTick(() => {
      if (window.innerWidth > 768 && browser.desktop) {
        this.galleryItems = this.$refs.gallery.querySelectorAll('.gallery-item')
        this.toggleRaf()
        this.initParallax()
      }
    })
  },
  beforeDestroy() {
    if (window.innerWidth > 768 && browser.desktop) this.toggleRaf()
  },
  methods: {
    // PARALLAX //
    toggleRaf() {
      // this.running = !this.running
      // if(this.running) raf.add(this.tickPrlx)
      // else raf.remove(this.tickPrlx)
    },
    initParallax() {
      this.galleryItems.forEach((item, i) => {
        if(i = 0) return
        this.parallax.push({ offsetTop: item.parentNode.offsetTop, height: item.getBoundingClientRect().height, bloc: item})
      });
    },
    tickPrlx() {
      const wHeight =  window.innerHeight

      for (let i = 0; i < this.parallax.length; i++) {
        const bloc = this.parallax[i].bloc
        const offsetTop = -this.offsetY + this.parallax[i].offsetTop

        const min = (-wHeight * 0.5) - wHeight * 0.75
        const max = wHeight + (wHeight * 0.75)

        if (offsetTop > min && offsetTop < max) {
          const y = math.map(offsetTop, min, max, 0, 450)
          this.transform(bloc, y)
        }
      }
    },
    transform(bloc, y) {
      bloc.style.transform = `translate3d(0px, ${y}px, 0)`
    },
    resetParallax() {
      for (let i = 0; i < this.parallax.length; i++) {
        const bloc = this.parallax[i].bloc
        bloc.style.transform = 'translate3d(0, 0, 0)'
      }
    },
    updateTransitionImg(serieCover, index) {
      this.$el.querySelector(`.gallery-item-wrapper:nth-child(${index + 1}) img`).classList.add('active-link')
      this.$store.getters.currentDoc.data.loader_image.url = serieCover
    },
    getClass(ratio) {
      if(ratio.includes('Big')){
        return 'full'
      }
      if (ratio.includes('Landscape')) {
        return 'landscape'
      }
      if (ratio.includes('Portrait')) {
        return 'portrait'
      }
    },
    // DRAG //
    initPos() {
      this.galleryItems[0].parentNode.addEventListener('transitionend', this.prepareDrag)
    },
    prepareDrag() {
      this.isDrag = true
      this.sliderContentBounds = this.sliderContent.getBoundingClientRect()
      this.galleryItems[0].parentNode.removeEventListener('transitionend', this.prepareDrag)
      raf.add(this.tick)
    },
    down(cursor) {
      this.initPos()
      this.lerp.immediateSet(this.index)

      this.downY = cursor.y
      this.downPosition = this.yPosition

      this.sliderContent.classList.add('drag', 'no-events')
      this.$parent.setTheme('dark')
    },
    move(cursor) {
      if(!this.isDrag) return
      this.moveY = cursor.y

      const translateY = this.moveY - this.downY
      const mappedY = translateY > 0 ? math.map(translateY, 0, this.dragStep, 0, 1) : math.map(translateY, 0, -this.dragStep, 0, -1)
      const pos = math.clamp(this.downPosition - mappedY, 0, this.series.length)

      this.setPosition(pos)
    },
    setPosition (y) {
      const intPos = Math.floor(y)
      if (intPos !== this.index) this.index = intPos

      this.yPosition = y
      this.lerp.set(y)
    },
    tick() {
      this.lerp.update(0.10)

      const percentTranslate = math.map(this.lerp.get(), 0, this.series.length, 0, 1)
      const size = this.sliderContentBounds.height
      const y = percentTranslate * size

      this.progressDrag.style.transform = `scale3d(1, ${percentTranslate}, 1)`
      scrollbar.setPosition(this.appContainer, y + (calcOffset.get(this.sliderContent).top + this.vw(21.875)) - (window.innerHeight * 0.5))
    },
    up() {
      this.isDrag = false

      this.$parent.setTheme('white')
      this.sliderContent.classList.remove('no-events', 'drag')

      scrollbar.setPosition(this.appContainer, (calcOffset.get(this.galleryItems[this.index]).top + this.vw(21.875)) - (window.innerHeight * 0.5))
      raf.remove(this.tick)
    },
    resize () {
      this.homeHeaderBounds = this.$parent.$refs.homeHeader.$el.getBoundingClientRect()
      this.containerBounds = this.$el.getBoundingClientRect()
      this.sliderContentBounds =  this.sliderContent.getBoundingClientRect()

      this.initParallax()
    },
    vw(v) {
      var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0)
      return (v * w) / 100
    },
    exit() {
      this.isDrag = false
    },
  },
  props: { series: Array }
}
</script>

