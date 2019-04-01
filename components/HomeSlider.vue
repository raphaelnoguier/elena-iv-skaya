<template>
  <div :class="type === 'Big' ? 'big-slider' : 'small-slider'" class="home-slider-wrapper">
      <div class="slide" v-for="(serie, index) in featured" :key="index" :class="index + 1  === 1 ? 'active': ' '" :data-slide="index + 1">
        <nuxt-link :to="`serie/${serie.serie.uid}`">
          <div class="image-mask"></div>
          <div class="image" :style="`background-image: url('${type === 'Big' ? serie.serie.data.cover_serie_image.url : serie.stripe.url}')`">
            <img :src="serie.serie.data.cover_serie_image.url" style="display:none" data-load="preload">
          </div>
        </nuxt-link>
      </div>
  </div>
</template>

<script>
export default {
  props: {
    featured: Array,
    type: String,
  },
}
</script>
