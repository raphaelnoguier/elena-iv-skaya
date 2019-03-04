<template>
  <section class="container home">
    <div>
      <h1>{{doc.title}}</h1>
      <p>{{doc.description}}</p>
      <img v-for="(img, index) in doc.images" :src="img.img.url" :key="index">
    </div>
  </section>
</template>
<script>
export default {
  head() {
    return {
      title: ""
    };
  },

  computed: {
    doc() {
      let currentDoc = this.$store.getters.currentDoc.data;
      return {
        title: currentDoc.title[0].text,
        description: currentDoc.description[0].text,
        images: currentDoc.body[0].items
      };
    }
  }
};
</script>
