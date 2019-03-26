<template>
  <div>
    <div class="page serie">
      <div class="serie-page-header">
        <div class="featured-image">
          <img class="preload" :src="featuredImage.url">
        </div>
        <div class="serie-hero">
          <div class="row">
            <div class="back-link">
              <nuxt-link to="/">
                <img class="preload" src="~assets/img/ui/arrow.svg">
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
            <img class="preload" src="~assets/img/ui/chevron.svg">
          </div>
        </div>
      </div>
      <div class="serie-gallery">
        <div class="gallery-item" v-for="(image, i) in gallery" :key="i" :class="getClass(image.ratio)">
          <img :src="image.image.url" class="preload">
          <img v-if="image.ratio === 'Duo'" :src="image.duo_image.url" class="preload">
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
    <div class="serie-slider-wrapper">
      <div class="line"></div>
      <div class="serie-slider-title">
        <span>Gallery</span>
      </div>
      <div class="serie-slider">
        <div class="slider-item" v-for="(item, i) in nextSeries" :key="i">
          <img v-if="item.serie.data.cover_ratio.includes('Landscape')" :src="item.serie.data.fallback_landscape_cover.url">
          <img v-else class="preload" :src="item.serie.data.cover_serie_image.url">
        </div>
      </div>
      <div class="slider-controls">
        <div class="upper">
          <div class="play">
            <img class="preload" src="~/assets/img/ui/play.svg">
          </div>
          <div class="title">
            <span>A somewhat classic beauty</span>
          </div>
          <div class="index">
            <span class="current">1 /</span>
            <span class="total">41</span>
          </div>
        </div>
        <div class="bottom">
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import scrollbar from "~/utils/scrollbar.js";
import calcOffset from '~/utils/offset.js';
export default {
  head() {
    return{
      title: this.title,
      link: [
        {
          rel: 'icon',
          type: 'image/png',
          href: this.featuredImage.url
        }
      ],
    }
  },
  async asyncData ({ app, params, error, store}) {
    try {
      const route = app.context.route
      let entry = await store.dispatch('GET_DOC', app.context.route);
      let data = entry.data;
      let nextSeries = await store.dispatch('GET_ALL_SERIES');

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
  methods: {
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
    scrollDown() {
      const container = this.$el.ownerDocument.getElementById('app');
      const destination = this.$el.querySelector('.serie-gallery');
      let offset = calcOffset.computeOffset(destination).top;
      scrollbar.scrollTo(container, offset)
    }
  }
};
</script>


