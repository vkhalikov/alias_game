import queryString from 'query-string';
import { isString, isObject } from 'lodash/lang'
import { ConnectionError, RequestError } from './error-types';


class Connector {
  constructor({ baseURL, onRequest }) {
    this.baseURL = baseURL;
    this.onRequest = onRequest;
  }

  async get(url, { query }) {
    return await this.makeRequest(url, { query });
  }

  async post(url, { body, mergeParams }) {
    const options = this.getRequestOptions({ method: 'POST', body, mergeParams });

    return await this.makeRequest(url, options);
  }

  async patch(url, { body, query, filter, mergeParams }) {
    const options = this.getRequestOptions({ method: 'PATCH', body, query, filter, mergeParams });

    return await this.makeRequest(url, options);
  }

  async delete(url, { body, query, filter, mergeParams }) {
    const options = this.getRequestOptions({ method: 'DELETE', body, query, filter, mergeParams });

    return await this.makeRequest(url, options);
  }

  async makeRequest(url, { query, ...options }) {
    const URL = this.getFullURL(url, query);

    if (this.onRequest) {
      this.onRequest(URL, options);
    }

    const res = await fetch(URL, options);

    if (!res.ok) {
      throw new ConnectionError(res.statusText, res.statusCode);
    }

    const body = await res.json();

    return { body, res };
  }



  getFullURL(path, query) {
    let URL = this.baseURL ? `${this.baseURL}/${path}` : path;

    if (query) {
      if (isString(query)) {
        URL += `?${query}`;
      } else if (isObject(query)) {
        URL += `?${queryString.stringify(query)}`;
      } else {
        throw new TypeError(`Query should be a String or an Object, got ${ typeof query } instead`)
      }
    }

    return URL;
  }

  getRequestOptions({ method, body, query, filter, mergeParams = {} } = {}) {
    return {
      method,
      query,
      body: JSON.stringify({ ...body, filter }),
      headers: {
        'Content-Type': 'application/json',
      },
      ...mergeParams,
    };
  }

  handleConnectionError(e) {
    console.error(e);
  }
}

export default Connector;
