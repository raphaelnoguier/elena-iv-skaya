import Prismic from 'prismic-javascript'
import prismicConfig from '../prismic.config.js'


const queryApi = async (query, opts) => new Promise((resolve, reject) => {
  Prismic.getApi(prismicConfig.apiEndpoint)
  .then((api) => api.query(query, opts))
  .then((res) => resolve(res), (err) => reject(err))
});

export {
  queryApi
}
