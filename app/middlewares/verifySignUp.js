const db = require('../models');

const ROLES = db.Roles;
const User = db.user;

checkDuplicateUsernameOrEmail = (req, res, next) => {
    User.findOne({
        username: req.body.username
    }).then((result) => {
        if (result) {
            res.status(400).send({ message: 'Failed! username already in use.' });
            return;
        }

        User.findOne({
            email: req.body.email
        }).then((result) => {
            if (result) {
                res.status(400).send({ message: 'Failed! email already in use.' })
                return;
            }

            next();
        }).catch((err) => {
            res.status(500).send({ message: err });
        })
    }).catch((err) => {
        console.log(err);

        res.status(500).send({ message: err });
    })
};

checkRoleExisted = (req, res, next) => {
    if (req.body.roles) {
        for (let i = 0; i < req.body.roles.length; i++) {
            if (!ROLES.includes(req.boy.roles[i])) {
                res.status(400).send({ message: `Failed! role ${req.body.roles[i]} does not exist.` })
                return;
            }
        }
    }

    next();
}

const verifySignUp = {
    checkDuplicateUsernameOrEmail,
    checkRoleExisted
};

module.exports = verifySignUp;