const db = require('../models');

const App = db.app;
const User = db.user;
const AppType = db.apptype;

createApp = (req, res) => {
    new App({
        name: req.body.name,
        package_name: req.body.package,
        firebase_id: req.body.fId
    }).save((err, app) => {
        if(err) {
            return res.status(500).send({message: err});
        }

        User.findById(req.userId).exec((err, user) => {
            if(err) {
                return res.status(500).send({message: err});
            }

            app.user = user._id;

            AppType.findOne({
                name: 'android'
            }, (err, apptype) => {
                if(err) {
                    return res.status(500).send({message: err});
                }

                app.app_type = apptype._id;

                app.save((err) => {
                    if(err) {
                        return res.status(500).send({message: err});
                    }

                    res.send({
                        id: app._id,
                        name: app.name,
                        package: app.package_name,
                        firebase_id: app.firebase_id,
                        app_type: apptype._id
                    });
                })
            })

        });
    });
};

getApps = (req, res) => {
    App.find({
        user: req.userId
    }).populate('user').populate('app_type').exec((err, result) => {
        if(err) {
            return res.status(500).send({message: err});
        }

        res.send(result);
    });
}

getApp = (req, res) => {
    App.findById(req.params.id, (err, app) => {
        if(err) {
            if(err.name == 'CastError') {
                return res.status(400).send({message: 'Invalid id'});
            }
            return res.status(500).send({message: err.message});
        }

        if(!app) {
            return res.status(404).send({message: 'Not found!'});
        }

        res.send({message: app});
    });
}

module.exports = {
    createApp,
    getApps,
    getApp
}