<template>
  <div>
    <section class="page home" >
      <HomeHeader ref="homeHeader" v-if="featured" :featured="featured" :lastPublication="lastPublication"/>
      <div class="page-content">
        <HomeGallery :series="series" ref="homeGallery"/>
      </div>
    </section>
    <Footer/>
  </div>
</template>
<script>
import browser from '~/utils/browser.js'
import HomeHeader from "~/components/HomeHeader"
import HomeGallery from "~/components/HomeGallery"
import Footer from "~/components/Footer"
import math from "~/utils/math.js"
import reveal from "~/utils/reveal.js"
import lerp from '~/utils/lerp.js'
import raf from '~/utils/raf.js'
import { pageTransition } from '~/mixins/pageTransition.js'

export default {
  async asyncData ({ app, params, error, store}) {
    try {
      let entry = await store.dispatch('GET_DOC', app.context.route)
      let data = entry.data

      let series = data.series
      let featured = data.slides

      return {
        lastPublication: entry.last_publication_date,
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
    HomeGallery,
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
        },
         {
          hid: `og:title`,
          property: 'og:title',
          content: this.seo.title
        },
        {
          hid: `og:description`,
          property: 'og:description',
          content: this.seo.description
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
          hid: `twitter:title`,
          property: `twitter:title`,
          content: this.seo.title
        },
        {
          hid: `twitter:description`,
          property: `twitter:description`,
          content: this.seo.description
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
          href: this.$store.getters.currentDoc.data.loader_image.url
        }
      ],
    }
  },

  data () {
    return {
      container: null,
      cursor: null,
      cursorX: lerp(),
      cursorY: lerp(),
      updateStatus: null,
      updateStatusOffset: null,
      hasMoved: false
    }
  },

  mounted () {
    window.addEventListener('scroll', this.onScrollHome);
    window.addEventListener('resize', this.resize);
    this.$el.addEventListener('mousemove', this.moveCursor)

    this.lastPublication = this.formatDate(this.lastPublication)
    this.updateStatus = this.$refs.homeHeader.$refs.updateStatus
    this.cursor = this.$parent.$parent.$refs.cursor.$el
    this.galleryItems = this.$refs.homeGallery.$el.querySelectorAll('.gallery-item-wrapper')

    this.$nextTick(() => {
      this.setTheme('white')
      this.calcOffset()
      setTimeout(() => {
        if(browser.desktop && window.innerWidth > 768) {
          this.revealGalleryItems()
          raf.add(this.tickCursor)
        }
      }, 1)
    })
  },

  beforeDestroy () {
    window.removeEventListener('scroll', this.onScrollHome);
    window.removeEventListener('resize', this.resize);
    this.$el.removeEventListener('mousemove', this.moveCursor)

    if (window.innerWidth > 768) {
      this.reveal.destroy()
      raf.remove(this.tickCursor)
    }
  },

  methods: {
    calcOffset() {
      this.updateStatusOffset = this.updateStatus.getBoundingClientRect().height
    },
    formatDate(date) {
      const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
      let d = new Date(date);
      let month = monthNames[d.getMonth()]
      let year = d.getFullYear();

      if (month < 10) month = '0' + month

      return month + ' ' + year
    },
    setTheme(theme) {
      document.body.dataset.background = theme
    },
    onScrollHome(e) {
      this.$refs.homeGallery.offsetY = -window.scrollY

      if(window.scrollY > this.updateStatusOffset)  {
        this.updateStatus.classList.add('animate')
        this.$refs.homeGallery.enter()
       } else {
        this.updateStatus.classList.remove('animate')
        this.cursor.classList.remove('visible')
       }
    },
    tickCursor() {
      this.cursorX.update()
      this.cursorY.update()
      this.cursor.style.transform = `translate3d(${this.cursorX.get()}px, ${this.cursorY.get()}px, 0)`
    },
    moveCursor(cursor) {
      if(window.innerWidth < 768) return
      this.hasMoved = true
      this.cursorX.set(cursor.x - (this.cursor.clientWidth / 2))
      this.cursorY.set(cursor.y - (this.cursor.clientHeight / 2))
    },
    revealGalleryItems() {
      let tmp = this.galleryItems
      const items = Array.from(tmp).map((item, i) => {
        return {
          dom: item,
          ratioIn: 0.5,
          ratioOut: 1,
          update: () => this.$refs.homeGallery.currentIndex = i
        }
      })
      this.reveal = reveal(items)
    },
    resize () {
      if(browser.desktop && window.innerWidth > 768) {
        this.calcOffset()
      }
    }
  },
}
</script>
