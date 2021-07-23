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
        ref: 'App'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {timestamps: true});

const Notification = mongoose.model('Notification', Schema);

module.exports = Notification;