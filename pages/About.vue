<template>
  <section class="container about">
    <div>
      <h1 class="title">{{document.title}}</h1>
      <h2 class="subtitle">{{document.title}}</h2>
    </div>
  </section>
</template>
<script>
function getPage(prismic) {
  return prismic.api.getByUID("page", "about");
}
export default {
  async asyncData({ app, error }) {
    let document = await getPage(app.$prismic);

    if (document) {
      return { document };
    } else {
      error({ statusCode: 404, message: "Page not found" });
    }
  },

  created() {
    getPage(this.$prismic).then(document => {
      this.document = document.data;
    });
  },

  head() {
    return {
      title: ""
    };
  },

  methods: {}
};
</script>
