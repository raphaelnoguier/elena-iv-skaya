<template>
  <div :class="type === 'Big' ? 'big-slider' : 'small-slider'" class="home-slider-wrapper">
    <div :class="`loading-progress ${type.toLowerCase()}`"></div>
    <div class="slide" v-for="(serie, index) in featured" :key="index" :class="index + 1  === 1 ? 'active': ' '" :data-slide="index + 1" v-on:click="click">
      <nuxt-link :to="`serie/${serie.serie.uid}`">
        <div class="image-mask"></div>
        <div class="image">
          <img :src="type === 'Big' ? serie.serie.data.cover_serie_image.url : serie.stripe.url" data-load="preload" :alt="`home-slider-cover${index}`">
        </div>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
import raf from '~/utils/raf.js'
import math from '~/utils/math.js'

export default {
  props: {
    featured: Array,
    type: String,
  },
  mounted() {
    this.bigProgress = document.querySelector('.loading-progress.big')
    this.smallProgress = document.querySelector('.loading-progress.small')
  },
  methods: {
    click(e) {
      const sliders = document.querySelectorAll('.home-slider-wrapper')
      document.body.classList.add('no-links')

      for (let i = 0; i < sliders.length; i++) {
        const element = sliders[i]
        element.classList.add('active-link')
        raf.add(this.tickProgress)
      }
    },
    tickProgress() {
      const progress = this.$nuxt.$loading.percent
      const barProgress = math.clamp(progress, 0, 1)

      if(progress === 100) raf.remove(this.tickProgress)

      if(progress <= 50) this.bigProgress.style.transform = `scale3d(${barProgress * 2}, 1, 1)`
      else this.smallProgress.style.transform = `scale3d(${barProgress}, 1, 1)`
    },
  }
}
</script>
