'use strict';

const authorizationRoutes = require(`./authorization-routes.js`);
const userDataRoutes = require(`./user-data-routes.js`);
const articlesRoutes = require(`./articles-routes.js`);
const categoriesRoutes = require(`./categories-routes.js`);
const searchRoute = require(`./search-route.js`);
const mainRoute = require(`./main-route.js`);

module.exports = {
  authorizationRoutes,
  userDataRoutes,
  articlesRoutes,
  categoriesRoutes,
  searchRoute,
  mainRoute
};
