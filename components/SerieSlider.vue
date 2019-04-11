<template>
  <div class="serie-slider-wrapper">
    <div class="line"></div>
    <div class="serie-slider-title">
      <span>Gallery</span>
    </div>
    <div ref="slider" class="serie-slider">
      <div class="slider-item" v-for="(item, i) in nextSeries" :key="i">
        <div class="serie-gallery-mask left"></div>
        <nuxt-link :to="`/serie/${item.serie. uid}`">
          <ResponsiveImage v-if="item.serie.data.cover_ratio.includes('Landscape')" :image-url="`${item.serie.data.fallback_landscape_cover.url}`" :width-on-screen="83" :width-on-screen-tablet="83" :width-on-screen-smartphone="83" :mode="'all'"/>
          <ResponsiveImage v-else :image-url="`${item.serie.data.cover_serie_image.url}`" :width-on-screen="83" :width-on-screen-tablet="83" :width-on-screen-smartphone="83" :mode="'all'"/>
        </nuxt-link>
        <div class="serie-gallery-mask right"></div>
      </div>
    </div>
    <div class="slider-controls">
      <div class="upper">
        <div class="play">
          <img data-load="preload" src="~/assets/img/ui/play.svg">
        </div>
        <div class="titles">
          <div class="blur"></div>
          <div ref="titlesWrapper" class="titles-wrapper">
            <div v-for="(item, i) in nextSeries" :key="i">
              {{item.serie.data.title[0].text}}
            </div>
          </div>
        </div>
        <div class="index">
          <span class="current"><span ref="index">1</span> /</span>
          <span class="total">{{nextSeries.length}}</span>
        </div>
      </div>
      <div class="bottom">
        <div ref="progress" class="progress"></div>
      </div>
    </div>
  </div>
</template>

<script>
import ResponsiveImage from '~/components/ResponsiveImage'
import math from '~/utils/math.js'
import lerp from '~/utils/lerp.js'
import raf from '~/utils/raf.js'
import browser from '~/utils/browser.js'

export default {
  components: {
    ResponsiveImage
  },
  data() {
    return {
      index: 0,
      cursor: null,
      progress: 0,
      xPosition: 0,
      downPosition: 0,
      downX: 0,
      isDrag: false,
      dragStep: browser.desktop ? 250 : 150,
      lerp: lerp(),
      containerBounds: null,
      sliderContent: null,
      titleContainer: null,
      running: false,
      covers: null
    }
  },
  mounted() {
    this.containerBounds = this.$el.getBoundingClientRect()
    this.sliderContent = this.$refs.slider
    this.sliderContentBounds = this.sliderContent.getBoundingClientRect()
    this.cursor = this.$parent.$parent.$parent.$refs.cursor.$el
    this.titleContainer = this.$refs.titlesWrapper
    this.progress = this.$refs.progress
    this.covers = [].slice.call(this.sliderContent.querySelectorAll('.serie-slider .slider-item img'))

    this.$el.addEventListener('mousemove', this.moveCursor)
    this.$el.addEventListener('mouseleave', this.exit)

    window.addEventListener('resize', this.resize)
    this.$el.addEventListener('mouseup', this.up)
    this.$el.addEventListener('mousedown', this.down)
    this.$el.addEventListener('mousemove', this.move)

    this.sliderContent.addEventListener('touchstart', this.down)
    this.sliderContent.addEventListener('touchend', this.up)
    this.sliderContent.addEventListener('touchmove', this.move)
  },
  beforeDestroy() {
    this.toggleRaf()
    this.$el.removeEventListener('mousemove', this.moveCursor)
    this.$el.removeEventListener('mouseleave', this.exit)

    window.removeEventListener('resize', this.resize)
    this.$el.removeEventListener('mouseup', this.up)
    this.$el.removeEventListener('mousedown', this.down)
    this.$el.removeEventListener('mousemove', this.move)

    this.sliderContent.removeEventListener('touchstart', this.down)
    this.sliderContent.removeEventListener('touchend', this.up)
    this.sliderContent.removeEventListener('touchmove', this.move)
  },
  methods: {
    toggleRaf() {
      this.running = !this.running
      if(this.running) raf.add(this.tick)
      else raf.remove(this.tick)
    },
    toggleCursor() {
      this.cursor.classList.toggle('visible')
    },
    moveCursor(cursor) {
      if(window.innerWidth < 768) return;
      this.cursor.style.transform = `translate3d(${cursor.x}px, ${cursor.y}px, 0)`
    },
    up() {
      this.isDrag = false;
      this.cursor.classList.remove('focus')
      this.xPosition = this.index
      this.lerp.set(this.index)

      for (let i = 0; i < this.covers.length; i++) {
        this.covers[this.index].style.transform = `translate3d(0,0, 0)`
      }
    },
    down(cursor) {
      this.isDrag = true
      this.cursor.classList.add('focus')
      browser.desktop ? this.downX = cursor.x : this.downX = cursor.touches[0].clientX
      this.downPosition = this.xPosition
    },
    move(cursor) {
      if(!this.isDrag) return;
      browser.desktop ? this.moveX = cursor.x : this.moveX = cursor.touches[0].clientX
      const translateX = this.moveX - this.downX
      const mappedX = translateX > 0 ? math.map(translateX, 0, this.dragStep, 0, 1) : math.map(translateX, 0, -this.dragStep, 0, -1)
      const pos = math.clamp(this.downPosition - mappedX, 0, this.nextSeries.length - 1)

      this.parralax(mappedX)

      this.setPosition(pos)
    },
    parralax(x) {
      let transform = math.clamp(x * 20, -20, 20)
      for (let i = 0; i < this.covers.length; i++) {
        this.covers[i].style.transform = `translate3d(${transform}px,0, 0)`
      }
    },
    setPosition (x) {
      const intPos = Math.round(x)
      this.xPosition = x
      if (intPos !== this.index) this.index = intPos
      this.$refs.index.innerHTML = this.index + 1
      this.lerp.set(x)
    },
    tick() {
      this.sliderContent.classList.toggle('drag', this.isDrag)
      this.lerp.update(0.10)

      const percentTranslate = math.map(this.lerp.get(), 0, this.nextSeries.length - 1, 0, 1)
      const size = this.sliderContentBounds.width - this.vw(20);
      const x = percentTranslate * size

      this.sliderContent.style.transform = `translate3d(-${x}px, 0, 0)`
      this.titleContainer.style.transform = `translate3d(-${x}px, 0, 0)`
      this.progress.style.width = `${percentTranslate * 100}%`
    },
    resize () {
      this.containerBounds = this.$el.getBoundingClientRect()
      this.sliderContentBounds =  this.sliderContent.getBoundingClientRect()
    },
    vw(v) {
      var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
      return (v * w) / 100;
    },
    exit() {
      this.isDrag = false
      this.up()
    },
  },
  props: {nextSeries: Array}
}
</script>

<style>

</style>
