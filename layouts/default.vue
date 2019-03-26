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
    window.addEventListener('resize', this.resize);
    const container = this.$el;
    this.nav = container.querySelector('.nav');
    if(container.clientWidth > 768) {
      scrollbar.add(container, this.onScrollDefault);
    }
  },
  beforeDestroy() {
    const container = this.$el;
    if(container.clientWidth > 768) {
      scrollbar.unlisten(container, this.onScrollDefault)
      scrollbar.destroyAll();
    }
    window.removeEventListener('resize', this.resize);
  },
  methods: {
    resize () {
      const container = this.$el;
      if(container.clientWidth > 768) {
        scrollbar.add(container, this.onScroll);
      } else {
        scrollbar.destroyAll();
        this.nav.style.top = 0;
      }
    },
    onScrollDefault(status) {
      console.log('on scroll default');
      let offset = status.offset;
      this.nav.style.top = offset.y + 'px';
    }
  }
};
</script>

