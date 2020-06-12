'use strict';

class SearchService {
  constructor(articles) {
    this.articles = articles;
  }

  findAll(query) {
    return this.articles.filter((article) => article.title.includes(query));
  }
}

module.exports = SearchService;
