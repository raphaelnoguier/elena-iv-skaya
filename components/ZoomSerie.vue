<template>
  <div class="zoom-serie">
    <div class="zoom-serie-image">
      <img ref="imageZoomSerie" :src="currentZoomImage" :style="`height: ${currentZoomImageHeight}px`">
    </div>
  </div>
</template>

<script>
export default {
  props: {
    currentZoomImage : String,
    currentZoomImageHeight: Number
  }
}
</script>
