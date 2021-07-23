const Router = new require('express').Router();
const appController = require('../controllers/appController');
const validationSchema = require('../middlewares/validationSchema');

Router.get('/', appController.getApps);
Router.post('/', validationSchema.appDataValidationSchema , appController.createApp);
Router.get('/:id', appController.getApp);
Router.put('/:id', appController.updateApp);
Router.delete('/:id', appController.deleteApp);

module.exports = Router;