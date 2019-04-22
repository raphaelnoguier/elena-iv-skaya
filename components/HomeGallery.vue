<template>
  <div class="gallery-wrapper" ref="gallery">
    <div v-for="(serie, index) in series" :key="index" class="gallery-item-wrapper" :class="serie.serie.data.cover_ratio.includes('Big') && 'full'">
      <div class="gallery-item" :class="getClass(serie.serie.data.cover_ratio)">
        <nuxt-link v-on:click.native="updateTransitionImg(serie.serie.data.cover_serie_image.url)" :to="`/serie/${serie.serie.uid}`">
          <!-- <div class="home-gallery-mask left"></div> -->
          <img :src="serie.serie.data.cover_serie_image.url" alt="home-gallery-cover" />
          <!-- <div class="home-gallery-mask right"></div> -->
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
import reveal from "~/utils/reveal.js"
import browser from '~/utils/browser.js'
import math from '~/utils/math.js'
import raf from '~/utils/raf.js'
export default {
  data() {
    return {
      galleryItems: null,
      parallax: [],
      offsetY: 0,
      running: false
    }
  },
  mounted () {
    this.$nextTick(() => {
      if (window.innerWidth > 768 && browser.desktop) {
        this.galleryItems = this.$refs.gallery.querySelectorAll('.gallery-item')
        this.toggleRaf()
        this.initParallax()
      }
      this.revealGallery()
    })
  },
  beforeDestroy() {
    if (window.innerWidth > 768 && browser.desktop) this.toggleRaf()
    // this.reveal.destroy()
  },
  methods: {
    toggleRaf() {
      this.running = !this.running
      if(this.running) raf.add(this.tick)
      else raf.remove(this.tick)
    },
    initParallax() {
      this.galleryItems.forEach((item, i) => {
        if(i = 0) return
        this.parallax.push({ offsetTop: item.parentNode.offsetTop, bloc: item, img: item.querySelector('img') })
      });
    },
    tick() {
      const wHeight =  window.innerHeight

      for (let i = 0; i < this.parallax.length; i++) {
        const item = this.parallax[i].img
        const bloc = this.parallax[i].bloc
        const offsetTop = -this.offsetY + this.parallax[i].offsetTop

        const min = (-wHeight * 0.5) - wHeight * 0.75
        const max = wHeight + (wHeight * 0.75)

        if (offsetTop > min && offsetTop < max) {
          const yImg = math.map(offsetTop, min, max, -50, 50)
          const yBloc = math.map(offsetTop, min, max, 0, 350)
          this.transform(item, bloc, yBloc, yImg)
        }
      }
    },
    transform(img, bloc, yBloc, yImg) {
      img.style.transform = `translate3d(0px, ${yImg}px, 0) scale3d(1.1, 1.15, 1)`
      bloc.style.transform = `translate3d(0px, ${yBloc}px, 0)`
    },
    resetParallax() {
      for (let i = 0; i < this.parallax.length; i++) {
        const item = this.parallax[i].parallax
        const bloc = this.parallax[i].bloc
        item.style.transform = 'translate3d(0, 0px, 0) scale3d(1.1, 1.15, 1)'
        bloc.style.transform = 'translate3d(0, 0px, 0)'
      }
    },
    updateTransitionImg(serieCover) {
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
    revealGallery() {
      // let tmp = this.$el.querySelectorAll('.home-gallery-mask');
      // const imgs = Array.from(tmp).map(img => {
      //   return {
      //     dom: img,
      //     ratioIn: 0,
      //   }
      // })
      // this.reveal = reveal(imgs)
    },
  },
  props: { series: Array }
}
</script>

