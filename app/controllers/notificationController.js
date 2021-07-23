const axios = require('axios');
const error = require('../errors');
const StatusCodes = require('../utils/statusCodes');

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

          console.log('hi');
          console.log(data.status, data.statusText, data.data);
          
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
    sendNotification
};