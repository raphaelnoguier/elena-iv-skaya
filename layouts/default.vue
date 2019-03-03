<template>
  <div>
    <Navigation/>
    <nuxt/>
  </div>
</template>
<script>
import Navigation from "~/components/Navigation";

export default {
  components: {
    Navigation
  },
  mounted() {
    const app = this.$el;
    const smooth = new Smooth({
      native: true,
      section: app,
      ease: 0.4
    });
    smooth.init();
  }
};
</script>

