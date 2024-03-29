// global store
export const strict = false
import Prismic from 'prismic-javascript'
import prismicConfig from '../prismic.config.js'

export const state = () => ({
  doc: {},
  allSeries: {},
  homeSeries: {},
  position: {x : 0, y : 0},
  serieLoaderImg: {},
  commons: {}
})

export const getters = {
  currentDoc(state) {
    return state.doc
  },
  homeSeries(state) {
    return state.homeSeries
  },
  allSeries(state) {
    return state.allSeries
  },
  position(state) {
    return state.position
  },
  serieLoaderImg(state) {
    return state.serieLoaderImg
  },
  commons(state) {
    return state.commons
  }
}

export const mutations = {
  SET_DOC(state, doc) {
    state.doc = doc
  },
  SET_HOME_SERIES(state, series) {
    state.homeSeries = series
  },
  SET_ALL_SERIES(state, series) {
    state.allSeries = series
  },
  SET_SCROLL_POSITION(state, position) {
    state.position = position
  },
  SET_SERIE_LOADER_IMG(state, img) {
    state.serieLoaderImg = img
  },
  SET_COMMONS(state, commons) {
    state.commons = commons
  },
}

export const actions = {
  async nuxtServerInit ({ commit }, { req }) {
    let series = null;
    let commons = null;

    await Prismic.getApi(prismicConfig.apiEndpoint, { accessToken: prismicConfig.accessToken }).then((api) => {
      return api.query(
        Prismic.Predicates.at('document.type', 'page'),
        { fetchLinks : ['serie.title', 'serie.category', 'serie.cover_ratio', 'serie.date', 'serie.cover_serie_image'] }
      ).then((response) => {
        series = response.results[0].data.series
      });
    });

    await Prismic.getApi(prismicConfig.apiEndpoint, { accessToken: prismicConfig.accessToken }).then((api) => {
      return api.query(
        Prismic.Predicates.at('document.type', 'commons'),
        { fetchLinks : ['about.loader_image'] }
      ).then((response) => {
        commons = response.results[0]
      });
    });

    if (series && commons ) {
      commit('SET_HOME_SERIES', series)
      commit('SET_COMMONS', commons)
      return { series, commons };
    }
  },
  async GET_DOC({ commit, error }, params) {
    let path = params.path
    let route = params.name
    let serieRoute = path.replace('/serie/', '');
    let document = null;

    let isSerie = path.includes('serie');
    let isHome = path === '/';
    let isAbout = route === 'About' || route === 'about';

    if(isSerie) {
      await Prismic.getApi(prismicConfig.apiEndpoint, { accessToken: prismicConfig.accessToken }).then((api) => {
        return api.getByUID('serie', serieRoute);
      }).then((response) => {
        document = response
      });
    } else if(isHome){
      await Prismic.getApi(prismicConfig.apiEndpoint, { accessToken: prismicConfig.accessToken }).then((api) => {
        return api.query(
          Prismic.Predicates.at('document.type', 'page'),
          { fetchLinks : ['serie.title', 'serie.category', 'serie.cover_ratio', 'serie.date', 'serie.cover_serie_image'] }
        ).then((response) => {
          document = response.results[0]
        });
      });
    } else if(isAbout){
      await Prismic.getApi(prismicConfig.apiEndpoint, { accessToken: prismicConfig.accessToken }).then((api) => {
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
    await Prismic.getApi(prismicConfig.apiEndpoint, { accessToken: prismicConfig.accessToken }).then((api) => {
      return api.query(
        Prismic.Predicates.at('document.type', 'page'),
        { fetch : 'page.series', fetchLinks: ['serie.title', 'serie.cover_ratio', 'serie.cover_serie_image', 'serie.fallback_landscape_cover']},
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

