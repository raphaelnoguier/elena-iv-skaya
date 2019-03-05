<template>
  <div id="app">
    <Navigation/>
    <Loader/>
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
    const container = this.$el;
    scrollbar.add(container, this.onScroll);
  },
  beforeDestroy() {
    const container = this.$el;
    scrollbar.remove(container);
  },
  methods: {
    onScroll(e) {
      console.log(e);
    }
  }
};
</script>

