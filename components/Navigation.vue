<template>
  <div class="nav">
    <ul>
      <li><nuxt-link v-on:click.native="scrollTop" to="/">Elena Iv-Skaya</nuxt-link></li>
      <li><nuxt-link to="/about">About</nuxt-link></li>
    </ul>
  </div>
</template>

<script>
import scrollbar from "~/utils/scrollbar.js";
import calcOffset from '~/utils/offset.js';
export default {
  methods: {
    scrollTop() {
      console.log('hello')
      if(this.$route.name !== 'index') return
      const container = this.$el.ownerDocument.getElementById('smooth-component');
      const destination = container.querySelector('.page');
      let offset = calcOffset.computeOffset(destination).top;
      scrollbar.scrollTo(container, offset)
    }
  }
}
</script>





