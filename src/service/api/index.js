'use strict';

const {Router} = require(`express`);
const categoriesRoutes = require(`./categories`);
const searchRoutes = require(`./search`);
const articlesRoutes = require(`./articles`);

const getMockData = require(`../lib/get-mock-data`);

const {
  CategoryService,
  CommentService,
  SearchService,
  ArticleService,
} = require(`../data-service`);

const app = new Router();

(async () => {
  const mockData = await getMockData();

  categoriesRoutes(app, new CategoryService(mockData));
  searchRoutes(app, new SearchService(mockData));
  articlesRoutes(app, new ArticleService(mockData), new CommentService());
})();

module.exports = app;
