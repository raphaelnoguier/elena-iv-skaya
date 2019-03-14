const prismicConfig = {
  apiEndpoint: 'https://elena-iv-skaya.cdn.prismic.io/api/v2',
  //accessToken: 'MC5XLVJXWEJJQUFCOEF0VW8z.77-977-9I--_vTc677-9Te-_vWYnDe-_vSrvv70EE--_ve-_vR5vHO-_vV7vv73vv70ydO-_vR9SKA',
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
