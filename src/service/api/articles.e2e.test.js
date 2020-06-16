'use strict';

const request = require(`supertest`);
const server = require(`../server`);
const {API_PREFIX} = require(`../../constants`);
const getMockData = require(`../lib/get-mock-data`);
const {HTTP_CODE} = require(`../../constants`);

describe(`Тестирование API статей по маршруту /articles`, () => {
  beforeAll(async () => {
    await getMockData();
  });

  test(`Получение всех статей по маршруту /`, async () => {
    const res = await request(server).get(`${API_PREFIX}/articles`);
    expect(res.statusCode).toBe(HTTP_CODE.success);
  });

  test(`Получение статьи по ID по маршруту /:articleId`, async () => {
    const res = await request(server).get(`${API_PREFIX}/articles/HuLxhs`);
    expect(res.statusCode).toBe(HTTP_CODE.success);
  });

  test(`Получение статьи по несуществующему ID по маршруту /:articleId`, async () => {
    const res = await request(server).get(`${API_PREFIX}/articles/5000`);
    expect(res.statusCode).toBe(HTTP_CODE.notFound);
  });

  test(`Некорректная отправка статьи на сервер по маршруту /`, async () => {
    const res = await request(server).post(`${API_PREFIX}/articles`).send({title: `Статья`});
    expect(res.statusCode).toBe(HTTP_CODE.badRequest);
  });

  test(`Отправка статьи на сервер по маршруту /`, async () => {
    const res = await request(server).post(`${API_PREFIX}/articles`).send({title: `Статья`, announce: `Маленький текст`, fullText: `большой текст`, categories: `Вечная жизнь`});

    const id = res.body.id;
    const articleResponse = await request(server).get(`${API_PREFIX}/articles/${id}`);
    expect(res.statusCode).toBe(HTTP_CODE.created);
    expect(articleResponse.body.title).toBe(`Статья`);
  });

  test(`Редактирование статьи по ID по маршруту /:articleId`, async () => {
    const res = await request(server).post(`${API_PREFIX}/articles`).send({title: `Роскошная жизнь`, announce: `Маленький текст`, fullText: `большой текст`, categories: [`Вечная жизнь`, `Книжная продукция`]});

    const id = res.body.id;
    const articleResponse = await request(server).put(`${API_PREFIX}/articles/${id}`).send({title: `Бедная жизнь`, announce: `Большой текст`, fullText: `Маленький текст`, categories: [`Быстрая жизнь`, `Здоровая продукция`]});

    expect(articleResponse.body.title).toBe(`Бедная жизнь`);
    expect(articleResponse.body.announce).toBe(`Большой текст`);
    expect(articleResponse.body.fullText).toBe(`Маленький текст`);
    expect(articleResponse.body.categories).toContain(`Быстрая жизнь`);
    expect(articleResponse.body.categories).toContain(`Здоровая продукция`);
  });

  test(`Удаление статьи по ID по маршруту /:articleId`, async () => {
    const res = await request(server).post(`${API_PREFIX}/articles`).send({title: `Статья`, announce: `Маленький текст`, fullText: `большой текст`, categories: [`Вечная жизнь`, `Книжная продукция`]});

    const id = res.body.id;
    const articleDeleted = await request(server).delete(`${API_PREFIX}/articles/${id}`);
    const articleResponse = await request(server).get(`${API_PREFIX}/articles/${id}`);

    expect(articleDeleted.statusCode).toBe(HTTP_CODE.success);
    expect(articleResponse.statusCode).toBe(HTTP_CODE.notFound);
  });
});

describe(`Тестирование API комментариев к статьям по маршруту /articles`, () => {
  beforeAll(async () => {
    await getMockData();
  });

  test(`Получение всех комментариев к статье по маршруту /:articleId/comments`, async () => {
    const res = await request(server).post(`${API_PREFIX}/articles`).send({title: `Статья`, announce: `Маленький текст`, fullText: `большой текст`, categories: [`Вечная жизнь`, `Книжная продукция`], comments: [{text: `Первый коммент`}, {text: `Второй коммент`}]});

    const commentsResponse = await request(server).get(`${API_PREFIX}/articles/${res.body.id}/comments`);

    expect(commentsResponse.statusCode).toBe(HTTP_CODE.success);
  });


  test(`Удаление комментария по ID по маршруту /:articleId/comments/:commentId`, async () => {
    const articlePostResponse = await request(server).post(`${API_PREFIX}/articles`).send({title: `Статья`, announce: `Маленький текст`, fullText: `большой текст`, categories: [`Вечная жизнь`, `Книжная продукция`], comments: [{text: `Первый коммент`}, {text: `Второй коммент`}]});

    const commentsPostResponse = await request(server).post(`${API_PREFIX}/articles/${articlePostResponse.body.id}/comments`).send({text: `Новый коммент`});

    const commentsDeleteResponse = await request(server).delete(`${API_PREFIX}/articles/${articlePostResponse.body.id}/comments/${commentsPostResponse.body.id}`);

    const commentsGetResponse = await request(server).get(`${API_PREFIX}/articles/${articlePostResponse.body.id}/comments`);

    expect(commentsGetResponse.body.find((item) => item.id === commentsDeleteResponse.body.id)).toBeFalsy();
  });

  test(`Отправка комментария к статье по маршруту /:articleId/comments`, async () => {
    const res = await request(server).post(`${API_PREFIX}/articles`).send({title: `Статья`, announce: `Маленький текст`, fullText: `большой текст`, categories: [`Вечная жизнь`, `Книжная продукция`], comments: [{text: `Первый коммент`}, {text: `Второй коммент`}]});

    const commentsPostResponse = await request(server).post(`${API_PREFIX}/articles/${res.body.id}/comments`).send({text: `Новый коммент`});

    const commentsGetResponse = await request(server).get(`${API_PREFIX}/articles/${res.body.id}/comments`);

    expect(commentsPostResponse.statusCode).toBe(HTTP_CODE.created);
    expect(commentsGetResponse.body.find((item) => item.id === commentsPostResponse.body.id));
  });
});


