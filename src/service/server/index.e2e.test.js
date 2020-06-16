'use strict';

const request = require(`supertest`);
const server = require(`../server`);
const {API_PREFIX} = require(`../../constants`);
const getMockData = require(`../lib/get-mock-data`);
const {HTTP_CODE} = require(`../../constants`);

describe(`Тестирование API по несуществующему маршруту`, () => {
  beforeAll(async () => {
    await getMockData();
  });

  test(`Получение списка категорий`, async () => {
    const res = await request(server).get(`${API_PREFIX}/3123123123`);
    expect(res.statusCode).toBe(HTTP_CODE.notFound);
  });
});
