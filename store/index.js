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
  async nuxtServerInit({ commit }) {
    let document = await this.$prismic.api.getByUID("page", "home");
    if (document) {
      commit('SET_DOC', document)
    } else {
      error({ statusCode: 404, message: "Page not found" });
    }
  }
}

