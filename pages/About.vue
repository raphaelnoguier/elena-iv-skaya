<template>
  <section class="page about">
    <div class="about-wrapper">
      <div class="about-image">
        <img :src="doc.main_image.url" />
        <div class="about-quote">
          <h3>{{doc.title[0].text}}</h3>
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
  data(){
    return {
      doc: []
    }
  },
  async fetch ({ app, params, error, store}) {
    try {
      let entry = await store.dispatch('GET_DOC', app.context.route);
    } catch (err) {
      error({statusCode: 404, message: `The page you are looking for does not exist. `, err: err})
    }
  },
  created() {
    this.doc = this.$store.getters.currentDoc.data;
  }
};
</script>
