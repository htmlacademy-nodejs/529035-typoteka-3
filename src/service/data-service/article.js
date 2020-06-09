'use strict';

const {nanoid} = require(`nanoid`);
const {MAX_ID_LENGTH} = require(`../../constants`);
const {getFormatDate} = require(`../../utils`);

class ArticleService {
  constructor(articles) {
    this.articles = articles;
  }

  findOne(articleId) {
    return this.articles.find((article) => article.id === articleId);
  }

  findAll() {
    return this.articles;

  }

  create(articleData) {
    const newArticle = Object.assign({id: nanoid(MAX_ID_LENGTH), createdDate: getFormatDate(new Date()), comments: []}, articleData);

    this.articles.push(newArticle);
    return newArticle;

  }

  update(articleId, newArticleData) {
    const oldArticle = this.articles.find((article) => article.id === articleId);
    return Object.assign(oldArticle, newArticleData);
  }

  drop(articleId) {
    const deletedArticle = this.articles.find((article) => article.id === articleId);

    if (!deletedArticle) {
      return null;
    }

    this.articles = this.articles.filter((article) => article.id !== articleId);
    return deletedArticle;
  }

}

module.exports = ArticleService;
