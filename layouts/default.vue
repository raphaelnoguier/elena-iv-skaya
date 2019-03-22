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
  mounted() {
    window.addEventListener('resize', this.resize);
    const container = this.$el;

    if(container.clientWidth > 768) {
      scrollbar.add(container, this.onScroll);
    }
  },
  beforeDestroy() {
    const container = this.$el;
    if(container.clientWidth > 768) {
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
      }
    },
    onScroll(e) {
    }
  }
};
</script>

