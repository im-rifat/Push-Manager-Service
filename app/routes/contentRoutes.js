const Router = new require('express').Router();
const appControllers = require('../controllers/appController');

Router.use('/app', require('./appRoutes'));

module.exports = Router;