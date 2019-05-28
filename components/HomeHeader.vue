<template>
  <div class="page-introduction">
    <HomeSlider :type="'Big'" :featured="featured"/>
    <div class="right-col">
      <div class="small-slider-wrapper">
        <HomeSlider :type="'Small'" :featured="featured" :index="slideIndex"/>
        <div class="controls" :class="transitioning ? 'disabled' : ''">
          <div v-on:click="slide('prev')" class="left">
            <img src="~assets/img/ui/arrow.svg" data-load="preload" alt="chevron prev">
            <span>previous</span>
          </div>
          <div class="index">
            <span class="current">{{slideIndex}} /</span>
            <span class="total">{{featured.length}}</span>
          </div>
          <div v-on:click="slide('next')" class="right">
            <span>next</span>
            <img src="~assets/img/ui/arrow.svg" data-load="preload" alt="chevron next">
          </div>
        </div>
      </div>
      <div class="serie-infos">
        <div class="title">
          <h3>
            <nuxt-link :to="`serie/${featured[textIndex - 1].serie.uid}`">{{featured[textIndex - 1].serie.data.title[0].text}}</nuxt-link>
          </h3>
        </div>
        <div class="date">
          <p><span class="copyright">©</span> {{featured[textIndex - 1].serie.data.date}}</p>
        </div>
      </div>
      <div v-on:click="scrollDown" class="chevron">
        <img src="~assets/img/ui/chevron.svg" data-load="preload" alt="chevron down">
      </div>
      <div class="update-status" ref="updateStatus">
        <div class="line"><div class="progress" ref="progressDrag"></div></div>
        <div class="status-text">
          <span class="last-updated">LAST UPDATED - {{lastPublication}}</span>
          <span class="hold-instructions">hold & drag</span>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import anime from 'animejs'
import HomeSlider from '~/components/HomeSlider'
import calcOffset from '~/utils/offset.js';
import BezierEasing from 'bezier-easing'
import browser from '~/utils/browser.js'

export default {
  components: {
    HomeSlider
  },
  data() {
    return {
      slideIndex: 1,
      textIndex: 1,
      transitioning: false,
      isSafari: browser.safari,
      easingTop: BezierEasing(0.85, 0.015, 0.175, 0.9)
    }
  },
  mounted() {
    this.$parent.$parent.$parent.$refs.fixedElements.$el.appendChild(this.$refs.updateStatus)
  },
  methods: {
    slide(direction) {
      let sliderWrapper = this.$el.querySelectorAll('.home-slider-wrapper');

      sliderWrapper.forEach(slider => {
        let slides = slider.querySelectorAll(".slide");
        let activeSlide = slider.querySelector(".active");
        let activeSlideIndex = activeSlide.dataset.slide;
        let isSmallSlider = slider.classList.contains('small-slider');
        const easingBottom = BezierEasing(isSmallSlider ? 0.85 : 0.7, 0.200, 0.175, 1)

        direction === 'next' ? activeSlideIndex++ : activeSlideIndex--;

        if (activeSlideIndex > slides.length) activeSlideIndex = 1

        if(activeSlideIndex < 1) activeSlideIndex = slides.length;

        this.slideIndex = activeSlideIndex;

        let nextSlide = slider.querySelector(".slide[data-slide='" + activeSlideIndex + "']");

        nextSlide.classList.add('behind');

        let values = {
          x: direction === 'next' ? 0 : 100,
        }

        anime({
          targets: values,
          duration: 1100,
          x: direction === 'next' ? 100 : 0,
          easing: 'easeInOutQuad',
          delay: isSmallSlider && window.innerWidth > 768 ? 200 : 0,
          update: (anime) => {
            const easeTop = this.easingTop(values.x / 100)
            const easeBottom = easingBottom(values.x / 100)

            if(direction === 'next') {
              if(this.isSafari) activeSlide.style.webkitClipPath = `polygon(${values.x * easeTop}% 0, 101% 0%, 101% 101%, ${easeBottom * values.x}% 101%)`
              else activeSlide.style.clipPath = `polygon(${values.x * easeTop}% 0, 101% 0%, 101% 101%, ${easeBottom * values.x}% 101%)`
            } else {
              if(this.isSafari) activeSlide.style.webkitClipPath =  `polygon(0 0, ${values.x * easeBottom}% 0%, ${values.x * easeTop}% 101%, 0 101%)`
              else activeSlide.style.clipPath = `polygon(0 0, ${values.x * easeBottom}% 0%, ${values.x * easeTop}% 101%, 0 101%)`
            }
          },
          complete: () => {
            this.isSafari ? activeSlide.style.webkitClipPath = '' : activeSlide.style.clipPath = ''
            activeSlide.classList.remove('active')
            nextSlide.classList.remove('behind')
            nextSlide.classList.add('active')
          }
        })

        this.slideText(direction)
      });
    },
    slideText(direction){
      this.transitioning = true

      let serieInfos = this.$el.querySelectorAll(".serie-infos .date, .serie-infos .title")
      let tl = anime.timeline({
        easing: 'easeInOutQuart',
        duration: 1000,
        direction: direction === 'next' ? 'normal' : 'reverse'
      })

      tl.add({
        targets: serieInfos,
        opacity: [1, 0],
        skewX: '-5deg',
        translateX: [0 , '9vw'],
        complete: () => {
          this.textIndex = this.slideIndex;
          if(direction === 'prev') {
            this.transitioning = false
          }
        }
      })
      .add({
        targets: serieInfos,
        opacity: [0, 1],
        translateX: ['-9vw', 0],
        skewX: ['20deg', 0],
        delay: function(el, i, l) {
          let delay = el.classList.contains('date') ? delay = 50 : delay =  0
          return delay
        },
        complete: () => {
          this.textIndex = this.slideIndex
          if(direction === 'next') {
            this.transitioning = false
          }
        }
      })
    },
    scrollDown() {
      const destination = this.$el.ownerDocument.querySelector('.page-content');
      let offset = calcOffset.get(destination).top;

      window.scroll(0, offset)
    }
  },
  props: { featured: Array, lastPublication: String }
}
</script>

