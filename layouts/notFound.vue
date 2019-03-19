<template>
  <div class="error-wrapper">
    <div class="error">
      <div class="content">
        <span class="number">404</span>
        <div class="text">
          <nuxt-link to="/">
            go back home
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import anime from 'animejs'
export default {
  mounted() {
    let toFade = this.$el.querySelectorAll('.number, .text');

    anime({
      targets: toFade,
      opacity: [0,1],
      duration: 500,
      easing: 'easeInOutQuad'
    })
  }
}
</script>
