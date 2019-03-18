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
                <p><span class="copyright">©</span> 2019</p>
              </div>
            </div>
          </div>
          <div class="serie-infos">
            <div class="serie-infos-column description">
              <span>about the serie</span>
              <p>{{description}}</p>
            </div>
          </div>
          <div class="chevron">
            <img class="preload" src="~assets/img/ui/chevron.svg">
          </div>
        </div>
      </div>
      <div class="serie-gallery">
        <div class="gallery-item" v-for="(image, i) in gallery" :key="i" :class="getClass(image.ratio)">
          <img class="preload" :src="image.image.url">
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
        <div class="slider-item" v-for="(image, i) in gallery" :key="i">
          <img class="preload" :src="image.image.url">
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
export default {
  async asyncData ({ app, params, error, store}) {
    try {
      let entry = await store.dispatch('GET_DOC', app.context.route);
      let data = entry.data;
      console.log(data.gallery);
      return {
        title: data.title[0].text,
        description: data.about_serie[0].text,
        date: data.date,
        credits: data.credits,
        featuredImage: data.cover_serie_image,
        gallery: data.gallery
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
  }
};
</script>


