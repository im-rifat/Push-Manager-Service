const Router = new require('express').Router();
const appController = require('../controllers/appController');

Router.get('/', appController.getApps);
Router.post('/', appController.createApp);
Router.get('/:id', appController.getApp);
Router.put('/:id', appController.updateApp);
Router.delete('/:id', appController.deleteApp);

module.exports = Router;