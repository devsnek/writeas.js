import Post from './Post';

export default class Collection {
  constructor(client, data) {
    this.client = client;
    this.alias = data.alias;
    this.title = data.title;
    this.description = data.description;
    this.styleSheet = data.style_sheet;
    this.email = data.email;
    this.totalPosts = data.totalPosts;
  }

  getPosts() {
    return this.client._req('get', `/collections/${this.alias}/posts`)
      .then((posts) => posts.map((p) => new Post(this.client, p)));
  }

  pinPost(post, position) {
    return this.client._req('post', `/collections/${this.alias}/pin`, {
      id: post.id || post,
      position,
    }).then(() => this);
  }

  unpinPost(post) {
    return this.client._req('post', `/collections/${this.alias}/unpin`, { id: post.id || post })
      .then(() => this);
  }

  movePosts(posts) {
    return this.client._req('post', `/collections/${this.alias}/collect`, posts)
      .then(() => this);
  }

  delete() {
    return this.client._req('delete', `/collections/${this.alias}`);
  }
}
