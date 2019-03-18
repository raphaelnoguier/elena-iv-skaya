<template>
  <div>
    <section class="page home">
      <HomeHeader v-if="currentSeries" :series="currentSeries" />
      <div class="page-content" :class="dragMode ? 'black' : ''">
        <div class="gallery">
          <div class="gallery-wrapper" :class="dragMode ? 'drag-mode' : ''">
            <div v-for="(serie, index) in currentSeries" :key="index" class="gallery-item" :class="getClass(serie.cover_ratio)">
              <nuxt-link :to="`/serie/${serie.uid}`">
                <img :src="serie.cover_serie_image.url" class="preload" />
                <div class="item-title">
                  <h3>{{serie.title[0].text}}</h3>
                  <span>{{serie.category}}</span>
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
import scrollbar from "~/utils/scrollbar.js";
import HomeHeader from "~/components/HomeHeader";
import Footer from "~/components/Footer";

export default {
  async asyncData ({ app, params, error, store}) {
    try {
      let entry = await store.dispatch('GET_DOC', app.context.route);

      let currentDoc = [];
      let currentSeries = []

      entry.results.forEach(result => {
        if(result.uid === 'index') {
          currentDoc.push(result.data)
        }
        if(result.type === 'serie') {
          result.data.uid = result.uid
          currentSeries.push(result.data)
        }
      });

      return {
        title: currentDoc[0].title[0].text,
        description: currentDoc[0].description[0].text,
        slider: currentDoc[0].slider,
        seo: {
          title: currentDoc[0].seo_title,
          description: currentDoc[0].seo_description
        },
        currentSeries
      };
    } catch (err) {
      error({statusCode: 404, message: `The page you are looking for does not exist. `, err: err})
    }
  },
  components: {
    HomeHeader,
    Footer
  },
  head() {
    return {
      // title: this.doc.seo.title,
      // meta: [
      //   {
      //     hid: "description",
      //     name: "description",
      //     content: this.doc.seo.description
      //   }
      // ]
    };
  },

  data () {
    return {
      timerID: '',
      counter: 0,
      dragMode: false
    }
  },

  mounted () {
    // let gallery = document.querySelector(".gallery");
    // if(!gallery) return;
    // gallery.addEventListener("mousedown", this.down);
    // gallery.addEventListener("mousemove", this.move);
    // gallery.addEventListener("mouseleave", this.up);
    // gallery.addEventListener("mouseup", this.up);
    // gallery.addEventListener("touchstart", this.down);
    // gallery.addEventListener("touchend", this.up);
  },

  beforeDestroy() {
    // let gallery = document.querySelector(".gallery");
    // if(!gallery) return;
    // gallery.removeEventListener("mousedown", this.down);
    // gallery.removeEventListener("mousemove", this.move);
    // gallery.removeEventListener("mouseup", this.up);
    // gallery.removeEventListener("mouseleave", this.up);
    // gallery.removeEventListener("touchstart", this.down);
    // gallery.removeEventListener("touchend", this.up);
  },

  methods: {
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
    down(e) {
      requestAnimationFrame(this.timer);
      e.preventDefault();
    },

    up(e) {
      cancelAnimationFrame(this.timerID);
      this.counter = 0;
      this.dragMode = false;
    },
    timer() {
      let gallery = document.querySelector(".gallery");
      if (this.counter < 0) {
        this.timerID = requestAnimationFrame(this.timer);
        this.counter++;
      } else {
        this.dragMode = true;
      }
    },
    move(e) {
      if(!this.dragMode) return;

      console.log(e.pageY)
    }
  },
};
</script>
