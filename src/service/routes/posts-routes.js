'use strict';

const {Router} = require(`express`);
const fs = require(`fs`).promises;
const {HTTP_CODE} = require(`../../constants`);

const FILE_PATH = `../mocks.json`;
const MOCKS_DEFAULT = [];

const postsRouter = new Router();

postsRouter.get(`/`, async (req, res, next) => {
  try {
    const fileContent = await fs.readFile(FILE_PATH);
    const mocks = JSON.parse(fileContent);
    res.json(mocks);
  } catch (err) {
    if (res.statusCode === HTTP_CODE.serverError) {
      err.statusCode = HTTP_CODE.serverError;
      next(err);
    } else {
      res.json(MOCKS_DEFAULT);
    }
  }
});

module.exports = postsRouter;
