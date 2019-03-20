// global store
import queryApi from '../utils/queryApi.js'
import Prismic from 'prismic-javascript'
import prismicConfig from '../prismic.config.js'

export const state = () => ({
  doc: {},
})

export const getters = {
  currentDoc(state) {
    return state.doc
  },
}

export const mutations = {
  SET_DOC(state, doc) {
    state.doc = doc
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
          Prismic.Predicates.any('document.type', ['page', 'serie'])
        ).then((response) => {
          document = response.results
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
}

