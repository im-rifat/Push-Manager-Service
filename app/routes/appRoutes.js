const Router = new require('express').Router();
const appController = require('../controllers/appController');

Router.get('/', appController.getApps);
Router.post('/', appController.createApp);

module.exports = Router;