<template>
  <div class="gallery-wrapper" ref="gallery">
    <div v-for="(serie, index) in series" :key="index" class="gallery-item-wrapper" :class="serie.serie.data.cover_ratio.includes('Big') && 'full'">
      <div class="gallery-item" :class="getClass(serie.serie.data.cover_ratio)">
        <nuxt-link v-on:click.native="updateTransitionImg(serie.serie.data.cover_serie_image.url, index)" :to="`/serie/${serie.serie.uid}`">
          <img :src="serie.serie.data.cover_serie_image.url" alt="home-gallery-cover" />
        </nuxt-link>
        <div class="item-title">
          <h3>{{serie.serie.data.title[0].text}}</h3>
          <span>{{serie.serie.data.category}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import anime from 'animejs'
import calcOffset from '~/utils/offset.js'
import scrollbar from "~/utils/scrollbar.js"
import reveal from "~/utils/reveal.js"
import browser from '~/utils/browser.js'
import math from '~/utils/math.js'
import lerp from '~/utils/lerp.js'
import raf from '~/utils/raf.js'
export default {
  data() {
    return {
      cursorX: lerp(),
      cursorY: lerp(),
      parallax: [],
      offsetY: 0,
      running: false,
      index: 0,
      yPosition: 0,
      scrollPosition: 0,
      downPosition: 0,
      downY: 0,
      isDrag: false,
      dragStep: 75,
      lerp: lerp(),
      timerId: null,
      spacings: [],
      transformValues: []
    }
  },
  mounted () {
    this.appContainer = document.getElementById('smooth-component')
    this.containerBounds = this.$el.getBoundingClientRect()
    this.sliderContent = this.$el
    this.sliderContentBounds = this.vw(43.75) * this.series.length
    this.cursor = this.$parent.$parent.$parent.$refs.cursor.$el
    this.homeHeaderBounds = this.$parent.$refs.homeHeader.$el.getBoundingClientRect()
    this.progressDrag = this.$parent.$refs.homeHeader.$refs.progressDrag
    this.dragComponent = this.$parent.$parent.$parent.$refs.dragComponent
    this.currentIndexDrag = this.dragComponent.$refs.currentIndexDrag
    this.titleMask = this.dragComponent.$refs.titleMask
    this.coverLeft = this.dragComponent.$refs.coverWrapperLeft
    this.coverRight = this.dragComponent.$refs.coverWrapperRight

    if (window.innerWidth > 768 && browser.desktop) {
      window.addEventListener('resize', this.resize)
      this.$el.addEventListener('mousedown', this.down)
      this.$el.addEventListener('mousemove', this.move)
      this.$el.addEventListener('mousemove', this.moveCursor)
      this.$el.addEventListener('mouseup', this.up)
      this.$el.addEventListener('mouseleave', this.exit)
    }

    this.$nextTick(() => {
      if (window.innerWidth > 768 && browser.desktop) {
        this.galleryWrapper = this.$refs.gallery.querySelectorAll('.gallery-item-wrapper')
        this.galleryItems = this.$refs.gallery.querySelectorAll('.gallery-item')
        this.toggleRaf()
        this.initParallax()
        this.calcSpacings()
      }
    })
  },
  beforeDestroy() {
    if (window.innerWidth > 768 && browser.desktop)  {
      this.toggleRaf()
      window.removeEventListener('resize', this.resize)
      this.$el.removeEventListener('mouseleave', this.exit)
      this.$el.removeEventListener('mouseup', this.up)
      this.$el.removeEventListener('mousedown', this.down)
      this.$el.removeEventListener('mousemove', this.move)
      this.$el.removeEventListener('mousemove', this.moveCursor)
    }
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
        this.parallax.push({ offsetTop: calcOffset.get(item).top, height: item.getBoundingClientRect().height, bloc: item})
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
    enter() {
      raf.add(this.tickCursor)
    },
    calcSpacings() {
      this.galleryItems.forEach((item, i) => {
        let itemSpacing = 6.875
        if(item.classList.contains('full')) {
          itemSpacing = (6.875 * (2))
          this.spacings[i - 1] = this.spacings[i - 1] + (6.875) // add margin bottom to div after full
        }
        this.spacings.push(itemSpacing)
        let sum = this.spacings.slice(0, i).reduce((pv, cv) => pv + cv, 0);
        this.transformValues.push(sum)
      });
    },
    transformCovers(release) {
      for (let i = 0; i < this.series.length; i++) {
        const element = this.galleryItems[i];
        element.style.transform = `translate3d(0, -${release ? 0 : this.transformValues[i]}vw, 0)`
      }
    },
    initDrag(cursor) {
      this.transformCovers(false)
      this.isDrag = true
      this.downY = cursor.y
      this.downPosition = this.index
      this.lerp.immediateSet(this.index)

      this.sliderContent.classList.add('drag', 'no-events')
      this.cursor.classList.add('focus')
      this.dragComponent.$el.classList.add('active')
      this.$parent.setTheme('dark')
      raf.add(this.tick)
    },
    down(cursor) {
      this.timerId = setTimeout(() => {
        this.initDrag(cursor)
      }, 350);
    },
    move(cursor) {
      if(!this.isDrag) return
      this.moveY = cursor.y

      const translateY = this.moveY - this.downY
      const mappedY = translateY > 0 ? math.map(translateY, 0, this.dragStep, 0, 1) : math.map(translateY, 0, -this.dragStep, 0, -1)
      const pos = math.clamp(this.downPosition - mappedY, 0, this.series.length - 1)

      this.setPosition(pos)
    },
    moveCursor(cursor) {
      if(window.innerWidth < 768) return
      this.cursorX.set(cursor.x - (this.cursor.clientWidth / 2))
      this.cursorY.set(cursor.y - (this.cursor.clientHeight / 2))
    },
    setPosition (y) {
      this.yPosition = y
      this.lerp.set(y)
    },
    tickCursor() {
      this.cursorX.update()
      this.cursorY.update()
      this.cursor.style.transform = `translate3d(${this.cursorX.get()}px, ${this.cursorY.get()}px, 0)`
    },
    tick() {
      this.lerp.update(0.10)

      const percentTranslate = math.map(this.lerp.get(), 0, this.series.length - 1, 0, 1)
      const percentTranslateTexts = math.map(this.lerp.get(), 0, 1, 0, 1.75)
      const percentTranslateCover = math.map(this.lerp.get() + 0.5, 0, 1, 0, 43.75)
      const size = this.sliderContentBounds - this.vw(43.75)
      let y = percentTranslate * size


      this.progressDrag.style.transform = `scale3d(1, ${percentTranslate}, 1)`
      this.titleMask.style.transform = `translate3d(0, -${percentTranslateTexts}vw, 0)`
      this.currentIndexDrag.style.transform = `translate3d(0, -${percentTranslateTexts}vw, 0)`
      this.coverLeft.style.transform = `translate3d(0, -${percentTranslateCover}vw, 0)`
      this.coverRight.style.transform = `translate3d(0, -${percentTranslateCover}vw, 0)`

      scrollbar.setPosition(this.appContainer, y + (calcOffset.get(this.sliderContent).top - (window.innerHeight * 0.5)))
      this.setIndex(this.lerp.get())

    },
    setIndex(i) {
      this.index = Math.round(i)
    },
    up() {
      let offset = 0
      let itemTop = this.parallax[this.index].offsetTop

      if(this.galleryItems[this.index].classList.contains('landscape')) offset = 8.5

      scrollbar.setPosition(this.appContainer, (itemTop - this.vw(offset)) - (window.innerHeight * 0.5))
      this.disableDrag()
    },
    disableDrag() {
      this.isDrag = false
      this.dragComponent.$el.classList.remove('active')
      this.cursor.classList.remove('focus')
      this.sliderContent.classList.remove('no-events', 'drag')
      this.$parent.setTheme('white')
      this.progressDrag.style.transform = 'scale3d(1, 0, 1)'
      raf.remove(this.tick)
      this.transformCovers(true)

      clearTimeout(this.timerId);
    },
    resize () {
      this.homeHeaderBounds = this.$parent.$refs.homeHeader.$el.getBoundingClientRect()
      this.containerBounds = this.$el.getBoundingClientRect()
      this.sliderContentBounds =  this.vw(43.75) * this.series.length
      this.initParallax()

      if (window.innerWidth < 768) this.disableDrag()
    },
    vw(v) {
      var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0)
      return (v * w) / 100
    },
    exit() {
      //this.disableDrag()
    },
  },
  props: { series: Array }
}
</script>

