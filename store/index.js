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
    let isAbout = route === 'About';

    console.log('route: ', route);


    if(isSerie) {
      console.log('isSerie', isSerie);
      document = await this.$prismic.api.getByUID('serie', serieRoute);
    } else if(isHome){
      console.log('isHome', isHome);
      document = await this.$prismic.api.query();
    } else if(isAbout){
      console.log('isAbout', isAbout);
      document = await this.$prismic.api.getByUID('about', route);
    }


    if (document) {
      commit('SET_DOC', document)
      console.log('i get the document in store: ', document);
      return document;
    } else {
      error({ statusCode: 404, message: "Page not found" });
    }
  }
}

