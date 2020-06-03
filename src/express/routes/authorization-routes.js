'use strict';

const {Router} = require(`express`);

const authorizationRouter = new Router();

authorizationRouter.get(`/register`, (req, res) => res.send(`/register`));
authorizationRouter.get(`/login`, (req, res) => res.send(`/login`));

module.exports = authorizationRouter;
