<template>
  <section class="page about">
    <div class="about-wrapper">
      <div class="about-image">
        <img :src="main_image" />
        <div class="about-quote">
          <h3>{{title}}</h3>
        </div>
      </div>
      <div class="about-content">
        <div class="about-right">
          <div class="social-links">
            <ul>
              <li v-for="(item, index) in social_links" :key="index">
                <a :href="item.url">{{item.link_text}}</a>
              </li>
            </ul>
          </div>
          <div class="content-text">
            <div class="paragraph">
              <p>{{first_paragraph}}</p>
            </div>
            <div class="two-col">
              <div class="text">
                <p>{{column_1}}</p>
              </div>
              <div class="text">
                <p>{{column_2}}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="about-footer">
        <div class="agency-representations">
          <span>Agency representations</span>
          <ul>
            <li v-for="(item, index) in agency_representations" :key="index">
              {{item.region}} - <a :href="item.url">{{item.link_text}}</a>
            </li>
          </ul>
        </div>
        <div class="credits">
          <span>Website credits</span>
          <ul>
            <li v-for="(item, index) in credits" :key="index">
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
  async asyncData ({ app, params, error, store}) {
    try {
      let entry = await store.dispatch('GET_DOC', app.context.route);
      let data = entry.data;
      return {
        main_image: data.main_image.url,
        title: data.title[0].text,
        social_links: data.social_links,
        first_paragraph: data.first_paragraph[0].text,
        column_1: data.column_1[0].text,
        column_2: data.column_2[0].text,
        agency_representations: data.agency_representations,
        credits: data.credits
      }
      console.log('url', data.main_image.url);
    } catch (err) {
      error({statusCode: 404, message: `The page you are looking for does not exist. `, err: err})
    }
  },
  computed: {
  }
};
</script>
