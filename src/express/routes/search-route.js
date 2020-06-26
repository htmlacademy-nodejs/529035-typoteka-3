'use strict';

const {Router} = require(`express`);
const {api} = require(`../api`);

const searchRouter = new Router();

searchRouter.get(`/`, (req, res) => {
  if (req.query.query) {
    const query = encodeURIComponent(req.query.query);
    api.get(`/api/search?query=${query}`)
      .then((articles) => res.render(`pages/search`, {articles: articles.data, query: req.query.query}))
      .catch(() => res.render(`pages/search`, {error: `Ошибка`}));
  } else {
    res.render(`pages/search`);
  }
});

module.exports = searchRouter;

