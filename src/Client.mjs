import request from 'snekfetch';
import { Endpoints } from './Constants';

import Post from './Post';
import Collection from './Collection';

export default class Client {
  static authenticate(username, password, type) {
    const client = new Client(null, type);
    return client._req('post', '/auth/login', { alias: username, pass: password })
      .then(({ access_token }) => {
        client.accessToken = access_token;
        return client;
      });
  }

  constructor(accessToken, type = 'https') {
    if (!Endpoints[type]) throw new Error('Invalid WriteAs endpoint type');
    this.endpoint = Endpoints[type];
    this.accessToken = accessToken;
  }

  createPost(body, { title, font, lang, rtl, crosspost } = {}) {
    return this._req('post', '/posts', { body, title, font, lang, rtl, crosspost })
      .then((p) => new Post(this, p));
  }

  getPost(id) {
    return this._req('get', `/posts/${id}`).then((p) => new Post(this, p));
  }

  createCollection(name, alias) {
    return this._req('post', '/collections', { name, alias })
      .then((c) => new Collection(this, c));
  }

  getCollection(alias) {
    return this._req('get', `/collections/${alias}`)
      .then((c) => new Collection(this, c));
  }

  _req(method, path, data) {
    const req = request[method](`${this.endpoint}${path}`);
    if (data) req.send(data);
    return req.then((r) => r.body.data);
  }
}
