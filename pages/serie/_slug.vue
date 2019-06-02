<template>
  <div>
    <div class="page serie">
      <div class="serie-page-header">
        <div class="featured-image">
          <div class="image-mask"></div>
          <img data-load="preload" :src="featuredImage.url" :alt="`main-image-${title}`">
        </div>
        <div class="serie-hero">
          <div class="row">
            <div class="back-link">
              <nuxt-link to="/">
                <Arrow />
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
            <img data-load="preload" src="~assets/img/ui/chevron.svg" alt="chevron-down icon">
          </div>
        </div>
      </div>
      <div ref="serieGallery" class="serie-gallery">
        <div class="gallery-item" v-for="(image, i) in gallery" :key="i" :class="getClass(image.ratio)">
          <div class="relative-container">
            <img v-lazy="image.image.url" :alt="`Serie ${title}#${i}`">
            <div class="placeholder"></div>
          </div>
          <div class="relative-container duo" v-if="image.ratio === 'Duo'">
            <img v-lazy="image.duo_image.url" :alt="`Serie ${title}#${i}`">
            <div class="placeholder"></div>
          </div>
        </div>
      </div>
      <div class="serie-credits-wrapper">
        <div class="serie-credits">
          <span :class="credits[0].text[0].text.length === 0 && 'hide'">credits</span>
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
    <SerieSlider ref="serieSlider" :nextSeries="nextSeries"/>
  </div>
</template>
<script>
import SerieSlider from '~/components/SerieSlider'
import Arrow from '~/components/Arrow'
import reveal from "~/utils/reveal.js"
import calcOffset from '~/utils/offset.js';
import browser from '~/utils/browser.js';
import { pageTransition } from '~/mixins/pageTransition.js'
import math from '~/utils/math.js'
import raf from '~/utils/raf.js'
import TweenLite from 'gsap'

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
    Arrow
  },
  mixins: [ pageTransition ],
  data() {
    return {
      container: null,
      featuredImageOffset: null,
      nav: null,
      offsetY: null,
      galleryItems: null,
      parallax: [],
      running: false
    }
  },
  head() {
    return{
      title: 'Elena Iv-Skaya - ' + this.title,
      meta: [
        {
          hid: "description",
          name: "description",
          content: this.description
        },
        {
          hid: `og:title`,
          property: 'og:title',
          content: 'Elena Iv-Skaya - ' + this.title,
        },
        {
          hid: `og:url`,
          property: 'og:url',
          content: `https://ivskaya.com/${this.$route.path}`
        },
        {
          hid: `og:type`,
          property: 'og:type',
          content: "website"
        },
        {
          hid: `og:description`,
          property: 'og:description',
          content: this.description
        },
        {
          hid: `og:image`,
          property: 'og:image',
          content: this.$store.getters.currentDoc.data.loader_image.url
        },
        {
          hid: `twitter:card`,
          property: `twitter:card`,
          content: 'summary_large_image'
        },
        {
          hid: `twitter:url`,
          property: `twitter:url`,
          content: `https://ivskaya.com/${this.$route.path}`
        },
        {
          hid: `twitter:title`,
          property: `twitter:title`,
          content: 'Elena Iv-Skaya - ' + this.title
        },
        {
          hid: `twitter:description`,
          property: `twitter:description`,
          content: this.description
        },
        {
          hid: `twitter:image`,
          property: `twitter:image`,
          content: this.$store.getters.currentDoc.data.loader_image.url
        },
      ],
      link: [
        {
          rel: 'icon',
          type: 'image/png',
          href: this.featuredImage.url
        },
      ],
    }
  },
  mounted() {
    this.$store.commit('SET_SERIE_LOADER_IMG', this.$store.getters.currentDoc.data.loader_image.url)
    this.nav = this.$parent.$parent.$el.querySelector('.nav');
    this.galleryItems = this.$refs.serieGallery.querySelectorAll('.gallery-item .relative-container')
    document.body.classList.remove('lock')

    this.$nextTick(() => {
      this.$parent.$parent.calcScroll()
      if (window.innerWidth > 768){
        window.addEventListener('scroll', this.onScrollSerie, false);
        this.calcOffset()
        this.initParallax()
        this.enableRaf()
      }
      this.revealSlider()
    });

    window.addEventListener('resize', this.resize);
  },
  beforeDestroy () {
    if (browser.desktop && window.innerWidth > 768) {
      this.reveal.destroy()
      raf.remove(this.tick)
      window.removeEventListener('scroll', this.onScrollSerie,false);
      window.removeEventListener('resize', this.resize);
    }
  },
  methods: {
    enableRaf() {
      raf.add(this.tick)
    },
    disableRaf() {
      raf.remove(this.tick)
    },
    initParallax() {
      this.parallax = []
      this.galleryItems.forEach((item, i) => {
        this.parallax.push({ offsetTop: item.offsetTop, parallax: item })
      });
    },
    transform(item, y) {
      item.style.transform = `translate3d(0, ${y}vw, 0)`
    },
    resetParallax() {
      for (let i = 0; i < this.parallax.length; i++) {
        const item = this.parallax[i].parallax
        item.style.transform = 'translate3d(0, 0px, 0)'
      }
    },
    tick() {
      const wHeight =  window.innerHeight
      for (let i = 0; i < this.parallax.length; i++) {
        const item = this.parallax[i].parallax
        const offsetTop = (-this.offsetY) + this.parallax[i].offsetTop

        const min = (-wHeight * 0.5) - wHeight * 0.75
        const max = wHeight + (wHeight * 0.75)

        if (offsetTop > min && offsetTop < max) {
          let y = null

          item.classList.contains('duo') ?
          y = math.map(offsetTop, min, max, -6.944, 45.139)
          :
          y = math.map(offsetTop, min, max, -3.472, 24.306)

          this.transform(item, y)
        }
      }
    },
    calcOffset() {
      let image = this.$el.querySelector('.featured-image').getBoundingClientRect()
      this.featuredImageOffset = image.height
    },
    resize() {
      if(window.innerWidth > 768) {
        this.calcOffset()
        this.initParallax()
      }
      else {
        this.resetParallax()
        raf.remove(this.tick)
      }
    },
    revealSlider() {
      this.reveal = reveal(
        { dom: this.$refs.serieSlider.$el, ratioIn: 0.1, update: (status) => {
          if(document.body.classList.contains('lock')) return
          if(status.includes('down')) {
            this.disableRaf()
            this.$refs.serieSlider.enableRaf()
            this.setTheme('dark')
          } else {
            if(status.includes('up-enter')) return
            this.enableRaf()
            this.$refs.serieSlider.disableRaf()
            this.$refs.serieSlider.disableCursor()
            this.setTheme('white')
          }
        } }
      )
    },
    onScrollSerie(status) {
      this.offsetY = window.scrollY
      this.nav.classList.toggle('black-link' , this.offsetY > this.featuredImageOffset)
    },
    scrollDown() {
      const destination = this.$el.ownerDocument.querySelector('.serie-gallery');
      let offset = calcOffset.get(destination).top;

      window.scroll(0, offset)
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
    vw(v) {
      var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0)
      return (v * w) / 100
    },
  }
};
</script>


