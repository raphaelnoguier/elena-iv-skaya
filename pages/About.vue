<template>
  <section class="page about">
    <div class="about-wrapper">
      <div class="about-image">
        <img :src="main_image" class="preload"/>
        <div class="about-quote">
          <h3>{{title}}</h3>
        </div>
      </div>
      <div class="about-content">
        <div class="about-issue">
          <div class="circle">
            <span v-for="(letter, i) in issue" :key="i">{{letter}}</span>
          </div>
        </div>
        <div class="about-right">
          <div class="social-links">
            <ul>
              <li v-for="(item, index) in social_links" :key="index">
                <a :href="item.url">{{item.link_text}}</a>
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
              {{item.region}} - <a :href="item.url">{{item.link_text}}</a>
            </li>
          </ul>
        </div>
        <div class="credits">
          <span>Website credits</span>
          <ul>
            <li v-for="(item, index) in credits" :key="index">
              {{item.role}} - <a :href="item.url">{{item.link_text}}</a>
            </li>
          </ul>
        </div>
      </div>
  </section>
</template>
<script>
import splittedText from "~/utils/splittedText.js"
import scrollbar from "~/utils/scrollbar.js"
import { nextTick } from 'q'
import browser from '~/utils/browser.js'

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
  data() {
    return {
      contentBloc: null,
      contentOffsetBottom: null,
      paragraphBloc: null,
      paragraphOffsetBottom: null
    }
  },
  mounted() {
    window.addEventListener('resize', this.resize)
    if(browser.desktop && window.innerWidth > 768) {
      this.$nextTick(() => {
        const container = this.$el.ownerDocument.getElementById('app')
        scrollbar.listen(container, this.onScrollAbout)
        scrollbar.resetPosition(container)
        this.calcOffset()
      })
    }
  },
  beforeDestroy() {
    if(browser.desktop && window.innerWidth > 768) {
      const container = this.$el.ownerDocument.getElementById('app')
      window.removeEventListener('resize', this.calcOffset)
      scrollbar.unlisten(container, this.onScrollAbout)
    }
  },
  methods: {
    resize() {
      if(browser.desktop && window.innerWidth > 768) {
        const container = this.$el.ownerDocument.getElementById('app')
        scrollbar.listen(container, this.onScrollAbout)
        this.calcOffset()
      }
    },
    calcOffset() {
      let content = this.$el.querySelector('.about-wrapper')
      let featuredImage = this.$el.querySelector('img').getBoundingClientRect()
      let paragraphBloc = this.$el.querySelector('.about-right .social-links')
      let circle = this.$el.querySelector('.circle')

      this.contentBloc = content.getBoundingClientRect()
      this.contentOffsetBottom = this.contentBloc.bottom - featuredImage.height - featuredImage.top

      this.paragraphBloc = paragraphBloc.getBoundingClientRect()
      this.paragraphOffsetBottom = this.paragraphBloc.bottom - circle.height - circle.top
    },
    onScrollAbout(status) {
      let circle = this.$el.querySelector('.circle')
      let featuredImage = this.$el.querySelector('img')
      let offset = status.offset

      if(this.contentOffsetBottom > offset.y) {
        featuredImage.style.top = offset.y + 'px'
      }

      console.log(this.contentOffsetBottom, offset.y)

      if(this.paragraphOffsetBottom > offset.y) {
        circle.classList.add('spinning')
        circle.style.top = offset.y + 'px'
      } else {
        circle.classList.remove('spinning')
      }
    }
  }
}
</script>
