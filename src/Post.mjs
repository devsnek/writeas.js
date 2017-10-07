export default class Post {
  constructor(client, data) {
    this.client = client;
    this.id = data.id;
    this.slug = data.slug;
    this.appearance = data.appearance;
    this.language = data.language;
    this.rtl = data.rtl;
    this.createdAt = new Date(data.created);
    this.title = data.title;
    this.body = data.body;
    this.tags = data.tags;
    this.views = data.views;
  }

  claim(token) {
    return this.client._req('post', '/posts/claim', { id: this.id, token });
  }

  update(body, { title, font, lang, rtl }) {
    return this.client._req('post', `/posts/${this.id}`, { body, title, font, lang, rtl })
      .then((data) => new Post(this.client, data));
  }

  unpublish() {
    return this.client._req('post', `/posts/${this.id}`, { body: '' });
  }
}
