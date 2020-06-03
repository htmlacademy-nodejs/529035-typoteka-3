'use strict';

const authorizationRoutes = require(`./authorization-routes.js`);
const userDataRoutes = require(`./user-data-routes.js`);
const articlesRoutes = require(`./articles-routes.js`);
const categoriesRoutes = require(`./articles-routes.js`);
const mainRoute = require(`./main-routes.js`);

module.exports = {
  authorizationRoutes,
  userDataRoutes,
  articlesRoutes,
  categoriesRoutes,
  mainRoute
};
