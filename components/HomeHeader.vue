<template>
  <div class="page-introduction">
    <HomeSlider :type="'Big'" :series="series"/>
    <div class="right-col">
      <HomeSlider :type="'Small'" :series="series" />
      <div class="controls">
        <div class="left"><img src="~assets/img/ui/arrow.svg"><span>previous</span></div>
        <div class="dots">
          <ul>
            <li v-for="(serie, index) in series" :key="index"></li>
          </ul>
        </div>
        <div v-on:click="nextSlide" class="right"><span>next</span><img src="~assets/img/ui/arrow.svg"></div>
      </div>
      <div v-for="(serie, index) in series.slice(0,1)"  :key="index" class="serie-infos">
        <div class="title">
          <h3>{{serie.title[0].text}}</h3>
        </div>
        <div class="date">
          <span>© 2019</span>
        </div>
      </div>
      <div class="chevron">
        <img src="~assets/img/ui/chevron.svg">
      </div>
      <div class="update-status">
        <div class="line" />
        <span>LAST UPDATED - FEB 2019</span>
      </div>
    </div>
  </div>
</template>


<script>
import anime from 'animejs'
import HomeSlider from '~/components/HomeSlider'

export default {
  components: {
    HomeSlider
  },
  data() {
    return {
      slideIndex: 0
    }
  },
  mounted() {

  },
  methods: {
    nextSlide() {
      let sliderWrapper = this.$el.querySelector('.big-slider');
      let slides = sliderWrapper.querySelectorAll(".slide");
      let activeSlide = sliderWrapper.querySelector(".active");
      let activeSlideIndex = activeSlide.dataset.slide;
      activeSlideIndex++;

      if (activeSlideIndex <= slides.length) {
        let nextSlide = sliderWrapper.querySelector(
            ".slide[data-slide='" + activeSlideIndex + "']"
          );
          activeSlide.classList.add("sliding");
          nextSlide.classList.add("active");
          activeSlide.addEventListener('animationend', function() {
            activeSlide.classList.remove('active');
            nextSlide.classList.add("active");
          })
      } else {
        let nextSlide = sliderWrapper.querySelector(".slide[data-slide='1']");
        activeSlide.classList.remove("active");
        activeSlide.classList.remove("sliding");
        nextSlide.classList.add("active");
        activeSlideIndex = 0;
      }

      this.mirror();
    },
    mirror() {
      let sliderWrapper = this.$el.querySelector('.small-slider');
      let slides = sliderWrapper.querySelectorAll(".slide");
      let activeSlide = sliderWrapper.querySelector(".active");
      let activeSlideIndex = activeSlide.dataset.slide;
      activeSlideIndex++;

      if (activeSlideIndex <= slides.length) {
        let nextSlide = sliderWrapper.querySelector(
            ".slide[data-slide='" + activeSlideIndex + "']"
          );
          activeSlide.classList.add("sliding");
          nextSlide.classList.add("active");
          activeSlide.addEventListener('animationend', function() {
            activeSlide.classList.remove('active');
            nextSlide.classList.add("active");
          })
      } else {
        let nextSlide = sliderWrapper.querySelector(".slide[data-slide='1']");
        activeSlide.classList.remove("active");
        activeSlide.classList.remove("sliding");
        nextSlide.classList.add("active");
        activeSlideIndex = 0;
      }
    }
  },
  props: { series: Array }
}
</script>

