// global store

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
    let isAbout = route === 'about';

    console.log('route: ', route);


    if(isSerie) {
      document = await this.$prismic.api.getByUID('serie', serieRoute);
    } else if(isHome){
      document = await this.$prismic.api.query();
    } else if(isAbout){
      console.log('isAbout', isAbout);
      document = await this.$prismic.api.getByUID('about', route);
    }


    if (document) {
      commit('SET_DOC', document)
      return document;
    } else {
      error({ statusCode: 404, message: "Page not found" });
    }
  }
}

