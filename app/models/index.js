const mongoose = require('mongoose');

const db = {};

db.mongoose = mongoose;
db.user = require('./user');
db.role = require('./role');
db.apptype = require('./apptype');
db.app = require('./app');
db.device = require('./device');
db.notification = require('./notification');
db.refreshtoken = require('./refreshtoken');

db.Roles = ['user', 'moderator', 'admin'];
db.AppTypes = ['android', 'ios', 'web'];

module.exports = db;