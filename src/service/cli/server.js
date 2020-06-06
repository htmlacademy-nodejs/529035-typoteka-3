'use strict';

const express = require(`express`);

const {HTTP_CODE} = require(`../../constants`);
const postsRoutes = require(`../routes/posts-routes`);
const DEFAULT_PORT = 3000;

const app = express();
app.use(express.json());
app.use(`/posts`, postsRoutes);


app.use((err, req, res, next) => {
  console.log(err);

  if (!err.statusCode) {
    err.statusCode = HTTP_CODE.serverError;
  }

  switch (err.statusCode) {
    case HTTP_CODE.notFound:
      res.status(HTTP_CODE.notFound).send(err);
      break;
    case HTTP_CODE.serverError:
      res.status(HTTP_CODE.serverError).send(err);
      break;
    default:
      res.status(err.statusCode).send(err);
  }
});

module.exports = {
  name: `--server`,
  run(args) {

    const [customPort] = args;
    const port = Number.parseInt(customPort, 10) || DEFAULT_PORT;

    app.listen(port, (err) => {
      if (err) {
        return console.log(`Не удалось запустить сервер`);
      }

      return console.log(`Сервер запущен на порту ${port}`);
    });
  }
};
