<template>
  <transition :duration="1000" v-on:enter="enter" :leave="leave" name="height-image-mask">
    <div class="transition-layer">
      <div class="image">
        <img :src="transitionImage" />
      </div>
    </div>
  </transition>
</template>

<script>
import anime from 'animejs';

export default {
  methods : {
    enter (el, done) {
      console.log(el);
      var tl = anime.timeline({
        easing: 'easeInOutQuad',
        duration: 500 
      });

      let layer = el;
      let image = el.querySelector('img');

      layer.classList.add('animating');

      tl.add({
        targets: layer,
        height: '100vh',
        complete: () => {
          layer.style.top = 0;
          image.classList.add('hide');
        }
      })
      .add({
        targets: layer,
        height: 0,
        complete: () => {
          done();
        }
      })
    },
    leave() {
      console.log('leave')
    }
  },
  mounted() {
  },
  props: {transitionImage: String}
}
</script>



