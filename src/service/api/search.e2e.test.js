'use strict';

const request = require(`supertest`);
const server = require(`../server`);
const {API_PREFIX} = require(`../../constants`);
const getMockData = require(`../lib/get-mock-data`);
const {HTTP_CODE} = require(`../../constants`);

describe(`Тестирование API по маршруту search`, () => {
  beforeAll(async () => {
    await getMockData();
  });

  test(`Поиск с пустым параметром`, async () => {
    const res = await request(server).get(`${API_PREFIX}/search`);
    expect(res.statusCode).toBe(HTTP_CODE.badRequest);
  });

  test(`Поиск с заполненным параметром`, async () => {
    const query = `игра`;
    const res = await request(server).get(`${API_PREFIX}/search?query=${encodeURIComponent(query)}`);
    expect(res.statusCode).toBe(HTTP_CODE.success);
  });
});


