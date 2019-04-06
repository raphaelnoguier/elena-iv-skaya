<template>
  <div class="serie-slider-wrapper">
    <div class="line"></div>
    <div class="serie-slider-title">
      <span>Gallery</span>
    </div>
    <div class="serie-slider">
      <div class="slider-item" v-for="(item, i) in nextSeries" :key="i">
        <nuxt-link :to="`/serie/${item.serie. uid}`">
          <img v-if="item.serie.data.cover_ratio.includes('Landscape')" :src="item.serie.data.fallback_landscape_cover.url">
          <img v-else data-load="preload" :src="item.serie.data.cover_serie_image.url">
        </nuxt-link>
      </div>
    </div>
    <div class="slider-controls">
      <div class="upper">
        <div class="play">
          <img data-load="preload" src="~/assets/img/ui/play.svg">
        </div>
        <div class="title">
          <span>A somewhat classic beauty</span>
        </div>
        <div class="index">
          <span class="current">1 /</span>
          <span class="total">41</span>
        </div>
      </div>
      <div class="bottom">
      </div>
    </div>
  </div>
</template>

<script>
import math from '~/utils/math.js'
import lerp from '~/utils/lerp.js'
import raf from '~/utils/raf.js'

export default {
  data() {
    return {
      isDrag: false,
      xPosition: 0,
      downPosition: 0,
      downX: 0,
      dragStep: 200,
      rightMargin: 1800,
      lerp: lerp(),
      sliderBounds: null,
      containerBounds: null,
      sliderContent: null
    }
  },
  mounted() {
    this.containerBounds = this.$el.getBoundingClientRect()
    this.sliderContent = this.$el.querySelector('.serie-slider')
    this.sliderContentBounds = this.sliderContent.getBoundingClientRect()

    setTimeout(() => {
      raf.add(this.tick)
    }, 500);

    this.$el.addEventListener('mouseup', this.up)
    this.$el.addEventListener('mousedown', this.down)
    this.$el.addEventListener('mousemove', this.move)
    this.$el.addEventListener('touchstart', this.up)
    this.$el.addEventListener('touchend', this.down)
    this.$el.addEventListener('touchmove', this.move)
  },
  beforeDestroy() {
    this.$el.removeEventListener('mouseup', this.up)
    this.$el.removeEventListener('mousedown', this.down)
    this.$el.removeEventListener('mousemove', this.move)
  },
  methods: {
    up() {
      this.isDrag = false;
    },
    down(cursor) {
      this.isDrag = true
      this.downX = cursor.x
      this.downPosition = this.xPosition
    },
    move(cursor) {
      if(!this.isDrag) return;
      this.moveX = cursor.x
      const translateX = this.moveX - this.downX
      const mappedX = translateX > 0 ? math.map(translateX, 0, this.dragStep, 0, 1) : math.map(translateX, 0, -this.dragStep, 0, -1)
      const pos = math.clamp(this.downPosition - mappedX, 0, this.nextSeries.length - 1)
      this.setPosition(pos)
    },
    setPosition (x) {
      this.xPosition = x
      this.lerp.set(x)
    },
    tick() {
      this.sliderContent.classList.toggle('drag', this.isDrag)
      this.lerp.update(0.15)
      const percentTranslate = math.map(this.lerp.get(), 0, this.nextSeries.length - 1, 0, 1 - (1 / this.nextSeries.length))
      const size = this.sliderContentBounds.width + this.rightMargin;
      const x = math.clamp(percentTranslate * size, 0, size - this.containerBounds.width)

      this.sliderContent.style.transform = `translate3d(-${x}px, 0, 0)`
    }
  },
  props: {nextSeries: Array}
}
</script>

<style>

</style>
