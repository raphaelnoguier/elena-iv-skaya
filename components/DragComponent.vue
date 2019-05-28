<template>
  <div class="drag-component">
    <div class="drag-line"></div>
    <div class="drag-component-wrapper">
      <div class="row">
        <div class="index-wrapper">
          <div class="blur"></div>
          <div class="index-mask" ref="currentIndexDrag">
            <div class="index" v-for="(serie, i) in series" :key="i">
              <span>{{i + 1}}</span>
            </div>
          </div>
        </div>
        <div class="zoom right">
          <div class="cover">
            <div class="cover-wrapper" ref="coverWrapperRight">
              <img v-for="(serie, i) in series" :key="i" :src="serie.serie.data.cover_serie_image.url" :alt="`drag-component-cover${i}`" />
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="index">{{this.series.length}}</div>
        <div class="zoom left">
          <div class="cover">
            <div class="cover-wrapper" ref="coverWrapperLeft">
              <img v-for="(serie, i) in series" :key="i" :src="serie.serie.data.cover_serie_image.url" :alt="`drag-component-cover${i}`"/>
            </div>
          </div>
        </div>
        <div class="titles-wrapper">
          <div class="blur"></div>
          <div class="title-mask" ref="titleMask">
            <div class="title" v-for="(serie, i) in series" :key="i">
              <span>{{serie.serie.data.title[0].text}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {series: Array}
}
</script>
