'use strict';

const express = require(`express`);

const {HTTP_CODE, API_PREFIX} = require(`../../constants`);
const apiRoutes = require(`../api`);
const {logger} = require(`../logs/pino`);
const pinoExpressMiddleware = require(`express-pino-logger`)({logger});

const app = express();

app.use(pinoExpressMiddleware);
app.use(express.json());

app.use((req, res, next) => {
  logger.debug(`Start request to url ${req.url}`);
  next();
});

app.use(API_PREFIX, apiRoutes);

app.use(`*`, (req, res) => {
  logger.error(`Page ${req.originalUrl} not found, ${res.statusCode}`);
  return res.status(404).send(`Адрес не найден`);
});


app.use((err, req, res, next) => {
  logger.error(`Unknown Error ${err}`);

  if (!err.status) {
    err.status = HTTP_CODE.serverError;
  }

  switch (err.status) {
    case HTTP_CODE.notFound:
      res.status(HTTP_CODE.notFound).send(err);
      break;
    case HTTP_CODE.serverError:
      res.status(HTTP_CODE.serverError).send(err);
      break;
    default:
      res.status(err.status).send(err);
  }
});

module.exports = app;
