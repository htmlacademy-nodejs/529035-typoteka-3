'use strict';

const {Router} = require(`express`);
const {api} = require(`../api`);

const mainRouter = new Router();

mainRouter.get(`/`, (req, res) => {
  api.get(`/api/articles`).then((articles) => res.render(`pages/main`, {articles: articles.data}));
});

module.exports = mainRouter;
