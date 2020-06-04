'use strict';

const express = require(`express`);
const path = require(`path`);
const {
  authorizationRoutes,
  userDataRoutes,
  articlesRoutes,
  categoriesRoutes,
  searchRoute,
  mainRoute
} = require(`./routes`);
const {HTTP_CODE} = require(`../constants`);

const DEFAULT_PORT = 8080;
const PUBLIC_DIR = `public`;

const app = express();

app.use(express.static(path.resolve(__dirname, PUBLIC_DIR)));
app.set(`views`, path.resolve(__dirname, `templates`));
app.set(`view engine`, `pug`);

app.use(`/`, authorizationRoutes);
app.use(`/my`, userDataRoutes);
app.use(`/categories`, categoriesRoutes);
app.use(`/articles`, articlesRoutes);
app.use(`/search`, searchRoute);
app.use(`/`, mainRoute);

app.get(`*`, (req, res, next) => {
  let err = new Error(`Страница не найдена ${req.originalUrl}`);
  err.statusCode = HTTP_CODE.notFound;
  next(err);
});

app.use((err, req, res, next) => {
  console.log(err.message);

  if (!err.statusCode) {
    err.statusCode = HTTP_CODE.serverError;
  }

  switch (err.statusCode) {
    case HTTP_CODE.notFound:
      res.status(HTTP_CODE.notFound).render(`errors/404`);
      break;
    case HTTP_CODE.serverError:
      res.status(HTTP_CODE.serverError).render(`errors/500`);
      break;
    default:
      res.status(err.statusCode).send(err.message);
  }
});


app.listen(DEFAULT_PORT, (err) => {
  if (err) {
    return console.log(`Не удалось запустить сервер`);
  }

  return console.log(`Сервер запущен на порту ${DEFAULT_PORT}`);
});


