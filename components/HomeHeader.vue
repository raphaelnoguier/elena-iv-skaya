<template>
  <div class="page-introduction">
    <HomeSlider :type="'Big'" :featured="featured"/>
    <div class="right-col">
      <div class="small-slider-wrapper">
        <HomeSlider :type="'Small'" :featured="featured" />
        <div class="controls">
          <div class="left"><img src="~assets/img/ui/arrow.svg" class="preload"><span>previous</span></div>
          <div class="index">
            <span class="current">1 / </span>
            <span class="total">4</span>
          </div>
          <div v-on:click="nextSlide" class="right"><span>next</span><img src="~assets/img/ui/arrow.svg" class="preload"></div>
        </div>
      </div>
      <div v-for="(serie, index) in featured.slice(0,1)"  :key="index" class="serie-infos">
        <div class="title">
          <h3>{{serie.data.title[0].text}}</h3>
        </div>
        <div class="date">
          <p><span class="copyright">©</span> 2019</p>
        </div>
      </div>
      <div v-on:click="scrollDown" class="chevron">
        <img src="~assets/img/ui/chevron.svg" class="preload">
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
import scrollbar from "~/utils/scrollbar.js";
import calcOffset from '~/utils/offset.js';

export default {
  components: {
    HomeSlider
  },
  data() {
    return {
      slideIndex: 0
    }
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
    },
    scrollDown() {
      const container = this.$el.ownerDocument.getElementById('app');
      const destination = this.$el.ownerDocument.querySelector('.page-content');
      let offset = calcOffset.computeOffset(destination).top;
      scrollbar.scrollTo(container, offset)
    }
  },
  props: { featured: Array }
}
</script>

