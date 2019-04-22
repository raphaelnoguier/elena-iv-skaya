<template>
  <div class="gallery-wrapper" ref="gallery">
    <div v-for="(serie, index) in series" :key="index" class="gallery-item-wrapper" :class="serie.serie.data.cover_ratio.includes('Big') && 'full'">
      <div class="gallery-item" :class="getClass(serie.serie.data.cover_ratio)">
        <nuxt-link v-on:click.native="updateTransitionImg(serie.serie.data.cover_serie_image.url)" :to="`/serie/${serie.serie.uid}`">
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
    })
  },
  beforeDestroy() {
    if (window.innerWidth > 768 && browser.desktop) this.toggleRaf()
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
        this.parallax.push({ offsetTop: item.parentNode.offsetTop, bloc: item})
      });
    },
    tick() {
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
  },
  props: { series: Array }
}
</script>

