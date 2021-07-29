const db = require('../models');
const error = require('../errors');
const StatusCodes = require('../utils/statusCodes');
const { populate } = require('../models/refreshtoken');
const { mongoose } = require('../models');

const App = db.app;
const User = db.user;
const AppType = db.apptype;

createApp = async (req, res, next) => {
    let savedapp;

    try {
        let newapp = new App({
            name: req.body.name,
            package_name: req.body.package,
            fcm_server_key: req.body.fcm_key
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
            fcm_server_key: savedapp.fcm_server_key,
            app_type: apptype.name
        });

    } catch(err) {
        if(savedapp) {
            try {
                await App.findByIdAndDelete(savedapp._id).exec();
            } catch(err) {
                next(err);
                return;
            }          
        }

        next(err);
    }
};

getApps = async (req, res, next) => {
    let apps;

    try {
        apps = await App.find({
            user: req.userId
        }).select('_id name package_name fcm_server_key')
        .populate('app_type', 'name -_id').lean().exec(); //lean converts mongoose Document to plain javascript object

        apps.forEach(item => {
            if(item.app_type) {
                item.app_type = item.app_type.name;
            }
        });

        res.send(apps);
    } catch(err) {
        next(err);
    }
}

getApp = async (req, res, next) => {
    let app;

    try {
        app = await App.findById(req.params.id).
        select('_id name package_name fcm_server_key').populate('app_type', 'name').lean().exec();

        if(!app) {
            return next(new error.Api404Error(`App not found with id ${req.params.id}`));
        }

        if(app.app_type) {
            app.app_type = app.app_type.name;
        }

        res.send(app);
    } catch(err) {
        if(err) {
            if(err.name == 'CastError') {
                return next(new error.ApiError(StatusCodes.StatusCodes.BAD_REQUEST, 'Invalid id'));
            }

            next(err);
        }
    }
}

updateApp = async (req, res, next) => {
    let app;

    try {
        app = await App.findByIdAndUpdate(req.params.id, req.body, {new: true, useFindAndModify: false})
        .select('_id name package_name fcm_server_key')
        .populate('app_type', 'name').lean().exec();

        if(!app) {
            return next(new error.Api404Error(`App not found with id ${req.params.id}`));
        }

        if(app.app_type) {
            app.app_type = app.app_type.name;
        }

        res.send({message: app});
    } catch(err) {
        if(err.name == 'CastError') {
            return next(new Error.ApiError(StatusCodes.StatusCodes.BAD_REQUEST, 'Invalid id'));
        }

        next(err);
    }
}

deleteApp = async (req, res, next) => {
    let app;

    try {
        app = await App.findByIdAndDelete(req.params.id)
        .select('_id name package_name fcm_server_key')
        .populate('app_type', 'name').lean().exec();

        if(!app) {
            return next(new error.Api404Error(`Can not delete app with ${req.params.id}`));
        }

        if(app.app_type) {
            app.app_type = app.app_type.name;
        }
        
        return res.send({message: app});
    } catch(err) {

        if(err.name == 'CastError') {
            return next(new error.ApiError(StatusCodes.StatusCodes.BAD_REQUEST, 'Invalid id'));
        }

        next(err);
    }
}

module.exports = {
    createApp,
    getApps,
    getApp,
    updateApp,
    deleteApp
};