const Router = new require('express').Router();
const deviceController = require('../controllers/deviceController');
const {authKey} = require('../middlewares');

Router.use('/enrolltoken', [authKey.verifyKey], deviceController.createDevice);

module.exports = Router;