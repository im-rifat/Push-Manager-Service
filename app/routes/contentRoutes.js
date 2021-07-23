const Router = new require('express').Router();
const crypto = require('../utils/crypto');
const User = require('../models/user');

Router.use('/app', require('./appRoutes'));
Router.use('/notification', require('./notificationRoutes'));
Router.get('/generatekey', async (req, res, next) => {

    try {
        let user = await User.findById(req.userId).exec();

        res.send(crypto.encrypt(user.email));
    } catch(err) {
        next(err);
    }
});

module.exports = Router;