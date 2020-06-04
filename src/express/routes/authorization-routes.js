'use strict';

const {Router} = require(`express`);

const authorizationRouter = new Router();

authorizationRouter.get(`/register`, (req, res) => res.render(`pages/sign-up`));
authorizationRouter.get(`/login`, (req, res) => res.render(`pages/login`));

module.exports = authorizationRouter;
