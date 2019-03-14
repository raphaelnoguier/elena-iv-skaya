<template>
  <section class="page about">
    <div class="about-wrapper">
      <div class="about-image">
        <img :src="doc.main_image" />
        <div class="about-quote">
          <h3>{{doc.title}}</h3>
        </div>
      </div>
      <div class="about-content">
        <div class="about-right">
          <div class="social-links">
            <ul>
              <li v-for="(item, index) in doc.social_links" :key="index">
                <a :href="item.url">{{item.link_text}}</a>
              </li>
            </ul>
          </div>
          <div class="content-text">
            <div class="paragraph">
              <p>{{doc.first_paragraph}}</p>
            </div>
            <div class="two-col">
              <div class="text">
                <p>{{doc.column_1}}</p>
              </div>
              <div class="text">
                <p>{{doc.column_2}}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="about-footer">
        <div class="agency-representations">
          <span>Agency representations</span>
          <ul>
            <li v-for="(item, index) in doc.agency_representations" :key="index">
              {{item.region}} - <a :href="item.url">{{item.link_text}}</a>
            </li>
          </ul>
        </div>
        <div class="credits">
          <span>Website credits</span>
          <ul>
            <li v-for="(item, index) in doc.credits" :key="index">
              {{item.role}} - <a :href="item.url">{{item.link_text}}</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  mounted() {
  },
  computed: {
    doc() {
      let currentDoc = this.$store.getters.currentDoc.data;
      return {
        main_image: currentDoc.main_image.url,
        title: currentDoc.title[0].text,
        social_links: currentDoc.social_links,
        first_paragraph: currentDoc.first_paragraph[0].text,
        column_1: currentDoc.column_1[0].text,
        column_2: currentDoc.column_2[0].text,
        agency_representations: currentDoc.agency_representations,
        credits: currentDoc.credits
      };
    }
  }
};
</script>
