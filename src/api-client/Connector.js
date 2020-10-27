import { ConnectionError, RequestError } from './error-types';

class Connector {
  constructor({ onRequest }) {
    this.onRequest = onRequest;
  }

  async makeRequest(url, options) {
    let json;

    if (this.onRequest) {
      this.onRequest(url, options);
    }

    try {
      const resp = await fetch(url, options);

      if (!resp.ok) {
        throw new ConnectionError(resp.error);
      }

      json = await resp.json();
    } catch (e) {
      this.handleConnectionError(e);
    }

    return json;
  }

  async get(url) {
    return await this.makeRequest(url);
  }

  async post(url, body, mergeParams) {
    const options = this.getFetchOptions({ method: 'POST', body, mergeParams });

    return await this.makeRequest(url, options);
  }

  async patch(url, body, mergeParams) {
    const options = this.getFetchOptions({ method: 'PATCH', body, mergeParams });

    return await this.makeRequest(url, options);
  }

  async delete(url, body, mergeParams) {
    const options = this.getFetchOptions({ method: 'DELETE', body, mergeParams });

    return await this.makeRequest(url, options);
  }

  getFetchOptions({ method, body, mergeParams = {} } = {}) {
    let json;

    try {
      json = JSON.stringify(body);
    } catch (e) {
      throw new RequestError()
    }

    return {
      method,
      body: json,
      headers: {
        'Content-Type': 'application/json',
      },
      ...mergeParams,
    };
  }

  handleConnectionError(e) {

  }
}

export default Connector;
