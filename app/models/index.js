const mongoose = require('mongoose');

const db = {};

db.mongoose = mongoose;
db.user = require('./user');
db.role = require('./role');
db.apptype = require('./apptype');
db.app = require('./app');

db.Roles = ['user', 'moderator', 'admin'];
db.AppTypes = ['android', 'ios', 'web'];

module.exports = db;