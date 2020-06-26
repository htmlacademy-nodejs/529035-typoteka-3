'use strict';

const axios = require(`axios`);

const createAPI = () => {
  const api = axios.create({
    baseURL: `http://localhost:3000`,
    timeout: 1000 * 5,
  });

  const onSuccess = (response) => {
    return response;
  };

  const onFail = (err) => {
    throw err;
  };

  api.interceptors.response.use(onSuccess, onFail);

  return api;
};

const api = createAPI();

module.exports = {
  api
};
