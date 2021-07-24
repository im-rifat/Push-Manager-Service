const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    token: String
}, {timestamps: true});

const UserToken = mongoose.model('usertoken', Schema);

module.exports = UserToken;