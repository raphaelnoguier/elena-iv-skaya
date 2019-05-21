<template>
  <section class="page about">
    <div class="about-wrapper">
      <div class="about-image">
        <div class="image-mask"></div>
        <img :src="main_image" data-load="preload" alt="elena portrait" />
        <div class="about-quote">
          <h3>{{title}}</h3>
        </div>
      </div>
      <div class="about-content">
        <div class="about-issue" ref="circle">
          <div class="circle">
            <span v-for="(letter, i) in issue" :key="i">{{letter}}</span>
          </div>
        </div>
        <div class="about-right">
          <div class="social-links">
            <ul>
              <li v-for="(item, index) in social_links" :key="index">
                <a :href="item.url" target="_blank">{{item.link_text}}</a>
              </li>
            </ul>
          </div>
          <div class="content-text">
            <div class="paragraph">
              <p>{{first_paragraph}}</p>
            </div>
            <div class="two-col">
              <div class="text">
                <p>{{column_1}}</p>
              </div>
              <div class="text">
                <p>{{column_2}}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="about-footer">
      <div class="agency-representations">
        <span>Agency representations</span>
        <ul>
          <li v-for="(item, index) in agency_representations" :key="index">
            {{item.region}} - <a :href="item.url" target="_blank">{{item.link_text}}</a>
          </li>
        </ul>
      </div>
      <div class="credits">
        <span>Website credits</span>
        <ul>
          <li v-for="(item, index) in credits" :key="index">
            {{item.role}} - <a :href="item.url" target="_blank">{{item.link_text}}</a>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>
<script>
import splittedText from "~/utils/splittedText.js"
import { nextTick } from 'q'
import browser from '~/utils/browser.js'
import math from '~/utils/math.js'
import { pageTransition } from '~/mixins/pageTransition.js'

export default {
  async asyncData ({ app, params, error, store}) {
    try {
      let entry = await store.dispatch('GET_DOC', app.context.route)
      let data = entry.data
      return {
        main_image: data.main_image.url,
        title: data.title[0].text,
        issue: splittedText.make(data.issue[0].text),
        social_links: data.social_links,
        first_paragraph: data.first_paragraph[0].text,
        column_1: data.column_1[0].text,
        column_2: data.column_2[0].text,
        agency_representations: data.agency_representations,
        credits: data.credits
      }
    } catch (err) {
      error({statusCode: 404, message: `The page you are looking for does not exist. `, err: err})
    }
  },
  mixins: [ pageTransition ],
  head() {
    return {
      title: "About - Elena Iv-Skaya",
      meta: [
        {
          hid: "description",
          name: "description",
          content: this.first_paragraph
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
  mounted() {
    this.circle = this.$refs.circle
    this.featuredImage = this.$el.querySelector('img')

    this.setTheme()

    window.addEventListener('scroll', this.onScrollAbout)
    window.addEventListener('resize', this.resize)

    setTimeout(() =>  {
      if(browser.desktop && window.innerWidth > 768) this.calcOffset()
      this.$parent.$parent.calcScroll()
    }, 50)
  },
  beforeDestroy() {
    window.removeEventListener('wheel', this.onScrollAbout)
    window.removeEventListener('resize', this.resize)
  },
  methods: {
    setTheme() {
      document.body.dataset.background = 'dark'
      document.body.style.overflow = 'auto'
    },
    resize() {
      if(browser.desktop && window.innerWidth > 768) this.calcOffset()
      this.resetLayout()
    },
    calcOffset() {
      let wrapper = this.$el.querySelector('.about-wrapper').getBoundingClientRect()
      let featuredImage = this.$el.querySelector('img').getBoundingClientRect()

      let socialLinks = this.$el.querySelector('.about-right .social-links').getBoundingClientRect()
      let circle = this.circle.getBoundingClientRect()

      this.contentOffsetBottom = wrapper.bottom - (featuredImage.height + featuredImage.top)
      this.socialLinksOffset = (socialLinks.top + socialLinks.height) - (circle.height + wrapper.top)

    },
    onScrollAbout() {
      if(window.innerWidth < 768) return

      let rotateOffset = math.map(window.scrollY, 0, this.socialLinksOffset, 0, 180)

      // if(this.contentOffsetBottom > window.scrollY) {
      //   this.featuredImage.style.transform = `translate3d(0,${window.scrollY}px, 0)`
      // }

      // if(this.socialLinksOffset > window.scrollY) {
      //   this.circle.style.transform = `rotate(${rotateOffset}deg)`
      // }
    },
    resetLayout() {
      this.circle.style.transform = 'translate3d(0,0,0)'
      this.featuredImage.style.transform = 'translate3d(0,0,0)'
    },
  }
}
</script>
