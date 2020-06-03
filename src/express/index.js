'use strict';

const express = require(`express`);
const {
  authorizationRoutes,
  userDataRoutes,
  articlesRoutes,
  categoriesRoutes,
  mainRoute
} = require(`./routes`);

const DEFAULT_PORT = 8080;

const app = express();
console.log(`Создание маршрутов`);
app.use(`/`, authorizationRoutes);
app.use(`/my`, userDataRoutes);
app.use(`/categories`, categoriesRoutes);
app.use(`/articles`, articlesRoutes);
app.use(`/`, mainRoute);

app.listen(DEFAULT_PORT, (err) => {
  if (err) {
    return console.log(`Не удалось запустить сервер`);
  }

  return console.log(`Сервер запущен на порту ${DEFAULT_PORT}`);
});


