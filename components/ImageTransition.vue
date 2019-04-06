<template>
  <div class="transition-wrapper">
    <div class="image-transition">
      <div class="transition-mask" :style="`background-image:url('${$store.getters.currentDoc.data.loader_image.url}')`"></div>
      <img :src="$store.getters.currentDoc.data.loader_image.url" data-load="preload" style="display:none">
    </div>
  </div>
</template>




