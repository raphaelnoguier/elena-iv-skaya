<template>
  <div class="nav">
    <ul>
      <li>
        <nuxt-link v-on:click.native="scrollTop" to="/">Elena Iv-Skaya</nuxt-link>
      </li>
      <li><nuxt-link to="/about">About</nuxt-link></li>
    </ul>
  </div>
</template>

<script>
import calcOffset from '~/utils/offset.js';
export default {
  methods: {
    scrollTop() {
      if(this.$route.name !== 'index') return
      const destination = this.$el.ownerDocument.querySelector('.page');
      let offset = calcOffset.get(destination).top;

      window.scroll(0, offset)
    }
  }
}
</script>





