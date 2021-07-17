const authConfig = require('../configs/authConfig');
const db = require('../models');

const Use = db.user;
const Role = db.role;

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');

signup = (req, res) => {
    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8)
    });

    user.save((err, result) => {
        if (err) {
            return res.status(500).send({ message: err });
        }

        if (req.body.roles) {
            Role.find({
                name: { $in: req.body.roles }
            }, (err, roles) => {
                if (err) {
                    return res.status(500).send({ message: err });
                }

                user.roles = roles.map(role => role._id);

                user.save((err) => {
                    if (err) {
                        return res.status(500).send({ message: err });
                    }

                    res.send({ message: 'User was registered successfully' });
                });
            })
        } else {
            Role.findOne({
                name: 'user'
            }, (err, role) => {
                if (err) {
                    return res.status(500).send({ message: err });
                }

                user.roles = [role._id];
                user.save((err) => {
                    if (err) {
                        return res.status(500).send({ message: err });
                    }

                    res.send({ message: 'User was registered successfully' });
                })
            });
        }
    });
};

signIn = (req, res) => {
    User.findOne({
        username: req.body.username
    }).populate('roles').then(user => {
        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }

        let passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

        if (!passwordIsValid) {
            return res.status(401).send({
                accessToken: null,
                message: 'Invalid password!'
            });
        }

        let token = jwt.sign({ id: user._id }, authConfig.secretKey, {
            expiresIn: authConfig.accessTokenLife,
        });

        var authorities = [];
        for (let i = 0; i < user.roles.length; i++) {
            authorities.push('ROLE_' + user.roles[i].name.toUpperCase());
        }

        res.status(200).send({
            id: user._id,
            username: user.username,
            email: user.email,
            roles: authorities,
            accessToken: token
        });
    }).catch(err => {
        console.log(err);

        res.status(500).send({ message: err });
    })
};

module.exports = {
    signup,
    signIn
};