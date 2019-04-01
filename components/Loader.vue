<template>
  <div class="loader-wrapper" :class="hideLoader ? 'hide' : ''">
    <div class="loader">
      <div class="content">
        <span class="percent">0</span>
        <div class="title">
          <h1>
            elena iv-skaya
            <span>
            photographer
            </span>
          </h1>
        </div>
      </div>
    </div>
    <div class="image-loader">
      <img class="desktop" :src="imageLoader" data-load="preload">
    </div>
  </div>
</template>

<script>
import anime from 'animejs'
export default {
  layout: 'default',
  data() {
    return {
      hideLoader: false,
      imageLoader: ''
    };
  },
  mounted() {
    this.disableScroll();
    let doc = this.$store.getters.currentDoc.data;
    this.imageLoader = doc.loader_image.url

    this.$nextTick(() => {
      this.launchLoading();
    });
  },
  methods: {
    preventDefault(e) {
      const o = e || loadingContainer.event;
      if (o.preventDefault) {
        o.preventDefault();
        o.returnValue = false;
      }
    },
    disableScroll() {
      const loadingContainer = this.$el;
      if (loadingContainer.addEventListener) {
        loadingContainer.addEventListener('DOMMouseScroll', this.preventDefault, false);
        loadingContainer.onwheel = this.preventDefault;
        loadingContainer.onmousewheel = loadingContainer.onmousewheel = this.preventDefault;
        loadingContainer.ontouchmove = this.preventDefault;
      }
    },
    enableScroll() {
      const loadingContainer = this.$el;
      if (loadingContainer.removeEventListener) {
        loadingContainer.removeEventListener('DOMMouseScroll', this.preventDefault, false);
        loadingContainer.onmousewheel = loadingContainer.onmousewheel = null;
        loadingContainer.onwheel = null;
        loadingContainer.ontouchmove = null;
      }
    },
    launchLoading() {
      const assets = this.$el.ownerDocument.querySelectorAll('[data-load="preload"]');
      let resolved = 0;
      this.fadeInContent();
      for (let elm of assets) {
        let src = elm.src;
        elm.classList.remove('preload');
        elm = document.createElement("img");
        elm.src = src;
        this.loadAssets(elm, src).then(value => {
          resolved += 1;
          this.updateLoadProgress(resolved, assets.length);
        });
      }
    },
    fadeInContent() {
      const els = this.$el.querySelectorAll('.percent, .title');
      els.forEach(el => {
        el.classList.add('fade-in');
      });
    },
    loadAssets(elm, src) {
      return new Promise(resolve => {
        elm.addEventListener("load", () => {
          resolve();
        });
      });
    },
    round5(x) {
      return (x % 5) >= 2.5 ? parseInt(x / 5) * 5 + 5 : parseInt(x / 5) * 5;
    },
    updateLoadProgress(loaded, total) {
      return new Promise(resolve => {
        let progress = Math.round((95 / total) * loaded );
        const percent = this.$el.querySelector(".percent");

        percent.innerHTML = this.round5(progress);
        if (progress >= 95 && loaded === total) {
          resolve();
          setTimeout(() => {
            this.animate('grow');
          }, 500);
        }
      });
    },
    animate() {
      var tl = anime.timeline({
        easing: 'easeInOutQuad',
        duration: 700
      });

      let loader = this.$el.querySelector('.image-loader');
      let image = this.$el.querySelector('.image-loader img');

      loader.classList.add('animating');

      tl.add({
        targets: loader,
        height: [0, 100 + '%'],
        complete: () => {
          loader.style.top = 0;
          this.hideLoader = true;
          this.enableScroll();
          this.$parent.domLoaded = true;
        }
      })
    },
  },
  props : {domLoaded: Boolean}
};
</script>
