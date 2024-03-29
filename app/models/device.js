const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    token: String,
    data: String,
    app: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'app'
    }
}, {timestamps: true});

const Device = mongoose.model('device', Schema);

module.exports = Device;