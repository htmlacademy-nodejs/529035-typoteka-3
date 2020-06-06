'use strict';

const http = require(`http`);
const chalk = require(`chalk`);
const fs = require(`fs`).promises;

const {HTTP_CODE} = require(`../../constants`);
const DEFAULT_PORT = 3000;
const FILE_PATH = `../mocks.json`;

const sendResponse = (res, statusCode, message) => {
  const template = `
    <!Doctype html>
      <html lang="ru">
      <head>
        <title>Разработка на Node</title>
      </head>
      <body>${message}</body>
    </html>`.trim();

  res.statusCode = statusCode;
  res.writeHead(statusCode, {
    'Content-Type': `text/html; charset=UTF-8`,
  });

  res.end(template);
};

const onClientConnect = async (request, response) => {
  const notFoundMessageText = `Not found`;

  switch (request.url) {
    case `/`:
      try {
        const fileContent = await fs.readFile(FILE_PATH);
        const mocks = JSON.parse(fileContent);
        const htmlContent = mocks.map((post) => `<li>${post.title}</li>`).join(``);
        sendResponse(response, HTTP_CODE.success, `<ul>${htmlContent}</ul>`);
      } catch (err) {
        sendResponse(response, HTTP_CODE.notFound, notFoundMessageText);
      }
      break;

    default:
      sendResponse(response, HTTP_CODE.notFound, notFoundMessageText);
      break;
  }
};

module.exports = {
  name: `--server`,
  run(args) {

    const [customPort] = args;
    const port = Number.parseInt(customPort, 10) || DEFAULT_PORT;
    const httpServer = http.createServer(onClientConnect);

    httpServer.listen(port, (err) => {
      if (err) {
        return console.error(`Ошибка при создании http-сервера. `, err);
      }
      return console.info(chalk.green(`Принимаю подключение на порт ${port}`));
    });
  }
};
