<template>
  <div>
    <div class="page serie">
      <div class="serie-page-header">
        <div class="featured-image">
          <div class="image-mask"></div>
          <img data-load="preload" :src="featuredImage.url">
        </div>
        <div class="serie-hero">
          <div class="row">
            <div class="back-link">
              <nuxt-link to="/">
                <img data-load="preload" src="~assets/img/ui/arrow.svg">
                <span>Back to gallery </span>
              </nuxt-link>
            </div>
            <div class="serie-title">
              <div class="title">
                <h3>{{title}}</h3>
              </div>
              <div class="date">
                <p><span class="copyright">©</span> {{date}}</p>
              </div>
            </div>
          </div>
          <div class="serie-infos">
            <div class="serie-infos-column description">
              <span>about the serie</span>
              <p>{{description}}</p>
            </div>
          </div>
          <div v-on:click="scrollDown" class="chevron">
            <img data-load="preload" src="~assets/img/ui/chevron.svg">
          </div>
        </div>
      </div>
      <div class="serie-gallery">
        <div class="gallery-item" v-for="(image, i) in gallery" :key="i" :class="getClass(image.ratio)">
          <img :src="image.image.url" data-load="preload">
          <img v-if="image.ratio === 'Duo'" :src="image.duo_image.url" data-load="preload">
        </div>
      </div>
      <div class="serie-credits-wrapper">
        <div class="serie-credits">
          <span>credits</span>
          <ul>
            <li v-for="(credit, i) in credits" :key="i">{{credit.text[0].text}}</li>
          </ul>
        </div>
      </div>
      <div class="serie-footer">
        <span>continue exploring</span>
        <div class="line"></div>
      </div>
    </div>
    <SerieSlider :nextSeries="nextSeries"/>
  </div>
</template>
<script>
import SerieSlider from '~/components/SerieSlider'
import reveal from "~/utils/reveal.js"
import scrollbar from "~/utils/scrollbar.js";
import calcOffset from '~/utils/offset.js';
import browser from '~/utils/browser.js';
import { pageTransition } from '~/mixins/pageTransition.js'

export default {
  async asyncData ({ app, params, error, store}) {
    try {
      const route = app.context.route
      let entry = await store.dispatch('GET_DOC', app.context.route);
      let data = entry.data;
      let nextSeries = await store.dispatch('GET_ALL_SERIES');

      //Delete current serie from object / move the prev series to the end
      let indexCurrentSerie = nextSeries.findIndex(el => el.serie.uid === route.params.slug)
      typeof indexCurrentSerie !== undefined && nextSeries.splice(indexCurrentSerie, 1)
      if(indexCurrentSerie > 0) {
        nextSeries.splice(0, indexCurrentSerie).forEach(serie => {
          nextSeries.splice(nextSeries.length, 0, serie);
        });
      }

      return {
        title: data.title[0].text,
        description: data.about_serie[0].text,
        date: data.date,
        credits: data.credits,
        featuredImage: data.cover_serie_image,
        gallery: data.gallery,
        nextSeries: nextSeries
      }
    } catch (err) {
      error({statusCode: 404, message: `The page you are looking for does not exist. `, err: err})
    }
  },
  components: {
    SerieSlider
  },
  mixins: [ pageTransition ],
  data() {
    return {
      featuredImageOffset: null
    }
  },
  head() {
    return{
      title: 'Elena Iv-Skaya - ' + this.title,
      link: [
        {
          rel: 'icon',
          type: 'image/png',
          href: this.featuredImage.url
        }
      ],
    }
  },
  mounted() {
    const container = this.$el.ownerDocument.getElementById('smooth-component');
    this.revealSlider()
    container.dataset.background = 'white'
    window.addEventListener('resize', this.resize);
    this.$nextTick(() => {
      if (window.innerWidth > 768 && browser.desktop){
        const container = this.$el.ownerDocument.getElementById('smooth-component');
        scrollbar.listen(container, this.onScrollSerie);
        scrollbar.resetPosition(container);
        this.calcOffset();
      }
    });
  },
  beforeDestroy () {
    const container = this.$el.ownerDocument.getElementById('smooth-component');
    if (browser.desktop && window.innerWidth > 768) {
      scrollbar.unlisten(container, this.onScrollSerie);
      window.removeEventListener('resize', this.resize);
    }
  },
  methods: {
    calcOffset() {
      let image = this.$el.querySelector('.featured-image').getBoundingClientRect();
      this.featuredImageOffset = image.height
    },
    resize() {
      if(browser.desktop && window.innerWidth > 768) {
        const container = this.$el.ownerDocument.getElementById('app');
        scrollbar.listen(container, this.onScrollSerie);
        this.calcOffset();
      }
    },
    revealSlider() {
      let slider = this.$el.querySelector('.serie-slider-wrapper');
      this.reveal = reveal(
        { dom: slider, ratioIn: 0.2 }
      )
    },
    resize() {
      if(browser.desktop && window.innerWidth > 768) {
        const container = this.$el.ownerDocument.getElementById('smooth-component');
        scrollbar.listen(container, this.onScrollSerie);
      }
    },
    getClass(ratio) {
      if (ratio.includes('Portrait')) {
        return 'portrait'
      }
      if (ratio.includes('Landscape')) {
        return 'landscape'
      }
      if(ratio.includes('Duo')){
        return 'duo'
      }
    },
    onScrollSerie(status) {
      let nav = this.$el.ownerDocument.querySelector('.nav');
      nav.classList.toggle('black-link' , status.offset.y > this.featuredImageOffset)
    },
    scrollDown() {
      const container = this.$el.ownerDocument.getElementById('smooth-component');
      const destination = this.$el.querySelector('.serie-gallery');
      let offset = calcOffset.computeOffset(destination).top;
      scrollbar.scrollTo(container, offset)
    },
  }
};
</script>


