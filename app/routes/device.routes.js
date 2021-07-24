const Router = new require('express').Router();
const deviceController = require('../controllers/device.controllers');
const {authKey} = require('../middlewares');

Router.use('/enrolltoken', [authKey.verifyKey], deviceController.createDevice);

module.exports = Router;