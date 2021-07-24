const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    token: String
}, {timestamps: true});

const RefreshToken = mongoose.model('refreshtoken', Schema);

module.exports = RefreshToken;