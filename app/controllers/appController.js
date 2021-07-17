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

            console.log("id: " + req.userId);
            console.log(user);

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
    }, (err, result) => {
        if(err) {
            return res.status(500).send({message: err});
        }

        res.send(result);
    });
}

module.exports = {
    createApp,
    getApps
}