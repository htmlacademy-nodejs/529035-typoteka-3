'use strict';

const {HTTP_CODE} = require(`../../constants`);

const articleKeys = [`title`, `announce`, `fullText`, `categories`];

module.exports = (req, res, next) => {
  const newArticle = req.body;
  const keys = Object.keys(newArticle);
  const keysExists = articleKeys.every((key) => keys.includes(key));

  if (!keysExists) {
    res.status(HTTP_CODE.badRequest).send(`Bad request`);
  }

  next();
};
