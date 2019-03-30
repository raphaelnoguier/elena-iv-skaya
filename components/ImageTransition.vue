<template>
  <div class="transition-layer">
    <div class="image">
      <img :src="$store.getters.currentDoc.data.loader_image.url" />
    </div>
  </div>
</template>

<script>
import anime from 'animejs';

export default {
  methods : {
  },
  props: {transitionImage: String}
}
</script>



