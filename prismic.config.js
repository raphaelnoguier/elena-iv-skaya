const prismicConfig = {
  apiEndpoint: 'https://elena-iv-skaya.cdn.prismic.io/api/v2',
  accessToken: 'MC5YS3o4Z2hRQUFHcTY0NUxE.RTfvv70a77-977-977-9fu-_ve-_vVIX77-977-977-9Oe-_ve-_vXp_77-9de-_ve-_vUVAFhtj77-977-977-9',
  linkResolver: function(doc) {
    if (doc.type === 'page' || doc.type === 'about') {
      switch(doc.uid) {
        case 'index':
          return '/';
        case 'about':
          return '/about';
        default:
          return '/';
      }
    }
    else if (doc.type === 'serie') {
      return '/serie/' + doc.uid;
    }
  }
}

module.exports = prismicConfig;
