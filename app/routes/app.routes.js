const Router = new require('express').Router();
const appController = require('../controllers/app.controllers');
const {validation} = require('../middlewares');

Router.get('/', appController.getApps);
Router.post('/', validation.appDataValidationSchema , appController.createApp);
Router.get('/:id', appController.getApp);
Router.put('/:id', appController.updateApp);
Router.delete('/:id', appController.deleteApp);

module.exports = Router;