import Vuex from 'vuex'

const store = () => new Vuex.Store({
  state: {
    doc: []
  },
  getters: {
    currentDoc(state) {
      return state.doc
    },
  },
  mutations: {
    SET_DOC(state, doc) {
      state.doc = doc
    },
  },
  actions: {
    async nuxtServerInit({ commit }) {
      let document = await this.$prismic.api.getByUID("page", "home");
      if (document) {
        commit('SET_DOC', document)
      } else {
        error({ statusCode: 404, message: "Page not found" });
      }
    }
  }
})

export default store
