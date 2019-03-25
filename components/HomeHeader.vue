<template>
  <div class="page-introduction">
    <HomeSlider :type="'Big'" :featured="featured"/>
    <div class="right-col">
      <div class="small-slider-wrapper">
        <HomeSlider :type="'Small'" :featured="featured" :index="slideIndex"/>
        <div class="controls" :class="transitioning ? 'disabled' : ''">
          <div v-on:click="slide('prev')" class="left">
            <img src="~assets/img/ui/arrow.svg" class="preload">
            <span>previous</span>
          </div>
          <div class="index">
            <span class="current">{{slideIndex}} /</span>
            <span class="total">{{featured.length}}</span>
          </div>
          <div v-on:click="slide('next')" class="right">
            <span>next</span>
            <img src="~assets/img/ui/arrow.svg" class="preload">
          </div>
        </div>
      </div>
      <div class="serie-infos" :class="transitioning ? 'transitioning' : ''">
        <div class="title">
          <h3>{{featured[textIndex - 1].serie.data.title[0].text}}</h3>
        </div>
        <div class="date">
          <p><span class="copyright">©</span> {{featured[textIndex - 1].serie.data.date}}</p>
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
      slideIndex: 1,
      textIndex: 1,
      transitioning: false
    }
  },
  methods: {
    slide(direction) {
      let sliderWrapper = this.$el.querySelectorAll('.home-slider-wrapper');
      this.transitioning = true;
      sliderWrapper.forEach(slider => {
        let slides = slider.querySelectorAll(".slide");
        let activeSlide = slider.querySelector(".active");
        let activeSlideIndex = activeSlide.dataset.slide;

        direction === 'next' ? activeSlideIndex++ : activeSlideIndex--;

        if (activeSlideIndex > slides.length) activeSlideIndex = 1

        if(activeSlideIndex < 1) activeSlideIndex = slides.length;

        this.slideIndex = activeSlideIndex;

        let nextSlide = slider.querySelector(".slide[data-slide='" + activeSlideIndex + "']");

        nextSlide.classList.add('behind');

        let clipPathValue = {
          value: 0,
        }

        anime({
          targets: clipPathValue,
          value: 100,
          duration: 1000,
          easing: 'easeInOutQuart',
          update: (anime) => {
            console.log(clipPathValue)
            activeSlide.style.clipPath = `polygon(${clipPathValue.value}% 0, 100% 0%, 100% 100%, ${clipPathValue.value * 1.15}% 100%)`
          },
          complete: () => {
            this.transitioning = false;
            activeSlide.style.clipPath = '';
            activeSlide.classList.remove('active');
            nextSlide.classList.remove('behind');
            nextSlide.classList.add('active');
          }
        })
        this.slideText(direction);
      });
    },
    slideText(direction){
      let serieInfos = this.$el.querySelectorAll(".serie-infos .date, .serie-infos .title")
      let tl = anime.timeline({
        easing: 'easeInOutQuart',
        duration: 750,
        direction: direction === 'next' ? 'normal' : 'reverse'
      });

      tl.add({
        targets: serieInfos,
        opacity: [1, 0],
        translateX: [0 , '6.250vw'],
        letterSpacing: [0, '3px'],
        complete: () => {
          direction === 'next' ? this.textIndex = this.slideIndex : null;
        }
      })
      .add({
        targets: serieInfos,
        opacity: [0, 1],
        translateX: ['-6.250vw', 0],
        letterSpacing: ['-3px', 0],
        complete: () => {
          direction === 'next' ? null : this.textIndex = this.slideIndex;
        }
      })
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

