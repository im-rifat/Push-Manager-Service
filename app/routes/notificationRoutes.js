const Router = new require('express').Router();
const notificationController = require('../controllers/notificationController');

Router.post('/', notificationController.createNotification);
Router.post('/send', notificationController.sendNotification);

module.exports = Router;