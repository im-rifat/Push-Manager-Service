const axios = require('axios');
const error = require('../errors');
const StatusCodes = require('../utils/statusCodes');
const db = require('../models');

const App = db.app;

const Notification = db.notification;

const FCM_URI = 'https://fcm.googleapis.com/fcm/send';

sendNotification = async (notification, res, next) => {

  let options;

  try {
      options = {
        headers: {'Content-Type': 'application/json',
        'Authorization': `key=${notification.app.fcm_server_key}`}
      };
  } catch(err) {
    return next(err);
  }

  try {
      let data = await axios.post(FCM_URI, {
          "to": `/topics/${notification.app.package_name}`,
          "notification": {
          "title": `${notification.title}`,
          "body": `${notification.body}`
        },
        "data": Object.fromEntries(notification.data)
      }, options);
      
      res.send({
          status: data.status,
          statusText: data.statusText,
          data: data.data
      });
  } catch(err) {
      next(err);
  }
}

createNotification = async (req, res, next) => {
  let data = req.body;

  try {
    let app = await App.findById(data.appId).exec();

    if(!app) {
      return next(new error.Api404Error(`App not found with id ${data.appId}`));
    }
  } catch(err) {
    return next(err);
  }

  let notification;

  try {
    notification = await Notification({
      title: data.title,
      body: data.body,
      data: data.data,
      app: data.appId,
      user: req.userId
    }).save();

    notification = await Notification
    .findById(notification._id)
    .populate('app').populate('user').exec();

  } catch(err) {
    if(notification) {
      try {
        await Notification.findByIdAndDelete(notification._id);
      } catch(err) {
        return next(err);
      }
    }

    next(err);
  }

  if(notification) {
    await sendNotification(notification, res, next);
    return;
  }

  return next(new error.ApiError(StatusCodes.StatusCodes.INTERNAL_SERVER_ERROR));

};

module.exports = {
    createNotification
};