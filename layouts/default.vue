<template>
  <div>
    <Navigation/>
    <Loader/>
    <nuxt/>
  </div>
</template>
<script>
import Navigation from "~/components/Navigation";
import Loader from "~/components/Loader";

export default {
  components: {
    Navigation,
    Loader
  },
  mounted() {
    const app = this.$el;
    const smooth = new Smooth({
      native: true,
      section: app
    });
    smooth.init();
  }
};
</script>

