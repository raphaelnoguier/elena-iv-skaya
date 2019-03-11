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
    if(isSerie) {
      document = await this.$prismic.api.getByUID('serie', serieRoute);
    } else {
      document = await this.$prismic.api.getByUID('page', route);
      //document = await this.$prismic.predicates.any('document.type', ['page', 'serie']);
    }

    if (document) {
      commit('SET_DOC', document)
    } else {
      error({ statusCode: 404, message: "Page not found" });
    }
  }
}

