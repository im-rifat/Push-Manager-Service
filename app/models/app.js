const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    name: String,
    package_name: String,
    firebase_id: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    app_type: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'apptype'
    }
});

const App = mongoose.model('App', schema);

module.exports = App;