const Joi = require('joi');
const err = require('../errors');
const StatusCodes = require('../utils/statusCodes');

const REGX_USER_NAME = '^[a-zA-Z0-9]+([_.-])?([a-zA-Z0-9])+$'; 

function validateSignUpData(data) {
    const schema = Joi.object({
        username: Joi.string()
        .regex(RegExp(REGX_USER_NAME))
        .min(5).max(20).trim(true).required(),
        email: Joi.string().email().trim(true).required(),
        password: Joi.string().min(8).trim(true).required(),
        roles: Joi.array().items(Joi.string().trim(true).required()).optional()
    });


    return schema.validate(data);
}

signUpValidationSchema = (req, res, next) => {
    const data = req.body;

    const { error } = validateSignUpData(data);

    if (error) {
        return next(new err.ApiError(StatusCodes.StatusCodes.BAD_REQUEST, error.details[0].message));
    }

    next();
};

module.exports = {
    signUpValidationSchema
};