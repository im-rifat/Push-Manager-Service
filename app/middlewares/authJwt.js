const jwt = require('jsonwebtoken');
const authConfig = require('../configs/authConfig');
const db = require('../models');

const User = db.user;
const Role = db.role;

verifyToken = (req, res, next) => {
    let token = req.headers['x-access-token'];

    if (!token) {
        res.status(403).send({ message: 'No token provided!' });
        return;
    }

    jwt.verify(token, authConfig.secretKey, (err, decoded) => {
        if (err) {
            res.status(401).send({ message: 'Unauthorized!' });
            return;
        }

        req.userId = decoded.id;

        next();
    });
};

isAdmin = (req, res, next) => {
    User.findById(req.userId)
        .then((user) => {

            Role.find({
                _id: { $in: user.roles }
            }, (err, roles) => {
                if (err) {
                    res.status(500).send({ message: err });
                    return;
                }

                for (let i = 0; i < roles.length; i++) {
                    if (roles[i].name == 'admin') {
                        next();
                        return;
                    }
                }

                res.status(403).send({ message: 'Require admin role!' });
            });

        })
        .catch((err) => {
            console.log(err);

            res.status(500).send({ message: err });
        });
};

isModerator = (req, res, next) => {
    User.findById(req.userId)
        .then((user) => {

            Role.find({
                _id: { $in: user.roles }
            }, (err, roles) => {
                if (err) {
                    res.status(500).send({ message: err });
                    return;
                }

                for (let i = 0; i < roles.length; i++) {
                    if (roles[i].name == 'moderator') {
                        next();
                        return;
                    }
                }

                res.status(403).send({ message: 'Require moderator role!' });
            });

        })
        .catch((err) => {
            console.log(err);

            res.status(500).send({ message: err });
        });
};

const authJwt = {
    verifyToken,
    isAdmin,
    isModerator
};

module.exports = authJwt;