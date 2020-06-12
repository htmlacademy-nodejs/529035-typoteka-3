'use strict';

class CategoryService {

  constructor(articles) {
    this.articles = articles;
  }

  findAll() {

    let categories = new Set();
    this.articles.forEach((article) => {
      article.categories.forEach((category) => {
        categories.add(category);
      });
    });

    return [...categories];
  }

}

module.exports = CategoryService;
