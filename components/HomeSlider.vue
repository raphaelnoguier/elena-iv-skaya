<template>
  <div class="page-introduction">
    <canvas id="home-slider"></canvas>
    <div class="right-col">
      <div class="home-slider">
        <div class="slide" v-for="(serie, index) in series.slice(0,1)" :key="index" :style="`background-image: url('${serie.cover_serie_image.url}')`"></div>
        <div class="controls">
          <div v-on:click="slide" class="left"><img src="~assets/img/ui/arrow.svg"><span>previous</span></div>
          <div class="dots"></div>
          <div class="right"><span>next</span><img src="~assets/img/ui/arrow.svg"></div>
        </div>
      </div>
      <div v-for="(serie, index) in series.slice(0,1)"  :key="index" class="serie-infos">
        <div class="title">
          <h3>{{serie.title[0].text}}</h3>
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
</template>


<script>
import anime from 'animejs'

export default {
  data() {
    return {
      lineTo: 0
    }
  },
  mounted() {
    this.draw();
  },
  methods: {
    draw() {
      let canvas = document.getElementById('home-slider');
      let ctx = canvas.getContext('2d');

      let bounds = canvas.getBoundingClientRect();

      let currentImg = document.createElement('IMG');
      currentImg.src = this.series[0].cover_serie_image.url

      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(0, bounds.height);
      ctx.lineTo(100, 0);
      ctx.closePath();
      // Clip to the current path
      ctx.drawImage(currentImg, 0, 0, 300, bounds.height);
      ctx.clip();
      ctx.restore();
    },
    next() {
      let canvas = document.getElementById('home-slider');
      let ctx = canvas.getContext('2d');

      let bounds = canvas.getBoundingClientRect()

      let nextImage = document.createElement('IMG');
      nextImage.src = this.series[1].cover_serie_image.url

      // Clip to the current path
      ctx.drawImage(nextImage, 0, 0, bounds.width, bounds.height);
      ctx.clip();
      ctx.restore();
    },
    slide(){
      let _this = this
      setInterval((i) => {
        _this.lineTo = _this.lineTo + 50;
        this.next();
      }, 1);
    }
  },
  props: { series: Array }
}
</script>

