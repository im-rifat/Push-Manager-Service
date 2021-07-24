const db = require('../models');
const error = require('../errors');
const StatusCodes = require('../utils/statusCodes');

const ROLES = db.Roles;
const User = db.user;

checkDuplicateUsernameOrEmail = async (req, res, next) => {

    try {
        let username = await User.findOne({
            username: req.body.username
        }).exec();

        if(username) {
            return next(new error.ApiError(StatusCodes.StatusCodes.BAD_REQUEST, 'Failed! username already in use.'));
        }

        let useremail = await User.findOne({
            email: req.body.email
        }).exec();

        if(useremail) {
            return next(new error.ApiError(StatusCodes.StatusCodes.BAD_REQUEST, 'Failed! email already in use.'));
        }

        next();
    } catch(err) {
        next(err);
    }
};

checkRoleExisted = (req, res, next) => {
    if (req.body.roles) {
        for (let i = 0; i < req.body.roles.length; i++) {
            if (!ROLES.includes(req.body.roles[i])) {
                next(new error.ApiError(StatusCodes.StatusCodes.BAD_REQUEST
                    , `Failed! role ${req.body.roles[i]} does not exist.`));
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