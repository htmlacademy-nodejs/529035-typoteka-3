'use strict';

const {Router} = require(`express`);
const {api} = require(`../api`);

const articlesRouter = new Router();

articlesRouter.get(`/category/:id`, (req, res) => res.render(`pages/articles-by-category`));

articlesRouter.get(`/add`, (req, res) => res.render(`pages/new-post`));

articlesRouter.get(`/edit/:id`, (req, res) =>
  api.get(`api/articles/${req.params.id}`)
    .then((article) => res.render(`pages/new-post`, {article: article.data}))
    .catch((err) => res.status(404).render(`errors/404`))
);

articlesRouter.get(`/:id`, (req, res) => res.render(`pages/post`));

articlesRouter.post(`/add`, (req, res) => {
  const {title, announce, fullText} = req.body;
  const articleForm = {
    title,
    announce,
    fullText,
    categories: [`Кино`, `Жизнь`],
  };

  api.post(`/api/articles`, articleForm)
    .then(() => res.redirect(`/my`))
    .catch((err) => res.render(`pages/new-post`, {articleForm, err}));
});

module.exports = articlesRouter;
