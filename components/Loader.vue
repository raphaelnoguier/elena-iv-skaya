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
      <img :src="imageLoader" data-load="preload">
    </div>
  </div>
</template>

<script>
import anime from 'animejs'
import browser from '~/utils/browser.js'

export default {
  layout: 'default',
  data() {
    return {
      hideLoader: false,
      imageLoader: '',
      loadingContainer: null,
      loaderContent: null,
      imageContainer: null,
      image: null
    }
  },
  beforeMount() {
    this.loadingContainer = this.$el
    this.loaderContent = this.loadingContainer.querySelector('.loader')
    this.imageContainer = this.loadingContainer.querySelector('.image-loader')
    this.image = this.loadingContainer.querySelector('.image-loader img')
  },
  mounted() {
    let doc = this.$store.getters.currentDoc.data

    this.imageLoader = browser.desktop && window.innerWidth > 768 ? doc.loader_image.url : doc.loader_image.touch_devices.url

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
        this.loadingContainer.addEventListener('DOMMouseScroll', this.preventDefault, false)
        this.loadingContainer.onwheel = this.preventDefault
        this.loadingContainer.onmousewheel = this.loadingContainer.onmousewheel = this.preventDefault
      }
    },
    enableScroll() {
      if (this.loadingContainer.removeEventListener) {
        this.loadingContainer.removeEventListener('DOMMouseScroll', this.preventDefault, false)
        this.loadingContainer.onmousewheel = this.loadingContainer.onmousewheel = null
        this.loadingContainer.onwheel = null
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
        const percent = this.loadingContainer.querySelector(".percent")

        percent.innerHTML = this.round5(progress)
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

      this.imageContainer.classList.add('animating')

      tl.add({
        targets: this.imageContainer,
        height: '100%',
        complete: () => {
          this.$parent.domLoaded = true
          this.loaderContent.classList.add('hide')
          this.image.style.transform = 'translate3d(0, -100px, 0)'
        }
      }).add({
        targets: this.loadingContainer,
        height: 0,
        complete: () => {
          this.hideLoader = true
          this.enableScroll()
        }
      })
    },
  },
}
</script>
