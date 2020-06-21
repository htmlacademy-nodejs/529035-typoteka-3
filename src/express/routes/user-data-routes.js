'use strict';

const {Router} = require(`express`);
const {api} = require(`../api`);

const userDataRouter = new Router();


userDataRouter.get(`/`, (req, res) =>
  api.get(`/api/articles`)
    .then((articles) => res.render(`pages/my`, {articles: articles.data})));

userDataRouter.get(`/comments`, (req, res) =>
  api.get(`/api/articles`)
    .then((articles) => res.render(`pages/comments`, {articles: articles.data.slice(0, 3)})));

module.exports = userDataRouter;
