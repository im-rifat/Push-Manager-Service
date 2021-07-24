const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    name: String
}, {timestamps: true});

const apptype = mongoose.model('apptype', schema);

module.exports = apptype;