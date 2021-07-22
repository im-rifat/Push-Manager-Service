const Router = new require('express').Router();

Router.use('/app', require('./appRoutes'));
Router.use('/notification', require('./notificationRoutes'));

module.exports = Router;