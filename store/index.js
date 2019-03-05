// global store

export const state = () => ({
  doc: []
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
    if (process.server) {
      let path = this.$router.currentRoute.path
      let route = this.$router.currentRoute.name
      let isSerie = path.includes('serie');
      let serieRoute = this.$router.currentRoute.path.replace('/serie/', '');
      let document = await this.$prismic.api.getByUID(isSerie ? 'serie' : 'page', isSerie ? serieRoute : route);
      if (document) {
        commit('SET_DOC', document)
      } else {
        error({ statusCode: 404, message: "Page not found" });
      }
    }
  }
}

