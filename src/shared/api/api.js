import APIClient from 'api-client';
import resources from './resources';

let apiURL;

switch (process.env.NODE_ENV) {
  case 'development':
    apiURL = process.env.REST_API_URL_DEV;
    break;
  case 'production':
    apiURL = process.env.REST_API_URL_PROD;
    break;
  default:
    apiURL = process.env.REST_API_URL_DEV;
}

const options = {
  resources,
  log: process.env.REST_API_URL_DEV === 'development',
};

const api = new APIClient(apiURL, options);

export default api;