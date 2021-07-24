const Router = new require('express').Router();
const crypto = require('../utils/crypto');
const User = require('../models/user');

Router.use('/app', require('./app.routes'));
Router.use('/notification', require('./notification.routes'));
Router.get('/generatekey', async (req, res, next) => {

    /*try {
        let user = await User.findById(req.userId).exec();

        res.send(crypto.encrypt(user.email));
    } catch(err) {
        next(err);
    }*/

    res.send({
        message: 'Not implemented yet'
    });
});

module.exports = Router;