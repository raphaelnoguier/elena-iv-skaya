<template>
  <div class="serie-slider-wrapper down-enter">
    <SerieSliderCursor/>
    <div class="line"></div>
    <div class="serie-slider-title">
      <span>Gallery</span>
    </div>
    <div class="serie-slider">
      <div class="slider-item" v-for="(item, i) in nextSeries" :key="i">
        <div class="serie-gallery-mask left"></div>
        <nuxt-link :to="`/serie/${item.serie. uid}`">
          <img v-if="item.serie.data.cover_ratio.includes('Landscape')" :src="item.serie.data.fallback_landscape_cover.url">
          <img v-else data-load="preload" :src="item.serie.data.cover_serie_image.url">
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
          <div class="titles-wrapper">
            <div v-for="(item, i) in nextSeries" :key="i">
              {{item.serie.data.title[0].text}}
            </div>
          </div>
        </div>
        <div class="index">
          <span class="current">{{this.index + 1}} /</span>
          <span class="total">{{nextSeries.length}}</span>
        </div>
      </div>
      <div class="bottom">
        <div class="progress"></div>
      </div>
    </div>
  </div>
</template>

<script>
import SerieSliderCursor from '~/components/SerieSliderCursor'
import math from '~/utils/math.js'
import lerp from '~/utils/lerp.js'
import raf from '~/utils/raf.js'
import browser from '~/utils/browser.js'

export default {
  components: {
    SerieSliderCursor
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
      dragStep: browser.desktop ? 250 : 50,
      lerp: lerp(),
      containerBounds: null,
      sliderContent: null,
      titleContainer: null,
    }
  },
  mounted() {
    this.containerBounds = this.$el.getBoundingClientRect()
    this.sliderContent = this.$el.querySelector('.serie-slider')
    this.sliderContentBounds = this.sliderContent.getBoundingClientRect()
    this.cursor = this.$el.querySelector('.serie-slider-cursor')
    this.titleContainer = this.$el.querySelector('.slider-controls .titles-wrapper')
    this.progress = this.$el.querySelector('.slider-controls .bottom .progress')

    raf.add(this.tick)

    this.$el.addEventListener('mouseenter', this.enableCursor)
    this.$el.addEventListener('mousemove', this.moveCursor)
    this.$el.addEventListener('mouseleave', this.exitSection)

    window.addEventListener('resize', this.resize)
    this.sliderContent.addEventListener('mouseleave', this.exit)
    this.sliderContent.addEventListener('mouseup', this.up)
    this.sliderContent.addEventListener('mousedown', this.down)
    this.sliderContent.addEventListener('mousemove', this.move)

    this.sliderContent.addEventListener('touchstart', this.down)
    this.sliderContent.addEventListener('touchend', this.up)
    this.sliderContent.addEventListener('touchmove', this.move)
  },
  beforeDestroy() {
    this.$el.removeEventListener('mouseenter', this.enableCursor)
    this.$el.removeEventListener('mousemove', this.moveCursor)
    this.$el.removeEventListener('mouseleave', this.exitSection)

    window.removeEventListener('resize', this.resize)
    this.sliderContent.removeEventListener('mouseleave', this.exit)
    this.sliderContent.removeEventListener('mouseup', this.up)
    this.sliderContent.removeEventListener('mousedown', this.down)
    this.sliderContent.removeEventListener('mousemove', this.move)

    this.sliderContent.removeEventListener('touchstart', this.down)
    this.sliderContent.removeEventListener('touchend', this.up)
    this.sliderContent.removeEventListener('touchmove', this.move)
  },
  methods: {
    enableCursor() {
      this.cursor.classList.add('visible')
    },
    moveCursor(cursor) {
      this.cursor.style.transform = `translate3d(${cursor.x}px, ${cursor.y}px, 0)`
    },
    exitSection() {
      this.cursor.classList.remove('visible')
    },
    up() {
      this.isDrag = false;
      this.cursor.classList.remove('focus')
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

      this.setPosition(pos)
    },
    setPosition (x) {
      const intPos = parseInt(x)
      this.xPosition = x
      this.lerp.set(x)
      if (intPos !== this.index) this.index = intPos
    },
    vw(v) {
      var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
      return (v * w) / 100;
    },
    tick() {
      this.sliderContent.classList.toggle('drag', this.isDrag)
      this.lerp.update(0.10)

      const percentTranslate = math.map(this.lerp.get(), 0, this.nextSeries.length - 1, 0, 1 - (1 / this.nextSeries.length))
      const size = this.sliderContentBounds.width + this.sliderContentBounds.left + (this.vw(40));
      const x = math.clamp(percentTranslate * size, 0, size - (this.containerBounds.width))

      console.log(percentTranslate * 100)

      this.sliderContent.style.transform = `translate3d(-${x}px, 0, 0)`
      this.titleContainer.style.transform = `translate3d(-${x}px, 0, 0)`
      this.progress.style.width = `${percentTranslate * 100}%`
    },
    resize () {
      this.containerBounds = this.$el.getBoundingClientRect()
      this.sliderContentBounds =  this.sliderContent.getBoundingClientRect()
    },
    exit() {
      this.isDrag = false
    }
  },
  props: {nextSeries: Array}
}
</script>

<style>

</style>
