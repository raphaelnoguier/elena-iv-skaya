<template>
  <section class="home">
    <HomeSlider :series="doc.currentSeries" />
    <div class="page-content" :class="dragMode ? 'black' : ''">
      <div class="gallery">
        <div class="gallery-wrapper" :class="dragMode ? 'drag-mode' : ''">
          <div v-for="(serie, index) in doc.currentSeries" :key="index" class="gallery-item" :class="getClass(serie.cover_ratio)">
           <img :src="serie.cover_serie_image.url" />
            <div class="item-title">
              <h3>{{serie.title[0].text}}</h3>
              <span>{{serie.category}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import scrollbar from "~/utils/scrollbar.js";
import HomeSlider from "~/components/HomeSlider";
export default {
  components: {
    HomeSlider
  },
  head() {
    return {
      title: this.doc.seo.title,
      meta: [
        {
          hid: "description",
          name: "description",
          content: this.doc.seo.description
        }
      ]
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
    let gallery = document.querySelector(".gallery");
    if(!gallery) return;
    gallery.addEventListener("mousedown", this.down);
    gallery.addEventListener("mousemove", this.move);
    gallery.addEventListener("mouseleave", this.up);
    gallery.addEventListener("mouseup", this.up);
    gallery.addEventListener("touchstart", this.down);
    gallery.addEventListener("touchend", this.up);
  },

  beforeDestroy() {
    let gallery = document.querySelector(".gallery");
    if(!gallery) return;
    gallery.removeEventListener("mousedown", this.down);
    gallery.removeEventListener("mousemove", this.move);
    gallery.removeEventListener("mouseup", this.up);
    gallery.removeEventListener("mouseleave", this.up);
    gallery.removeEventListener("touchstart", this.down);
    gallery.removeEventListener("touchend", this.up);
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

  computed: {
    doc() {
      let currentDoc = [];
      let currentSeries = []

      this.$store.getters.currentDoc.results.forEach(result => {
        if(result.uid === 'index') {
          currentDoc.push(result.data)
        }
        if(result.type === 'serie') {
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
    }
  }
};
</script>
