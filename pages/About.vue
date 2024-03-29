<template>
  <section class="page about">
    <div class="about-wrapper">
      <div class="about-image">
        <div class="image-mask" ref="aboutMask"></div>
        <img :src="main_image" data-load="preload" alt="elena portrait" ref="aboutImage"/>
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
                <a :href="item.url" target="_blank" rel="noopener">{{item.link_text}}</a>
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
          <div class="about-footer">
            <div class="agency-representations">
              <span>Agency representations</span>
              <ul>
                <li v-for="(item, index) in agency_representations" :key="index">
                  {{item.region}} - <a :href="item.url" target="_blank" rel="noopener">{{item.link_text}}</a>
                </li>
              </ul>
            </div>
            <div class="credits">
              <span>Website credits</span>
              <ul>
                <li v-for="(item, index) in credits" :key="index">
                  {{item.role}} - <a :href="item.url" target="_blank" rel="noopener">{{item.link_text}}</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
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
        },
        {
          hid: `og:title`,
          property: 'og:title',
          content: "About - Elena Iv-Skaya"
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
          content: this.first_paragraph
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
          content: "About - Elena Iv-Skaya"
        },
        {
          hid: `twitter:description`,
          property: `twitter:description`,
          content: this.first_paragraph
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
  mounted() {
    this.circle = this.$refs.circle
    this.mask = this.$refs.aboutMask

    this.setTheme()
    this.$parent.$parent.calcScroll()
    this.calcOffset()

    window.addEventListener('scroll', this.onScrollAbout, false)
    window.addEventListener('resize', this.resize)

  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.onScrollAbout)
    window.removeEventListener('resize', this.resize)
  },
  methods: {
    setTheme() {
      document.body.dataset.background = 'dark'
    },
    calcOffset() {
      this.aboutImageH = this.$refs.aboutImage.getBoundingClientRect().top
    },
    resize() {
      if(browser.desktop && window.innerWidth > 768) this.calcOffset()
    },
    onScrollAbout() {
      if(window.innerWidth < 768) return

      let rotateOffset = math.map(window.scrollY, 0, this.aboutImageH, 0, 180)
      this.circle.style.transform = `rotate(${rotateOffset}deg)`
    },
  }
}
</script>
