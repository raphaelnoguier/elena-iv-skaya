<template>
  <div class="transition-wrapper">
    <div class="image-transition">
      <div class="transition-mask" :style="`background-image:url('${$store.getters.currentDoc.data.loader_image.url}')`"></div>
      <img :data-src="$store.getters.currentDoc.data.loader_image.url" style="display:none">
    </div>
  </div>
</template>




