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
      <div ref="serieGallery" class="serie-gallery">
        <ZoomSerie ref="zoomSerie" :currentZoomImage="currentZoomImage" :currentZoomImageHeight="currentZoomImageHeight" />
        <div class="gallery-item" v-for="(image, i) in gallery" :key="i" :class="getClass(image.ratio)">
          <img v-lazy="image.image.url">
          <img v-if="image.ratio === 'Duo'" v-lazy="image.duo_image.url">
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
      <div class="serie-footer" ref="serieFooter">
        <span>continue exploring</span>
        <div class="line"></div>
      </div>
    </div>
    <SerieSlider ref="serieSlider" :nextSeries="nextSeries"/>
  </div>
</template>
<script>
import SerieSlider from '~/components/SerieSlider'
import reveal from "~/utils/reveal.js"
import scrollbar from "~/utils/scrollbar.js";
import calcOffset from '~/utils/offset.js';
import browser from '~/utils/browser.js';
import ZoomSerie from "~/components/ZoomSerie"
import { pageTransition } from '~/mixins/pageTransition.js'
import math from '~/utils/math.js'

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
    SerieSlider,
    ZoomSerie
  },
  mixins: [ pageTransition ],
  data() {
    return {
      container: null,
      featuredImageOffset: null,
      serieSliderOfsset: null,
      nav: null,
      sliderEnter: false,
      serieGallery: null,
      serieGalleryOffsetBotttom: null,
      zoomSerie: null,
      zoomBlocHeight: null,
      currentImage: null,
      currentZoomImage: null,
      currentZoomImageHeight: null,
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
    this.container = this.$el.ownerDocument.getElementById('smooth-component');
    this.nav = this.$parent.$parent.$el.querySelector('.nav');
    this.zoomSerie = this.$refs.zoomSerie
    this.imageZoomSerie = this.zoomSerie.$refs.imageZoomSerie
    this.serieGallery = this.$refs.serieGallery

    window.addEventListener('resize', this.resize);
    this.$nextTick(() => {
      if (window.innerWidth > 768 && browser.desktop){
        scrollbar.listen(this.container, this.onScrollSerie)
        scrollbar.resetPosition(this.container)
        this.calcOffset()
        this.revealGalleryItems()
      }

      this.revealSlider()
    });
  },
  beforeDestroy () {
    if (browser.desktop && window.innerWidth > 768) {
      this.reveal.destroy()
      this.revealGalleryItems.destroy()
      scrollbar.unlisten(this.container, this.onScrollSerie);
      window.removeEventListener('resize', this.resize);
    }
  },
  methods: {
    calcOffset() {
      let image = this.$el.querySelector('.featured-image').getBoundingClientRect()
      this.featuredImageOffset = image.height
      this.zoomBlocHeight = this.zoomSerie.$el.getBoundingClientRect().top

      this.serieGalleryOffsetBotttom = this.serieGallery.getBoundingClientRect().bottom
    },
    resize() {
      if(browser.desktop && window.innerWidth > 768) {
        scrollbar.listen(this.container, this.onScrollSerie);
        this.calcOffset();
      }
    },
    revealGalleryItems() {
      let tmp = this.$el.querySelectorAll('.gallery-item img:last-child');
      const items = Array.from(tmp).map((item, index) => {
        return {
          dom: item,
          ratioIn: 1,
          ratioOut: 1,
          update: () => {
            this.setCurrentZoom(item)
            if(index === items.length - 1) console.log('end')
          }
        }
      })
      this.revealGalleryItems = reveal(items)
    },
    revealSlider() {
      this.reveal = reveal(
        { dom: this.$refs.serieSlider.$el, ratioIn: 0.1, update: () => {
          this.$refs.serieSlider.toggleRaf()
          this.$refs.serieSlider.toggleCursor()
          this.sliderEnter = !this.sliderEnter
          this.sliderEnter ? this.setTheme('dark') : this.setTheme('white')
          this.nav.classList.toggle('white')
          this.$refs.serieFooter.classList.toggle('white')
        } }
      )
    },
    onScrollSerie(status) {
      this.nav.classList.toggle('black-link' , status.offset.y > this.featuredImageOffset)

      if(this.serieGalleryOffsetBotttom > status.offset.y) {
        this.zoomSerie.$el.style.transform = `translate3d(0,${status.offset.y}px, 0)`
        this.transformZoom(status.offset.y)
      }
    },
    setCurrentZoom(item) {
      this.currentImage = item
      this.currentZoomImage = item.src
      this.currentZoomImageHeight = item.height
    },
    transformZoom(y) {
      if(!this.currentImage) return
      let imageOffsetY = calcOffset.computeOffset(this.currentImage).top
      let transformY = math.map(y, imageOffsetY, imageOffsetY + this.currentZoomImageHeight, 0, this.currentZoomImageHeight - this.zoomBlocHeight)

      this.imageZoomSerie.style.transform = `translate3d(0, ${- (transformY * 1.35 )}px, 0) scale(1.5)`
    },
    scrollDown() {
      const container = this.$el.ownerDocument.getElementById('smooth-component');
      const destination = this.$el.querySelector('.serie-gallery');
      let offset = calcOffset.computeOffset(destination).top;
      scrollbar.scrollTo(container, offset)
    },
    setTheme(theme) {
      document.body.dataset.background = theme
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
  }
};
</script>


