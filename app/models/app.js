const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    name: String,
    package_name: String,
    fcm_server_key: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    app_type: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'apptype'
    }
}, {timestamps: true});

const App = mongoose.model('app', schema);

module.exports = App;