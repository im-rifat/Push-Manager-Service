const axios = require('axios');
const error = require('../errors');
const StatusCodes = require('../utils/statusCodes');
const db = require('../models');

const Notification = db.notification;

const FCM_URI = 'https://fcm.googleapis.com/fcm/send';

sendNotification1 = async (notification, res, next) => {

  const options = {
      headers: {'Content-Type': 'application/json',
      'Authorization': `key=${notification.app.fcm_server_key}`}
  };

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
    await sendNotification1(notification, res, next);
    return 
  }

  return next(new error.ApiError(StatusCodes.StatusCodes.INTERNAL_SERVER_ERROR));

};

sendNotification = async (req, res, next) => {
    const uri = 'https://fcm.googleapis.com/fcm/send';

    const options = {
        headers: {'Content-Type': 'application/json',
    'Authorization': 'key=AAAAQJFYZKQ:APA91bGSG7PjJyQcRavnf1BXUVyo9vH5olD3T73Doxivf6sOR9semXdZw6FEX2WcfZMSKRqraMwke1msz8cNvPmfs9SN8xugVH20GYY43iDzVbS9rfbFwQPPNl8kfpKQHif9DzU1JrDm'}
      };

    try {
        let data = await axios.post(uri, {
            "to": "coDdcmCgTjyPTj4NM3FuF3:APA91bGmNC8k4CmxrRKuFq7b8m3Gt1T5gh5wUSu2LHdFUn2ijYdB8GiGYHISOjr4EkT7MKINJMwRQEdMwafMqVcMv_WcqIakjOfEP-r51yyxb64d5rBdbMTpQ8aQG9INwUWk5Caxb8wA",
            "notification": {
              "title": "Breaking News",
              "body": "New news story available."
            },
            "data": {
              "story_id": "story_12345"
            }
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

module.exports = {
    createNotification,
    sendNotification
};