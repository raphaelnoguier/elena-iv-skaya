<template>
  <div style="width: 100vw; height: 100vh;">
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
    console.log("hello");
    const container = this.$el;
    scrollbar.remove(container);
    console.log("removed");
  },
  methods: {
    onScroll(e) {
      console.log(e);
    }
  }
};
</script>

