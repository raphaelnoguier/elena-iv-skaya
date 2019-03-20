<template>
  <div :class="type === 'Big' ? 'big-slider' : 'small-slider'" class="home-slider-wrapper">
    <div class="slide" v-for="(serie, index) in featured" :key="index" :style="`z-index: ${-index + 1}`" :data-slide="index + 1" :class="index + 1  === 1 ? 'active': ' '">
      <div class="image" :style="`background-image: url('${type === 'Big' ? serie.data.cover_serie_image.url : serie.stripe.url}')`">
        <img :src="serie.data.cover_serie_image.url" style="display:none" class="preload">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    featured: Array,
    type: String
  }
}
</script>
