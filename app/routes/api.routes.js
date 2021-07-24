const express = require('express');
const authRoutes = require('./auth.routes');
const contentRoutes = require('./content.routes');
const { authJwt } = require("../middlewares");

const Router = new express.Router();

Router.use(function(req, res, next) {
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept, key"
    );
    next();
});

Router.use('/content', [authJwt.verifyToken], contentRoutes);

Router.use('/admin', (req, res, next) => {
    res.send({
        message: 'Not implemented yet'
    });
});

Router.use('/moderator', (req, res, next) => {
    res.send({
        message: 'Not implemented yet'
    });
});

Router.use('/auth', authRoutes);

Router.use('/device', require('./device.routes'));

Router.use(require('../middlewares/errorHandler.middlewares'));

module.exports = Router;