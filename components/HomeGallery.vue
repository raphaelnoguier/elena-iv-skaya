<template>
  <div class="gallery-wrapper" ref="gallery" :class="isMobile && !showAllItems && 'only-first'">
    <div v-for="(serie, index) in series" :key="index" class="gallery-item-wrapper" :class="serie.serie.data.cover_ratio.includes('Big') && 'full'">
      <div class="gallery-item" :class="getClass(serie.serie.data.cover_ratio)">
        <div v-if="serie.serie.data.cover_ratio.includes('Big')" class="full-mask left"></div>
        <div v-if="serie.serie.data.cover_ratio.includes('Big')" class="full-mask right"></div>
        <div class="gallery-item-content">
          <nuxt-link v-on:click.native="updateTransitionImg(serie.serie.data.cover_serie_image.url, index)" :to="`/serie/${serie.serie.uid}`" draggable="false">
            <img :src="serie.serie.data.cover_serie_image.url" :alt="serie.serie.data.title[0].text" />
            <div class="layer"></div>
            <div class="loading-progress"></div>
          </nuxt-link>
          <div class="item-title">
            <h3>{{serie.serie.data.title[0].text}}</h3>
            <span>{{serie.serie.data.category}}</span>
          </div>
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
      parallax: [],
      offsetY: 0,
      currentIndex: 0,
      downPosition: 0,
      downY: 0,
      isDrag: false,
      dragStep: 75,
      lerp: lerp(),
      timerId: null,
      speedUp: 10,
      showAllItems: false,
      isMobile: !browser.desktop
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
    this.covers = this.$refs.gallery.querySelectorAll('.gallery-item img')
    this.firstTransform = 0
    this.itemsPos = []
    this.nav = this.$parent.$parent.$parent.$refs.nav.$el
    this.cursor.classList.add('homepage')

    window.addEventListener('resize', this.resize)

    if (window.innerWidth >= 768 && browser.desktop) {
      this.addListeners()
      this.calcHeights()
      // this.initParallax()
    }
  },
  beforeDestroy() {
    if (window.innerWidth >= 768 && browser.desktop)  {
      window.removeEventListener('resize', this.resize)
      window.removeEventListener('contextmenu', this.disableContextMenu)
      window.removeEventListener('scroll', this.lockScroll)
      this.$el.parentNode.removeEventListener('mousedown', this.down)
      this.$el.parentNode.removeEventListener('mouseover', this.enter)
      this.$el.parentNode.removeEventListener('mousemove', this.move)
      this.$el.parentNode.removeEventListener('mouseup', this.up)
      this.$el.parentNode.removeEventListener('mouseout', this.exit)
    }
  },
  methods: {
    disableContextMenu() {
      clearTimeout(this.timerId)
      this.isDrag = false
    },
    calcHeights() {
      this.$parent.$parent.$parent.calcScroll()
      this.margin = this.vw(9.375)
      this.totalHeightOnDrag = this.vw(43.75) * this.galleryItems.length
      this.sizes = {full: this.vw(27), portrait: this.vw(21.875), landscape: this.vw(13.125)}

      this.calcItemsPos()
    },
    calcItemsPos() {
      this.itemsPos = []

      for (let i = 0; i < this.galleryItems.length; i++) {
        const element = this.galleryItems[i];
        this.itemsPos.push({top: calcOffset.get(element).top, offset: this.getSize(element)})
      }
    },
    getSize(item) {
      return this.sizes[item.classList[1]]
    },
    addListeners() {
      window.addEventListener('contextmenu', this.disableContextMenu)
      this.$el.parentNode.addEventListener('mouseover', this.enter)
      this.$el.parentNode.addEventListener('mousedown', this.down)
      this.$el.parentNode.addEventListener('mousemove', this.move)
      this.$el.parentNode.addEventListener('mouseup', this.up)
      this.$el.parentNode.addEventListener('mouseleave', this.exit)
    },
    // PARALLAX //
    initParallax() {
      this.parallax = []

      for (let i = 0; i < this.galleryItems.length; i++) {
        const element = this.galleryItems[i];
        this.parallax.push({ offsetTop: element.offsetTop, bloc: element})
      }
      raf.add(this.tickPrlx)
    },
    tickPrlx() {
      const wHeight =  window.innerHeight
      const min = (-wHeight * 0.5) - wHeight * 0.75
      const max = wHeight + (wHeight * 0.75)

      for (let i = 0; i < this.parallax.length; i++) {
        const item = this.parallax[i].bloc
        const offsetTop = this.offsetY + this.parallax[i].offsetTop

        if (offsetTop > min && offsetTop < max) {
          const y = math.map(offsetTop, min, max, -20, 50)
          this.transform(item, y)
        }
      }
    },
    transform(bloc, y) {
      bloc.style.transform = `translate3d(0px, ${y}vw, 0)`
    },
    resetParallax() {
      for (let i = 0; i < this.parallax.length; i++) {
        const bloc = this.parallax[i].bloc
        bloc.style.transform = 'translate3d(0, 0, 0)'
      }
      raf.remove(this.tick)
    },
    updateTransitionImg(serieCover, index) {
      document.body.classList.add('no-links')
      this.galleryItems[index].querySelector('img').classList.add('active-link')
      this.$store.getters.currentDoc.data.loader_image.url = serieCover

      this.loadingItem = this.galleryItems[index].querySelector('img')

      raf.add(this.tickProgress)
    },
    tickProgress() {
      const progressBar = this.loadingItem.nextElementSibling
      const progress = this.$nuxt.$loading.percent / 100

      if(progress >= 1 ) raf.remove(this.tickProgress)
      progressBar.style.transform = `scale3d(${progress}, 1, 1)`
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
      if(this.$parent.hasMoved) this.cursor.classList.add('visible')
    },
    down(cursor) {
      cursor.preventDefault()
      if(window.innerWidth < 768) return
      this.timerId = setTimeout(() => this.initDrag(cursor), 350)
    },
    initDrag(cursor) {
      this.isDrag = true
      this.calcPositions()
      this.resetParallax()
      this.sliderContent.classList.add('drag', 'no-events')
      TweenLite.set(this.nav, { opacity: 0})
      this.cursor.classList.add('focus')
      this.$parent.setTheme('dark')

      this.downY = cursor.y
      this.downPosition = this.currentIndex
      this.lerp.immediateSet(this.currentIndex)
      raf.add(this.tick)
      // raf.remove(this.tickPrlx)

      this.$parent.$parent.$parent.adjustHeight(this.firstTransform, false)
      TweenLite.to(this.dragComponent.$el, 0.5, { opacity: 1, ease: 'Quad.easeInOut'})
    },
    calcPositions() {
      for (let i = 0; i < this.galleryItems.length; i++) {
        const position = this.margin * (this.currentIndex - i)
        if(i === 0) this.firstTransform = position
        TweenLite.to(this.galleryItems[i], 0.5, { y: position, ease: 'Quad.easeInOut', force3D: true })
      }
    },
    resetDrag() {
      TweenLite.set(this.galleryItems, { y: 0, force3D: true })
    },
    move(cursor) {
      if(!this.isDrag) return
      this.moveY = cursor.y

      const translateY = this.moveY - this.downY
      const mappedY = translateY > 0 ? math.map(translateY, 0, this.dragStep, 0, 1) : math.map(translateY, 0, -this.dragStep, 0, -1)
      const pos = math.clamp(this.downPosition - mappedY, 0, this.galleryItems.length - 1)

      this.setPosition(pos)
    },
    setPosition (y) {
      this.lerp.set(y)
    },
    tick() {
      this.lerp.update(0.10)

      const percentTranslate = math.map(this.lerp.get(), 0, this.galleryItems.length, 0, 1)
      const percentTranslateTexts = math.map(this.lerp.get(), 0, 1, 0, 1.75)
      const percentTranslateCover = math.map(this.lerp.get(), 0, 1, 0, 43.75)
      const size = this.totalHeightOnDrag
      let y = percentTranslate * size
      const offset = calcOffset.get(this.sliderContent).top + this.firstTransform - (window.innerHeight * 0.5) + this.vw(21.875)

      this.checkLimitZone()

      this.progressDrag.style.transform = `scale3d(1, ${percentTranslate}, 1)`
      this.titleMask.style.transform = `translate3d(0, -${percentTranslateTexts}vw, 0)`
      this.currentIndexDrag.style.transform = `translate3d(0, -${percentTranslateTexts}vw, 0)`
      this.coverLeft.style.transform = `translate3d(0, -${percentTranslateCover}vw, 0)`
      this.coverRight.style.transform = `translate3d(0, -${percentTranslateCover}vw, 0)`

      window.scroll(0, y + (offset))
      this.setIndex(this.lerp.get())
    },
    checkLimitZone() {
      const cursor = { y: this.moveY }
      if(this.moveY < 100 ) {
        this.downY += this.speedUp
        this.move(cursor)
      }
      else if(this.moveY > (window.innerHeight - 100)) {
        this.downY -= this.speedUp
        this.move(cursor)
      }
    },
    up() {
      if(window.innerWidth < 768) return
      this.setPosScrollBar(this.currentIndex)
      this.disableDrag()
      // this.initParallax()
    },
    setPosScrollBar(i) {
      if(!this.isDrag) return
      const itemPos = (this.itemsPos[i].top - (window.innerHeight * 0.5)) + this.itemsPos[i].offset

      window.scroll(0, itemPos)
    },
    disableDrag(exit) {
      clearTimeout(this.timerId)
      this.isDrag = false
      this.moveY = window.innerHeight * 0.5

      TweenLite.to(this.galleryItems, 0.5, { y: 0, ease: 'Quad.easeInOut', force3D: true })
      TweenLite.to(this.dragComponent.$el, 0.3, { opacity: 0, ease: 'Quad.easeInOut', clearProps: 'opacity'})
      TweenLite.set(this.nav, { opacity: 1, clearProps: 'opacity'})
      this.$parent.$parent.$parent.adjustHeight(this.firstTransform, true)

      this.sliderContent.classList.remove('drag', 'no-events')
      this.$parent.setTheme('white')
      this.progressDrag.style.transform = 'scale3d(1, 0, 1)'

      if(exit) this.cursor.classList.remove('focus', 'visible')
      else this.cursor.classList.remove('focus')

      raf.remove(this.tick)
      // raf.add(this.tickPrlx)
    },
    setIndex(i) {
      this.currentIndex = Math.round(i)
    },
    resize () {
      if (window.innerWidth <= 768)  {
        this.resetDrag()
      }
      else  {
        this.calcHeights()
        this.addListeners()
        // this.initParallax()
      }
    },
    vw(v) {
      var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0)
      return (v * w) / 100
    },
    exit() {
      this.disableDrag(true)
    },
  },
  props: { series: Array }
}
</script>

