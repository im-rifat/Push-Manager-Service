const crypto = require('../utils/crypto');
const db = require('../models');
const error = require('../errors');
const StatusCodes = require('../utils/statusCodes');

const User = db.user;

verifyKey = async (req, res, next) => {
    let key = req.headers['key'];

    console.log(key);

    if(!key) {
        console.log('inside if');
        return next(new error.ApiError(StatusCodes.StatusCodes.UNAUTHORIZED, 'No key provided'));
        consolg.log('after return');
    }

    try {
        let decrpyted = crypto.decrypt(key);
        
        let user = await User.findOne({
            email: decrpyted
        });

        if(!user) {
            return next(new error.ApiError(StatusCodes.StatusCodes.UNAUTHORIZED, 'Not verified'));
        }

        next();
    } catch(err) {
        next(err);
    }

};

module.exports = {
 verifyKey   
};