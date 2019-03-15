import axios from 'axios';

axios.interceptors.response.use(response => {
  if( typeof response.data === 'object' && response.data.constructor !== Array ) {
    response.data = Object.assign({}, response.data);
  }
  return response;
});
