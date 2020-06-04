'use strict';

const {Router} = require(`express`);

const userDataRouter = new Router();

userDataRouter.get(`/`, (req, res) => res.render(`pages/my`));
userDataRouter.get(`/comments`, (req, res) => res.render(`pages/comments`));

module.exports = userDataRouter;
