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
import scrollbar from "~/utils/scrollbar.js"
import HomeHeader from "~/components/HomeHeader"
import HomeGallery from "~/components/HomeGallery"
import Footer from "~/components/Footer"
import math from "~/utils/math.js"
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
      container: null,
      updateStatus: null,
      updateStatusOffset: null,
    }
  },

  mounted () {
    window.addEventListener('resize', this.resize);

    this.lastPublication = this.formatDate(this.lastPublication)
    this.updateStatus = this.$refs.homeHeader.$refs.updateStatus
    this.container = this.$el.ownerDocument.getElementById('smooth-component')
    let scrollY = this.$store.state.position

    this.$nextTick(() => {
      this.setTheme()
      this.calcOffset()
      setTimeout(() => {
        if(scrollY > 0) scrollbar.setPosition(this.container, scrollY)
        if(browser.desktop && window.innerWidth > 768) scrollbar.listen(this.container, this.onScrollHome)
      }, 1)
    })
  },

  beforeDestroy () {
    if (browser.desktop && window.innerWidth > 768) scrollbar.unlisten(this.container, this.onScrollHome);
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
    setTheme() {
      document.body.dataset.background = 'white'
    },
    onScrollHome(status) {
      this.updateStatus.style.transform = `translate3d(0, ${status.offset.y}px, 0)`
      this.$refs.homeGallery.offsetY = status.offset.y
      if(status.offset.y > this.updateStatusOffset) this.updateStatus.classList.add('animate')
      else this.updateStatus.classList.remove('animate')
    },
    resize () {
      if(browser.desktop && window.innerWidth > 768) {
        scrollbar.listen(this.container, this.onScrollHome);
        this.calcOffset()
      }
    }
  },
}
</script>
