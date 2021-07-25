const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    token: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }
}, {timestamps: true});

const RefreshToken = mongoose.model('refreshtoken', Schema);

module.exports = RefreshToken;