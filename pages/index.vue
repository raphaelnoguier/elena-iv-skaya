<template>
  <div>
    <section class="page home" >
      <HomeHeader v-if="featured" :featured="featured" />
      <div class="page-content" :class="dragMode ? 'black' : ''">
        <div class="gallery">
          <div class="gallery-wrapper" :class="dragMode ? 'drag-mode' : ''">
            <div v-for="(serie, index) in series" :key="index" class="gallery-item" :class="getClass(serie.serie.data.cover_ratio)">
              <nuxt-link v-on:click.native="updateTransitionImg(serie.serie.data.cover_serie_image.url)" :to="`/serie/${serie.serie.uid}`">
                <div class="gallery-mask left"></div>
                <img v-lazy="serie.serie.data.cover_serie_image.url" />
                <div class="gallery-mask right"></div>
                <div class="item-title">
                  <h3>{{serie.serie.data.title[0].text}}</h3>
                  <span>{{serie.serie.data.category}}</span>
                </div>
              </nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </section>
    <Footer/>
  </div>
</template>
<script>
import browser from '~/utils/browser.js'
import scrollbar from "~/utils/scrollbar.js"
import HomeHeader from "~/components/HomeHeader"
import Footer from "~/components/Footer"
import reveal from "~/utils/reveal.js"
import { pageTransition } from '~/mixins/pageTransition.js'

export default {
  async asyncData ({ app, params, error, store}) {
    try {
      let entry = await store.dispatch('GET_DOC', app.context.route)
      let data = entry.data

      let series = data.series
      let featured = data.slides

      return {
        featured: featured,
        series: series,
        seo: {
          title: data.seo_title,
          description: data.seo_description
        },
      }

    } catch (err) {
      error({statusCode: 404, message: `The page you are looking for does not exist. `, err: err})
    }
  },
  mixins: [ pageTransition ],
  components: {
    HomeHeader,
    Footer
  },
  head() {
    return {
      title: this.seo.title,
      meta: [
        {
          hid: "description",
          name: "description",
          content: this.seo.description
        }
      ],
      link: [
        {
          rel: 'icon',
          type: 'image/png',
          href: this.$store.getters.currentDoc.data.loader_image.url
        }
      ],
    }
  },

  data () {
    return {
      container: null
    }
  },

  mounted () {
    this.container = this.$el.ownerDocument.getElementById('smooth-component')
    this.container.dataset.background = ''
    let scrollY = this.$store.state.position
    this.$nextTick(() => {
      this.revealGallery()
      setTimeout(() => {
        if(scrollY > 0) scrollbar.setPosition(this.container, scrollY)
      }, 1)
    })
  },

  methods: {
    revealGallery() {
      let tmp = this.$el.querySelectorAll('.gallery-mask');
      const imgs = Array.from(tmp).map(img => {
        return {
          dom: img,
          ratioIn: 0.3,
        }
      })
      this.reveal = reveal(imgs)
    },
    updateTransitionImg(serieCover) {
      this.$store.getters.currentDoc.data.loader_image.url = serieCover
    },
    getClass(ratio) {
      if(ratio.includes('Big')){
        return 'full'
      }
      if (ratio.includes('Landscape')) {
        return 'landscape'
      }
      if (ratio.includes('Portrait')) {
        return 'portrait'
      }
    },
  },
}
</script>
