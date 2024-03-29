<template>
  <div class="serie-slider-wrapper">
    <div class="line"></div>
    <div class="serie-slider-title">
      <span>Gallery</span>
    </div>
    <div class="mobile-overflow">
      <div ref="slider" class="serie-slider">
        <div class="slider-item" v-for="(item, i) in nextSeries" :key="i">
          <div class="serie-slider-mask left"></div>
          <nuxt-link v-on:click.native="navigate(i)" :to="`/serie/${item.serie.uid}`" draggable="false">
            <img v-if="item.serie.data.cover_ratio.includes('Landscape')" v-lazy="item.serie.data.fallback_landscape_cover.url" :alt="`gallery-slider-cover-${i}`" />
            <img v-else v-lazy="item.serie.data.cover_serie_image.url" :alt="`gallery-slider-cover-${i}`"/>
            <div class="loading-progress"></div>
            <div class="placeholder"></div>
          </nuxt-link>
          <div class="serie-slider-mask right"></div>
        </div>
      </div>
    </div>
    <div class="slider-controls" ref="controls">
      <div class="upper">
        <div class="copyright">
          <span>©</span>
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
import math from '~/utils/math.js'
import lerp from '~/utils/lerp.js'
import raf from '~/utils/raf.js'
import browser from '~/utils/browser.js'

export default {
  data() {
    return {
      index: 0,
      cursor: null,
      cursorX: lerp(),
      cursorY: lerp(),
      progress: 0,
      xPosition: 0,
      downPosition: 0,
      downX: 0,
      isDrag: false,
      dragStep: 150,
      lerp: lerp(),
      containerBounds: null,
      sliderContent: null,
      titleContainer: null,
      running: false,
      covers: null,
      timerId: null,
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
    this.mobileSliderWrapper = this.$el.querySelector('.mobile-overflow')
    this.mobileSliderBounds = this.mobileSliderWrapper.getBoundingClientRect()
    this.controls = this.$refs.controls
    this.cursor.classList.remove('homepage', 'visible')

    this.$el.addEventListener('mousemove', this.moveCursor)
    this.$el.addEventListener('mouseleave', this.exit)

    window.addEventListener('resize', this.resize)
    window.addEventListener('contextmenu', this.disableContextMenu)
    this.$el.addEventListener('mouseup', this.up)
    this.$el.addEventListener('mousedown', this.down)
    this.$el.addEventListener('mousemove', this.move)

    if(window.innerWidth <= 768) this.mobileSliderWrapper.addEventListener('scroll', this.mobileSlider, false)
  },
  beforeDestroy() {
    this.disableRaf()
    this.disableCursor()

    if(window.innerWidth <= 768) this.mobileSliderWrapper.removeEventListener('scroll', this.mobileSlider, false)

    this.$parent.$el.removeEventListener('mousemove', this.moveCursor)
    this.$el.removeEventListener('mouseleave', this.exit)
    window.removeEventListener('contextmenu', this.disableContextMenu)

    window.removeEventListener('resize', this.resize)
    this.$el.removeEventListener('mouseup', this.up)
    this.$el.removeEventListener('mousedown', this.down)
    this.$el.removeEventListener('mousemove', this.move)
  },
  methods: {
    disableContextMenu() {
      clearTimeout(this.timerId)
      this.isDrag = false
    },
    navigate(i) {
      this.indexLoading = i
      document.body.classList.add('no-links')
      this.covers[i].classList.add('active-link')

      const progressBar = this.covers[this.indexLoading].nextElementSibling
      progressBar.classList.add('active')
      raf.add(this.tickProgress)
    },
    tickProgress() {
      const progressBar = this.covers[this.indexLoading].nextElementSibling
      const progress = math.clamp(this.$nuxt.$loading.percent / 100, 0, 0.8)

      if(progress === 0.8) raf.remove(this.tickProgress)
      progressBar.style.transform = `scale3d(${progress}, 1, 1)`
    },
    enableRaf() {
      if(window.innerWidth > 768) raf.add(this.tick)
    },
    disableRaf() {
      raf.remove(this.tick)
    },
    disableCursor() {
      if(this.$route.name === 'serie-slug') this.cursor.classList.remove('visible')
    },
    moveCursor(cursor) {
      if(window.innerWidth < 768) return
      if(!this.cursor.classList.contains('visible')) setTimeout(() => this.cursor.classList.add('visible'), 200);
      this.cursorX.set(cursor.x - (this.cursor.clientWidth / 2))
      this.cursorY.set(cursor.y - (this.cursor.clientHeight / 2))
    },
    up() {
      if(this.isDrag) this.disableDrag()
      else clearTimeout(this.timerId)
    },
    disableDrag() {
      this.isDrag = false
      this.cursor.classList.remove('focus')
      this.sliderContent.classList.remove('drag')
      this.controls.classList.remove('drag')
      this.xPosition = this.index
      this.lerp.set(this.index)
      this.sliderContent.classList.remove('no-events')

      for (let i = 0; i < this.covers.length; i++) {
        this.covers[i].style.transform = `translate3d(0, 0, 0)`
      }
    },
    down(cursor) {
      cursor.preventDefault()
      this.timerId = setTimeout(() => this.initDrag(cursor), 350)
    },
    initDrag(cursor) {
      this.sliderContent.classList.add('no-events')
      this.cursor.classList.add('focus')
      this.sliderContent.classList.add('drag')
      this.controls.classList.add('drag')

      this.isDrag = true
      this.downX = cursor.x
      this.downPosition = this.xPosition
    },
    move(cursor) {
      if(!this.isDrag) return
      this.moveX = cursor.x

      const translateX = this.moveX - this.downX
      const mappedX = translateX > 0 ? math.map(translateX, 0, this.dragStep, 0, 1) : math.map(translateX, 0, -this.dragStep, 0, -1)
      const pos = math.clamp(this.downPosition - mappedX, 0, this.nextSeries.length - 1)

      this.parralax(mappedX)

      this.setPosition(pos)
    },
    parralax(x) {
      let transform = math.clamp(x * 20, -25, 25)

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
      this.lerp.update(0.10)

      const percentTranslate = math.map(this.lerp.get(), 0, this.nextSeries.length - 1, 0, 1)
      const size = this.sliderContentBounds.width - this.vw(20)
      const x = percentTranslate * size

      this.sliderContent.style.transform = `translate3d(-${x}px, 0, 0)`
      this.titleContainer.style.transform = `translate3d(-${x}px, 0, 0)`
      this.progress.style.width = `${percentTranslate * 100}%`
      this.progress.style.transform = `scale3d(${percentTranslate}, 1, 1)`

      this.cursorX.update()
      this.cursorY.update()
      this.cursor.style.transform = `translate3d(${this.cursorX.get()}px, ${this.cursorY.get()}px, 0)`
    },
    resize () {
      this.containerBounds = this.$el.getBoundingClientRect()
      this.sliderContentBounds = this.sliderContent.getBoundingClientRect()
    },
    vw(v) {
      var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0)
      return (v * w) / 100
    },
    exit() {
      this.cursor.classList.remove('visible')
      this.up()
    },
    mobileSlider() {
      let offset = this.mobileSliderWrapper.scrollLeft
      const scrollableWidth = this.mobileSliderWrapper.scrollWidth
      const size = this.mobileSliderWrapper.clientWidth
      let progress = Math.round(100 * offset / (scrollableWidth - size)) / 100
      let index = null

      if(window.innerWidth > 375) {
        index = Math.round(math.map(progress * 100, 0, 100, 0, this.nextSeries.length))
        this.$refs.index.innerHTML = index
      }

      this.progress.style.transform = `scale3d(${progress}, 1, 1)`
      this.titleContainer.style.transform = `translate3d(-${offset}px, 0, 0)`
    }
  },
  props: {nextSeries: Array}
}
</script>

<style>

</style>
