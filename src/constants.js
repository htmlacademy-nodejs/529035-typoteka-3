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
  serverError: 500
};

module.exports = {
  DEFAULT_COMMAND,
  USER_PARAMS_START,
  EXIT_CODE,
  HTTP_CODE
};
