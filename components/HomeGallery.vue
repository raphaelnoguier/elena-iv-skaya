<template>
  <div class="gallery-wrapper">
    <div v-for="(serie, index) in series" :key="index" class="gallery-item" :class="getClass(serie.serie.data.cover_ratio)">
      <nuxt-link v-on:click.native="updateTransitionImg(serie.serie.data.cover_serie_image.url)" :to="`/serie/${serie.serie.uid}`">
        <div class="home-gallery-mask">
          <img :src="serie.serie.data.cover_serie_image.url" alt="home-gallery-cover" />
        </div>
        <div class="item-title">
          <h3>{{serie.serie.data.title[0].text}}</h3>
          <span>{{serie.serie.data.category}}</span>
        </div>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
import reveal from "~/utils/reveal.js"
export default {
  mounted () {
    this.$nextTick(() => {
      this.revealGallery()
    })
  },
  beforeDestroy() {
    this.reveal.destroy()
  },
  methods: {
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
      let tmp = this.$el.querySelectorAll('.home-gallery-mask');
      const imgs = Array.from(tmp).map(img => {
        return {
          dom: img,
          ratioIn: 0,
        }
      })
      this.reveal = reveal(imgs)
    },
  },
  props: { series: Array }
}
</script>

