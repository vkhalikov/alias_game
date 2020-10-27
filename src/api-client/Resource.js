import { isFunction } from 'lodash/lang';

class Resource {
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

  async get({ id, query }) {
    return this.api.get(this.getPathToResource(id), { query });
  }

  async getById(id) {
    return this.get({ id });
  }

  async getAll({ query, filter }) {
    return this.api.get(this.getPathToResource(), { query, filter });
  }

  async create({ body }) {
    return this.api.post(this.getPathToResource(), { body });
  }

  async update({ id, body }) {
    return this.api.patch(this.getPathToResource(id), { body });
  }

  async delete({ id, query, filter }) {
    return this.api.delete(this.getPathToResource(id));
  }

  getPathToResource(id) {
    let path = this.name;

    if (id) {
      return path + `/${id}`;
    }

    return path;
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
}

export default Resource;
