const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    title: String,
    body: String,
    data: {
        type: Map,
        of: String
    },
    app: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'app'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }
}, {timestamps: true});

const Notification = mongoose.model('notification', Schema);

module.exports = Notification;