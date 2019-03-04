<template>
  <section class="container about">
    <div>
      <h1>{{doc.title}}</h1>
      <p>{{doc.description}}</p>
    </div>
  </section>
</template>
<script>
export default {
  computed: {
    doc() {
      let currentDoc = this.$store.getters.currentDoc.data;
      return {
        title: currentDoc.title[0].text,
        description: currentDoc.description[0].text
      };
    }
  }
};
</script>
