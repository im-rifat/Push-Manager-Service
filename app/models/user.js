const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    roles: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'role'
        }
    ]
}, {timestamps: true});

const User = mongoose.model('user', UserSchema);

module.exports = User;