// global store

export const state = () => ({
  doc: [],
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
  async nuxtServerInit({ commit, error }) {
    let path = this.$router.currentRoute.path
    let route = this.$router.currentRoute.name
    let isSerie = path.includes('serie');
    let serieRoute = path.replace('/serie/', '');
    let document = null;
    let isHome = route === 'index';

    if(isSerie) {
      document = await this.$prismic.api.getByUID('serie', serieRoute);
    } else if(isHome){
      document = await this.$prismic.api.query();
    } else {
      document = await this.$prismic.api.getByUID('about', route);
    }

    if (document) {
      commit('SET_DOC', document)
    } else {
      error({ statusCode: 404, message: "Page not found" });
    }
  }
}

