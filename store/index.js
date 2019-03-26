// global store
export const strict = false
import Prismic from 'prismic-javascript'
import prismicConfig from '../prismic.config.js'

export const state = () => ({
  doc: {},
})

export const getters = {
  currentDoc(state) {
    return state.doc
  },
  allSeries(state) {
    return state.allSeries
  }
}

export const mutations = {
  SET_DOC(state, doc) {
    state.doc = doc
  },
  SET_ALL_SERIES(state, series) {
    state.allSeries = series
  },
}

export const actions = {
  async GET_DOC({ commit, error }, params) {
    let path = params.path
    let route = params.name
    let serieRoute = path.replace('/serie/', '');
    let document = null;

    let isSerie = path.includes('serie');
    let isHome = path === '/';
    let isAbout = route === 'About' || route === 'about';

    if(isSerie) {
      await Prismic.getApi(prismicConfig.apiEndpoint).then((api) => {
        return api.getByUID('serie', serieRoute);
      }).then((response) => {
        document = response
      });
    } else if(isHome){
      await Prismic.getApi(prismicConfig.apiEndpoint).then((api) => {
        return api.query(
          Prismic.Predicates.at('document.type', 'page'),
          { fetchLinks : ['serie.title', 'serie.category', 'serie.cover_ratio', 'serie.date', 'serie.cover_serie_image'] }
        ).then((response) => {
          document = response.results[0]
        });
      });
    } else if(isAbout){
      await Prismic.getApi(prismicConfig.apiEndpoint).then((api) => {
        return api.getByUID('about', 'about');
      }).then((response) => {
        document = response
      });
    }

    if (document) {
      commit('SET_DOC', document)
      return document;
    } else {
      error({ statusCode: 404, message: "Page not found" });
    }
  },
  async GET_ALL_SERIES({ commit, error }) {
    let series = null;
    await Prismic.getApi(prismicConfig.apiEndpoint).then((api) => {
      return api.query(
        Prismic.Predicates.at('document.type', 'page'),
        { fetch : 'page.series', fetchLinks: ['serie.cover_ratio', 'serie.cover_serie_image', 'serie.fallback_landscape_cover']}
      ).then((response) => {
        series = response.results[0].data.series
      });
    });

    if (series) {
      commit('SET_ALL_SERIES', series)
      return series;
    } else {
      error({ statusCode: 404, message: "Page not found" });
    }
  }
}

