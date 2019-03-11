<template>
  <div id="app">
    <Navigation/>
    <Loader/>
    <nuxt/>
    <Footer/>
  </div>
</template>
<script>
import Navigation from "~/components/Navigation";
import Footer from "~/components/Footer";
import Loader from "~/components/Loader";
import scrollbar from "~/utils/scrollbar.js";

export default {
  components: {
    Navigation,
    Loader,
    Footer
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
    }
  }
};
</script>

