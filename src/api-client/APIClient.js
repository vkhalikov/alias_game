import Connector from './Connector';
import Resource from './Resource';

class APIClient {
  constructor(baseURL, { resources, log }) {
    const connectorOptions = { baseURL };

    if (log) {
      connectorOptions.onRequest = logRequest;
    }

    this.connector = new Connector(connectorOptions);

    resources.forEach(this.injectResource);
  }

  async get(path, { query }) {
    return this.connector.get(path, { query });
  }

  async post(path, options) {
    return this.connector.post(path, options);
  }

  async patch(path, options) {
    return this.connector.patch(path, options);
  }

  async delete(path, options) {
    return this.connector.delete(path, options);
  }

  injectResource = (res) => {
    if (res instanceof Resource) {
      res.setAPIClient(this);
      this[res.name.toLowerCase()] = res;
    } else {
      throw new Error('Injection failed. Resource should be an instance of Resource class');
    }
  }
}

function logRequest(url, options) {
  console.log(`URL: ${url}`);
  console.log(`Options: ${options}`);
}

export default APIClient;