<template>
  <div class="transition-wrapper">
    <div class="image-transition">
      <img :src="image" :alt="`image transition${image}`" data-load="preload">
    </div>

    <img style="display:none" alt='about-loader-commons' :src="aboutImg" data-load="preload"/>
  </div>
</template>

<script>
export default {
  data() {
    return {
      image: '',
      aboutImg:  this.$store.getters.commons.data.about.data.loader_image.url
    }
  },
  mounted() {
    this.image = this.$store.getters.currentDoc.data.loader_image.url
  },
  watch: {
    '$route'(to, from) {
      this.$nextTick(() => {
        if(from.name === 'serie-slug' && to.name === 'index') {
          this.image = this.$store.getters.serieLoaderImg
        } else {
          this.image = this.$store.getters.currentDoc.data.loader_image.url
        }
      })
    }
  }
}
</script>



