const mongoose = require('mongoose');

const RoleSchema = new mongoose.Schema({
    name: String
}, {timestamps: true});

const Role = mongoose.model('role', RoleSchema);

module.exports = Role;