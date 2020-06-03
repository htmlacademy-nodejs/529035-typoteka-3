'use strict';

const {Router} = require(`express`);

const userDataRouter = new Router();

userDataRouter.get(`/`, (req, res) => res.send(`/my`));
userDataRouter.get(`/comments`, (req, res) => res.send(`/my/comments`));

module.exports = userDataRouter;
