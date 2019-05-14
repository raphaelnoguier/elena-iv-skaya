<template>
  <div class="gallery-wrapper" ref="gallery">
    <div v-for="(serie, index) in series" :key="index" class="gallery-item-wrapper" :class="serie.serie.data.cover_ratio.includes('Big') && ''">
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
import TweenLite from 'gsap'
import calcOffset from '~/utils/offset.js'
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
      currentIndex: 0,
      yPosition: 0,
      scrollPosition: 0,
      downPosition: 0,
      downY: 0,
      isDrag: false,
      dragStep: 75,
      lerp: lerp(),
      timerId: null,
      spacings: [],
    }
  },
  mounted () {
    this.appContainer = document.getElementById('smooth-component')
    this.sliderContent = this.$el
    this.cursor = this.$parent.$parent.$parent.$refs.cursor.$el
    this.containerH = this.sliderContent.getBoundingClientRect().height
    this.homeHeaderBounds = this.$parent.$refs.homeHeader.$el.getBoundingClientRect()
    this.progressDrag = this.$parent.$refs.homeHeader.$refs.progressDrag
    this.dragComponent = this.$parent.$parent.$parent.$refs.dragComponent
    this.currentIndexDrag = this.dragComponent.$refs.currentIndexDrag
    this.titleMask = this.dragComponent.$refs.titleMask
    this.coverLeft = this.dragComponent.$refs.coverWrapperLeft
    this.coverRight = this.dragComponent.$refs.coverWrapperRight
    this.galleryWrapper = this.$refs.gallery.querySelectorAll('.gallery-item-wrapper')
    this.galleryItems = this.$refs.gallery.querySelectorAll('.gallery-item')
    this.firstTransform = 0

    this.calcHeights()

    window.addEventListener('resize', this.resize)

    if (window.innerWidth >= 768 && browser.desktop) {
      this.addListeners()
    } else  {
      this.$parent.$parent.$parent.calcScroll()
    }
  },
  beforeDestroy() {
    if (window.innerWidth >= 768 && browser.desktop)  {
      this.toggleRaf()
      window.removeEventListener('resize', this.resize)
      this.$el.parentNode.removeEventListener('mousedown', this.down)
      this.$el.parentNode.removeEventListener('mousemove', this.move)
      this.$el.parentNode.removeEventListener('mousemove', this.moveCursor)
      this.$el.parentNode.removeEventListener('mouseup', this.up)
      this.$el.parentNode.removeEventListener('mouseleave', this.exit)
    }
  },
  methods: {
    calcHeights() {
      this.margin = this.vw(6.875)
      this.totalHeightOnDrag = this.vw(43.75) * this.galleryItems.length
    },
    // PARALLAX //
    addListeners() {
      this.$el.parentNode.addEventListener('mousedown', this.down)
      this.$el.parentNode.addEventListener('mousemove', this.move)
      this.$el.parentNode.addEventListener('mousemove', this.moveCursor)
      this.$el.parentNode.addEventListener('mouseup', this.up)
      this.$el.parentNode.addEventListener('mouseleave', this.exit)

      this.toggleRaf()
      this.initParallax()
    },
    toggleRaf() {
      // this.running = !this.running
      // if(this.running) raf.add(this.tickPrlx)
      // else raf.remove(this.tickPrlx)
    },
    initParallax() {
      this.galleryItems.forEach((item, i) => {
        this.parallax.push({ offsetTop: calcOffset.get(item).top, height: item.getBoundingClientRect().height, bloc: item})
      })
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
      this.galleryItems[index].querySelector('img').classList.add('active-link')
      this.$store.getters.currentDoc.data.loader_image.url = serieCover
    },
    getClass(ratio) {
      if(ratio.includes('Big')){
        return 'portrait'
      }
      if (ratio.includes('Landscape')) {
        return 'portrait'
      }
      if (ratio.includes('Portrait')) {
        return 'portrait'
      }
    },
    // DRAG //
    enter() {
      raf.add(this.tickCursor)
    },
    down(cursor) {
      this.timerId = setTimeout(() => this.initDrag(cursor), 0)
    },
    initDrag(cursor) {
      this.isDrag = true
      this.calcPositions()

      this.sliderContent.classList.add('drag', 'no-events')
      this.cursor.classList.add('focus')
      this.dragComponent.$el.classList.add('active')
      this.$parent.setTheme('dark')

      this.downY = cursor.y
      this.downPosition = this.currentIndex
      this.lerp.immediateSet(this.currentIndex)
      raf.add(this.tick)
    },
    calcPositions() {
      for (let i = 0; i < this.galleryItems.length; i++) {
        const position = this.margin * (this.currentIndex - i)
        if(i === 0) this.firstTransform = position
        if(i === this.galleryItems.length) this.lastTransform = position
        TweenLite.to(this.galleryItems[i], 0.5, { y: position, ease: 'Quad.easeInOut', force3D: true });
      }
    },
    resetDrag() {
      TweenLite.set(this.sliderContent.parentNode, { y: 0, force3D: true })
      TweenLite.set(this.galleryItems, { y: 0, force3D: true })
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

      const percentTranslate = math.map(this.lerp.get(), 0, this.series.length, 0, 1)
      const percentTranslateTexts = math.map(this.lerp.get(), 0, 1, 0, 1.75)
      const percentTranslateCover = math.map(this.lerp.get(), 0, 1, 0, 43.75)
      const size = this.totalHeightOnDrag
      let y = percentTranslate * size

      this.progressDrag.style.transform = `scale3d(1, ${percentTranslate}, 1)`
      this.titleMask.style.transform = `translate3d(0, -${percentTranslateTexts}vw, 0)`
      this.currentIndexDrag.style.transform = `translate3d(0, -${percentTranslateTexts}vw, 0)`
      this.coverLeft.style.transform = `translate3d(0, -${percentTranslateCover}vw, 0)`
      this.coverRight.style.transform = `translate3d(0, -${percentTranslateCover}vw, 0)`

      window.scroll(0, y + (calcOffset.get(this.sliderContent).top + this.firstTransform - (window.innerHeight * 0.5) + this.vw(21.875)))
      this.setIndex(this.lerp.get())
    },
    up() {
      if(this.isDrag) this.disableDrag()
      else clearTimeout(this.timerId)
    },
    getSize(i) {
      console.log(i)
      if(this.galleryItems[i].classList.contains('full')) return this.vw(25)
      if(this.galleryItems[i].classList.contains('portrait')) return this.vw(21.875)
      if(this.galleryItems[i].classList.contains('landscape')) return this.vw(13.125)
    },
    setPosScrollBar(i) {
      const offset = calcOffset.get(this.galleryItems[this.currentIndex]).top - (window.innerHeight * 0.5)
      const itemOffset = this.getSize(i)

      window.scroll(0, (offset) + itemOffset)
    },
    disableDrag() {
      this.isDrag = false
      this.setPosScrollBar(this.currentIndex)
      TweenLite.to(this.galleryItems, 0.5, { y: 0, ease: 'Quad.easeInOut', force3D: true })

      this.dragComponent.$el.classList.remove('active')
      this.cursor.classList.remove('focus')
      this.sliderContent.classList.remove('no-events', 'drag')
      this.$parent.setTheme('white')
      this.progressDrag.style.transform = 'scale3d(1, 0, 1)'

      raf.remove(this.tick)
    },
    setIndex(i) {
      this.currentIndex = Math.round(i)
    },
    resize () {
      /* DRAG */
      if (window.innerWidth <= 768)  {
        this.resetDrag()
      }
      else  {
        this.calcHeights()
        this.addListeners()
        this.initParallax()
      }
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

