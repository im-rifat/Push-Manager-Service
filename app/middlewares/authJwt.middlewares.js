const {verify} = require('../utils/token');
const authConfig = require('../configs/auth.config');
const db = require('../models');
const StatusCodes = require('../utils/statusCodes');
const error = require('../errors');

const User = db.user;
const Role = db.role;

verifyToken = async (req, res, next) => {
    let token = req.headers['x-access-token'];

    if (!token) {
        return next(new error.ApiError(StatusCodes.StatusCodes.UNAUTHORIZED, 'No token provided'));
    }

    try {
        let decoded = await verify(token, authConfig.secretKey);

        req.userId = decoded.id;

        next();
    } catch(err) {
        next(new error.ApiError(StatusCodes.StatusCodes.UNAUTHORIZED, err.message));
    }
};

isAdmin = async (req, res, next) => {
    let user;

    try {
        user = User.findById(req.userId);

        if(!user) {
            return next(new error.Api404Error('User not found'));
        }

        let roles = await Role.find({
            _id: {$in: user.roles}
        });

        for (let i = 0; i < roles.length; i++) {
            if (roles[i].name == 'admin') {
                next();
                return;
            }
        }

        next(new error.ApiError(StatusCodes.StatusCodes.UNAUTHORIZED, 'Admin role required'));

    } catch(err) {
        next(err);
    }
};

isModerator = async (req, res, next) => {
    let user;

    try {
        user = User.findById(req.userId);

        if(!user) {
            return next(new error.Api404Error('User not found'));
        }

        let roles = await Role.find({
            _id: {$in: user.roles}
        });

        for (let i = 0; i < roles.length; i++) {
            if (roles[i].name == 'moderator') {
                next();
                return;
            }
        }

        next(new error.ApiError(StatusCodes.StatusCodes.UNAUTHORIZED, 'Moderator role required'));

    } catch(err) {
        next(err);
    }
};

const authJwt = {
    verifyToken,
    isAdmin,
    isModerator
};

module.exports = authJwt;