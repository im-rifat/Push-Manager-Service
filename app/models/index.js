const mongoose = require('mongoose');

const db = {};

db.mongoose = mongoose;
db.user = require('./user');
db.role = require('./role');

db.Roles = ['user', 'moderator', 'admin'];

module.exports = db;