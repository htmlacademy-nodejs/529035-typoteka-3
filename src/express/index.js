'use strict';

const express = require(`express`);
const {
  authorizationRoutes,
  userDataRoutes,
  articlesRoutes,
  categoriesRoutes,
  searchRoute,
  mainRoute
} = require(`./routes`);

const DEFAULT_PORT = 8080;

const app = express();

app.use(`/`, authorizationRoutes);
app.use(`/my`, userDataRoutes);
app.use(`/categories`, categoriesRoutes);
app.use(`/articles`, articlesRoutes);
app.use(`/search`, searchRoute);
app.use(`/`, mainRoute);

app.listen(DEFAULT_PORT, (err) => {
  if (err) {
    return console.log(`Не удалось запустить сервер`);
  }

  return console.log(`Сервер запущен на порту ${DEFAULT_PORT}`);
});


