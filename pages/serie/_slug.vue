<template>
  <section class="container serie">
    <div class="serie-infos">
      <div class="featured-image">
        <img :src="doc.featuredImage.url">
      </div>
      <h1>{{doc.title}}</h1>
      <p>
        <span>Description :</span>
        {{doc.description}}
      </p>
      <p>
        <span>Date :</span>
        {{doc.date}}
      </p>
      <div>
        <ul>
          <p>
            <span>Models :</span>
          </p>
          <li v-for="(model, i) in doc.models" :key="i">{{model.model[0].text}}</li>
        </ul>
      </div>
      <div>
        <ul>
          <p>
            <span>Roles :</span>
          </p>
          <li v-for="(role, i) in doc.roles" :key="i">{{role.role[0].text}}</li>
        </ul>
      </div>
      <div>
        <ul>
          <p>
            <span>Make up :</span>
          </p>
          <li v-for="(makeup, i) in doc.makeups" :key="i">{{makeup.name[0].text}}</li>
        </ul>
      </div>
    </div>
    <div class="serie-gallery">
      <img v-for="(image, i) in doc.gallery" :key="i" :src="image.image.url">
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
        description: currentDoc.about_serie[0].text,
        date: currentDoc.date,
        models: currentDoc.models,
        roles: currentDoc.roles,
        makeups: currentDoc.make_up,
        featuredImage: currentDoc.featured_image,
        gallery: currentDoc.gallery
      };
    }
  }
};
</script>


