const db = require('../models');
const error = require('../errors');

const App = db.app;
const User = db.user;
const AppType = db.apptype;

createApp = async (req, res, next) => {
    let savedapp;

    try {
        let newapp = new App({
            name: req.body.name,
            package_name: req.body.package,
            firebase_id: req.body.fId
        });

        savedapp = await newapp.save();

        let user = await User.findById(req.userId).exec();
        let apptype = await AppType.findOne({
            name: 'android'
        }).exec();

        savedapp.user = user._id;
        savedapp.app_type = apptype._id;

        savedapp = await savedapp.save();

        res.send({
            id: savedapp._id,
            name: savedapp.name,
            package: savedapp.package_name,
            firebase_id: savedapp.firebase_id,
            app_type: apptype._id
        });

    } catch(err) {
        if(savedapp) {
            try {
                await App.findByIdAndDelete(savedapp._id).exec();
            } catch(err) {
                next(new error.ApiError('ISE', 500, true, err.message));
                return;
            }          
        }

        next(new error.ApiError('ISE', 500, true, err.message));
    }
};

getApps = async (req, res, next) => {
    let apps;

    try {
        apps = await App.find({
            user: req.userId
        }).populate('user').populate('app_type').exec();

        res.send(apps);
    } catch(err) {
        next(new error.ApiError('ISE', 500, true, err.message));
    }
}

getApp = async (req, res, next) => {
    let app;

    try {
        app = await App.findById(req.params.id).exec();

        if(!app) {
            throw new error.Api404Error(`Not found with id ${req.params.id}`);
        }

        res.send(app);
    } catch(err) {
        if(err) {
            if(err.name == 'CastError') {
                next(new error.ApiError('Forbidden', 403, true, 'Invalid id'));
            }

            next(new Error.ApiError('ISE', 500, true, err.message));
        }
    }
}

updateApp = async (req, res, next) => {
    let app;

    try {
        app = await App.findByIdAndUpdate(req.params.id, req.body, {new: true, useFindAndModify: false}).exec();

        if(!app) {
            throw new error.Api404Error(`Not found with id ${req.params.id}`);
        }

        res.send({message: app});
    } catch(err) {
        if(err.name == 'CastError') {
            next(new Error.ApiError('Forbidden', 400, true, 'Invalid id'));
        }

        next(new error.ApiError('ISE', 500, true, err.message));
    }
}

deleteApp = async (req, res, next) => {
    let app;

    try {
        app = await App.findByIdAndDelete(req.params.id);

        if(!app) {
            throw new error.Api404Error(`Can not delete app with ${req.params.id}`);
        }

        return res.send({message: app});
    } catch(err) {

        if(err.name == 'CastError') {
            next(new error.ApiError('Forbidden', 403, true, 'Invalid id'));
        }

        next(new error.ApiError('ISE', 500, true, 'Internal Server Error'));
    }
}

module.exports = {
    createApp,
    getApps,
    getApp,
    updateApp,
    deleteApp
};