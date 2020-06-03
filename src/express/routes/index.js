'use strict';

const authorizationRoutes = require(`./authorization-routes`);
const userDataRoutes = require(`./user-data-routes`);
const articlesRoutes = require(`./articles-routes`);
const categoriesRoutes = require(`./categories-routes`);
const searchRoute = require(`./search-route`);
const mainRoute = require(`./main-route`);

module.exports = {
  authorizationRoutes,
  userDataRoutes,
  articlesRoutes,
  categoriesRoutes,
  searchRoute,
  mainRoute
};
