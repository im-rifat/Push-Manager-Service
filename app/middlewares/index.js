const authJwt = require('./authJwt.middlewares');
const verifySignUp = require('./verifySignUp.middlewares');
const validation = require('./validationSchema.middlewares');
const errorHandler = require('./errorHandler.middlewares');
const authKey = require('./authKey.middlewares');

module.exports = {
    verifySignUp,
    authJwt,
    validation,
    errorHandler,
    authKey
};