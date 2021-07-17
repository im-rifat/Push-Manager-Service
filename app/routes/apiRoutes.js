const express = require('express');
const authRoutes = require('./authRoutes');
const contentRoutes = require('./contentRoutes');
const { authJwt } = require("../middlewares");

const Router = new express.Router();

Router.use(function(req, res, next) {
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
    );
    next();
});

Router.use('/content', [authJwt.verifyToken], contentRoutes);

Router.use('/admin', (req, res, next) => {
});

Router.use('/moderator', (req, res, next) => {
});

Router.use('/auth', authRoutes);

module.exports = Router;