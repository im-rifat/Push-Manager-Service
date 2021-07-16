const authJwt = require('./authJwt');
const verifySignUp = require('./verifySignUp');
const validation = require('./validationSchema');

module.exports = {
    verifySignUp,
    authJwt,
    validation
};