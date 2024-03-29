<template>
  <div class="loader-wrapper" :class="hideLoader ? 'hide' : ''">
    <div class="loader" ref="loader">
      <div class="content">
        <span class="percent" ref="percent">0</span>
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
    <div class="image-loader" ref="imageLoader">
      <img :src="imageLoader" data-load="preload" alt="image-loader" ref="mask">
    </div>
  </div>
</template>

<script>
import anime from 'animejs'
import TweenLite from 'gsap'

export default {
  data() {
    return {
      hideLoader: false,
      imageLoader: ''
    }
  },
  mounted() {
    let doc = this.$store.getters.currentDoc.data

    this.imageLoader = doc.loader_image.url
    this.loadingContainer = this.$el
    this.loaderContent = this.$refs.loader
    this.imageContainer = this.$refs.imageLoader
    this.mask = this.$refs.mask
    this.percent = this.$refs.percent

    this.$nextTick(() => {
      this.disableScroll()
      this.launchLoading()
    })
  },
  methods: {
    preventDefault(e) {
      const o = e || this.loadingContainer.event
      if (o.preventDefault) {
        o.preventDefault()
        o.returnValue = false
      }
    },
    disableScroll() {
      if (this.loadingContainer.addEventListener) {
        this.loadingContainer.addEventListener('touchmove', this.preventDefault, false)
        this.loadingContainer.addEventListener('scroll', this.preventDefault, false)
        this.loadingContainer.addEventListener('wheel', this.preventDefault, false)
        this.loadingContainer.addEventListener('mousewheel', this.preventDefault, false)
      }
    },
    enableScroll() {
      if (this.loadingContainer.removeEventListener) {
        this.loadingContainer.removeEventListener('touchmove', this.preventDefault, false)
        this.loadingContainer.removeEventListener('scroll', this.preventDefault, false)
        this.loadingContainer.removeEventListener('wheel', this.preventDefault, false)
        this.loadingContainer.removeEventListener('mousewheel', this.preventDefault, false)
      }
    },
    launchLoading() {
      const assets = this.$el.ownerDocument.querySelectorAll('[data-load="preload"]')
      let resolved = 0
      this.fadeInContent()
      for (let elm of assets) {
        let src = elm.src
        delete elm.dataset.load
        elm = document.createElement("img")
        elm.src = src
        this.loadAssets(elm).then(value => {
          resolved += 1
          this.updateLoadProgress(resolved, assets.length)
        })
      }
    },
    fadeInContent() {
      const els = this.$el.querySelectorAll('.percent, .title')
      els.forEach(el => {
        el.classList.add('fade-in')
      })
    },
    loadAssets(elm) {
      return new Promise(resolve => {
        elm.addEventListener("load", () => {
          resolve()
        })
      })
    },
    round5(x) {
      return (x % 5) >= 2.5 ? parseInt(x / 5) * 5 + 5 : parseInt(x / 5) * 5
    },
    updateLoadProgress(loaded, total) {
      return new Promise(resolve => {
        let progress = Math.round((95 / total) * loaded )

        this.percent.innerHTML = this.round5(progress)
        if (progress >= 95 && loaded === total) {
          resolve()
          setTimeout(() => {
            this.animate()
          }, 500)
        }
      })
    },
    animate() {
      let tl = anime.timeline({
        easing: 'easeInOutQuad',
        duration: 750
      })

      tl.add({
        targets: this.imageContainer,
        scale: [1.1, 1],
        top: 0,
        height: '100%',
        complete: () => {
          TweenLite.set(this.mask, {top: 0})
          TweenLite.to(this.mask, 0.5, {y: -200, force3D: true, ease: 'Quad.easeInOut'})

          this.$nextTick(() => this.$parent.domLoaded = true)
        }
      })
      .add({
        targets: this.loadingContainer,
        height: 0,
        complete: () => {
          this.hideLoader = true
          setTimeout(() => {
            this.enableScroll()
          }, 500);
        }
      })
    },
  },
}
</script>
