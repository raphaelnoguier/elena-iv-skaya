<template>
  <div class="transition-wrapper">
    <div class="image-transition">
      <div class="transition-mask" :style="`background-image:url('${image}')`"></div>
      <img v-lazy="image" style="display:none" alt="image transition">
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      image: ''
    }
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



