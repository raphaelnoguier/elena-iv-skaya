<template>
  <div id="app" :class="$route.name === 'About' || $route.name === 'about' ? 'dark' : ''">
    <Loader/>
    <Navigation/>
    <nuxt/>
  </div>
</template>
<script>
import Navigation from "~/components/Navigation";
import Loader from "~/components/Loader";
import scrollbar from "~/utils/scrollbar.js";
import browser from '~/utils/browser.js';

export default {
  components: {
    Navigation,
    Loader
  },
  data() {
    return {
      nav: null
    }
  },
  mounted() {
    const container = this.$el;
    this.nav = container.querySelector('.nav');
    window.addEventListener('resize', this.resize);
    if (browser.desktop && window.innerWidth > 768) {
      scrollbar.add(container, this.onScrollDefault);
    }
  },
  beforeDestroy() {
    const container = this.$el;
    if(browser.desktop && window.innerWidth > 768) {
      scrollbar.unlisten(container, this.onScrollDefault)
      scrollbar.destroyAll();
      window.removeEventListener('resize', this.resize);
    }
  },
  methods: {
    resize () {
      const container = this.$el;
      if (browser.desktop && window.innerWidth > 768) {
        scrollbar.add(container, this.onScrollDefault);
      } else {
        scrollbar.destroyAll();
        this.nav.style.top = 0;
      }
    },
    onScrollDefault(status) {
      let offset = status.offset;
      this.nav.style.top = offset.y + 'px';
    }
  }
};
</script>

