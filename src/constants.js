'use strict';

const DEFAULT_COMMAND = `--help`;
const USER_PARAMS_START = 2;

const EXIT_CODE = {
  success: 0,
  error: 1
};

const HTTP_CODE = {
  success: 200,
  notFound: 404,
  serverError: 500,
  created: 201,
  badRequest: 400,
  unauthorized: 401,
  forbidden: 403,
};

const MAX_ID_LENGTH = 6;
const API_PREFIX = `/api`;

module.exports = {
  DEFAULT_COMMAND,
  USER_PARAMS_START,
  EXIT_CODE,
  HTTP_CODE,
  MAX_ID_LENGTH,
  API_PREFIX,
};


