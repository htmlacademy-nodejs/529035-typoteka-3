'use strict';

const express = require(`express`);
const myRoutes = require(`${__dirname}/routes/my-routes`);
const articlesRoutes = require(`${__dirname}/routes/articles-routes`);
const mainRoutes = require(`${__dirname}/routes/main-routes`);

const DEFAULT_PORT = 8080;

const app = express();
console.log(`Создание маршрутов`);
app.use(`/my`, myRoutes);
app.use(`/articles`, articlesRoutes);
app.use(`/`, mainRoutes);

app.listen(DEFAULT_PORT, (err) => {
    if (err) {
      return console.log(`Не удалось запустить сервер`);
    }

    return console.log(`Сервер запущен на порту ${DEFAULT_PORT}`)
  }
);


