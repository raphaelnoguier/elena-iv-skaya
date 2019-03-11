<template>
  <section class="home">
    <div class="page-introduction">
      <div :style="`background-image: url(${doc.images[0].images.url})`" class="featured-image"></div>
      <div class="right-col">
        <div class="slider">
          <div class="slide" v-for="(item, index) in doc.images.slice(0,1)" :key="index" :style="`background-image: url('${item.images.url}')`"></div>
          <div class="controls">
            <div class="left"><img src="~assets/img/ui/arrow.svg"><span>previous</span></div>
            <div class="dots"></div>
            <div class="right"><span>next</span><img src="~assets/img/ui/arrow.svg"></div>
          </div>
        </div>
        <div class="serie-infos">
          <div class="title">
            <h3>{{doc.title}}</h3>
          </div>
          <div class="date">
            <span>© 2019</span>
          </div>
        </div>
        <div class="chevron">
          <img src="~assets/img/ui/chevron.svg">
        </div>
        <div class="update-status">
          <div class="line" />
          <span>LAST UPDATED - FEB 2019</span>
        </div>
      </div>
    </div>
    <div class="page-content" :class="dragMode ? 'black' : ''">
      <div class="gallery">
        <div class="gallery-wrapper" :class="dragMode ? 'drag-mode' : ''">
          <div class="gallery-item" v-for="(item, index) in doc.images" :key="index">
            <img :src="item.images.url" >
            <div class="item-title">
              <h3>The spirit of carmen</h3>
              <span>commercial</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import scrollbar from "~/utils/scrollbar.js";
export default {
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
      pressHoldDuration: 10,
      dragMode: false
    }
  },

  mounted () {
    let gallery = document.querySelector(".gallery");
    gallery.addEventListener("mousedown", this.down);
    gallery.addEventListener("mousemove", this.move);
    gallery.addEventListener("mouseleave", this.up);
    gallery.addEventListener("mouseup", this.up);
    gallery.addEventListener("touchstart", this.down);
    gallery.addEventListener("touchend", this.up);
  },

  beforeDestroy() {
    let gallery = document.querySelector(".gallery");
    gallery.removeEventListener("mousedown", this.down);
    gallery.removeEventListener("mousemove", this.move);
    gallery.removeEventListener("mouseup", this.up);
    gallery.removeEventListener("mouseleave", this.up);
    gallery.removeEventListener("touchstart", this.down);
    gallery.removeEventListener("touchend", this.up);
  },

  methods: {
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
      if (this.counter < this.pressHoldDuration) {
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
      let currentDoc = this.$store.getters.currentDoc.data;
      return {
        title: currentDoc.title[0].text,
        description: currentDoc.description[0].text,
        slider: currentDoc.slider,
        images: currentDoc.gallery,
        seo: {
          title: currentDoc.seo_title,
          description: currentDoc.seo_description
        }
      };
    }
  }
};
</script>
