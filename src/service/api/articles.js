'use strict';

const {Router} = require(`express`);
const {HTTP_CODE} = require(`../../constants`);
const articleValidator = require(`../middlewares/article-validator`);
const articleExist = require(`../middlewares/article-exists`);
const commentValidator = require(`../middlewares/comment-validator`);

const route = new Router();

module.exports = (app, articleService, commentService) => {
  app.use(`/articles`, route);

  // Работа со статьями

  route.get(`/`, (req, res) => {
    const articles = articleService.findAll();
    return res.status(HTTP_CODE.success).json(articles);

  });

  route.get(`/:articleId`, (req, res) => {
    const {articleId} = req.params;
    const article = articleService.findOne(articleId);

    if (!article) {
      return res.status(HTTP_CODE.notFound)
        .send(`Отсутствует статья ${articleId}`);
    }

    return res.status(HTTP_CODE.success).json(article);

  });

  route.post(`/`, articleValidator, (req, res) => {
    const article = articleService.create(req.body);
    return res.status(HTTP_CODE.created).json(article);
  });

  route.put(`/:articleId`, articleValidator, (req, res) => {
    const {articleId} = req.params;
    const article = articleService.findOne(articleId);

    if (!article) {
      return res.status(HTTP_CODE.notFound)
        .send(`Отсутствует статья ${articleId}`);
    }

    const updatedArticle = articleService.update(articleId, req.body);
    return res.status(HTTP_CODE.success).json(updatedArticle);

  });

  route.delete(`/:articleId`, (req, res) => {
    const {articleId} = req.params;
    const deletedArticle = articleService.drop(articleId);

    if (!deletedArticle) {
      return res.status(HTTP_CODE.notFound).send(`Отсутствует статья ${articleId}`);
    }

    return res.status(HTTP_CODE.success).json(deletedArticle);

  });

  // Работа с комментариями

  route.get(`/:articleId/comments`, articleExist(articleService), (req, res) => {
    const {article} = res.locals;
    const comments = commentService.findAll(article);

    return res.status(HTTP_CODE.success).json(comments);

  });

  route.delete(`/:articleId/comments/:commentId`, articleExist(articleService), (req, res) => {
    const {article} = res.locals;
    const {commentId} = req.params;
    const deletedComment = commentService.drop(article, commentId);

    if (!deletedComment) {
      return res.status(HTTP_CODE.notFound).send(`Комментарий ${commentId} не найден`);
    }

    return res.status(HTTP_CODE.success).json(deletedComment);

  });

  route.post(`/:articleId/comments`, [articleExist(articleService), commentValidator], (req, res) => {
    const {article} = res.locals;
    const comment = commentService.create(article, req.body);

    return res.status(HTTP_CODE.created).json(comment);

  });


};
