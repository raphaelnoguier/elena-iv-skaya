<template>
  <section class="container home">
    <div class="content">
      <h1>{{doc.title}}</h1>
      <p>{{doc.description}}</p>
      <img v-for="(item, index) in doc.images" :src="item.images.url" :key="index">
    </div>
  </section>
</template>
<script>
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

  computed: {
    doc() {
      let currentDoc = this.$store.getters.currentDoc.data;
      return {
        title: currentDoc.title[0].text,
        description: currentDoc.description[0].text,
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
