'use strict';

const {HTTP_CODE} = require(`../../constants`);

const commentKeys = [`text`];

module.exports = (req, res, next) => {
  const newComment = req.body;
  const keys = Object.keys(newComment);
  const keysExists = commentKeys.every((key) => keys.includes(key));

  if (!keysExists) {
    res.status(HTTP_CODE.badRequest).send(`Bad request`);
  }

  next();
};
