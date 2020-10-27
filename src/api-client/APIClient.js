import Connector from './Connector';
import { isFunction, isString, isObject } from 'lodash/lang';
import queryString from 'query-string';

export class Resource {
  constructor(name, { methods }) {
    this.name = name;

    if (methods) {
      this.addCustomMethods(methods);
    }
  }

  REWRITABLE_METHODS = ['get', 'getAll', 'create', 'update', 'delete'];

  setAPIClient(client) {
    this.api = client;
  }

  addCustomMethods(methods) {
    Object.entries(methods).forEach(([name, fn]) => {
      if (!isFunction(fn)) {
        throw new TypeError(`Custom method should be a function, got ${ typeof fn } instead`);
      }

      if (this[name] && !this.REWRITABLE_METHODS.includes(name)) {
        throw new Error(`Method ${name} is not rewritable`);
      }

      this[name] = this.wrapCustomMethod(fn);
    });
  }

  wrapCustomMethod = (fn) => (...params) => {
    fn(this.api, ...params);
  };

  async get({ id, query }) {
    return this.api.get(this.getPathToResource({ id, query }));
  }

  async getById(id) {
    return this.get({ id });
  }

  async getAll({ query }) {
    return this.api.get(this.getPathToResource({ query }));
  }

  async create(body) {
    return this.api.post(this.getPathToResource(), { body });
  }

  async update({ id, query, body }) {
    return this.api.patch(this.getPathToResource({ id, query }), { body });
  }

  async delete({ id, query }) {
    return this.api.delete(this.getPathToResource({ id, query }));
  }

  getPathToResource({ id, query }) {
    let path = this.name;

    if (id) {
      return path + `/${id}`;
    }

    return path;
  }
}

class APIClient {
  constructor(baseURL, { resources }) {
    this.baseURL = baseURL;
    this.connector = new Connector();

    resources.forEach(this.injectResource);
  }

  async get(path) {
    return this.connector.get(this.getFullURL(path));
  }

  async post(path, options) {
    return this.connector.post(this.getFullURL(path), options);
  }

  async patch(path, options) {
    return this.connector.patch(this.getFullURL(path), options);
  }

  async delete(path, options) {
    return this.connector.delete(this.getFullURL(path), options);
  }

  getFullURL(path) {
    return this.baseURL + '/' + path;
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

export default APIClient;