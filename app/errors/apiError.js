const BaseError = require('./baseError');

class ApiError extends BaseError {
    constructor(name, statusCode = 500, isOperational = true, description = 'Internal Server Error') {
        super(name, statusCode, isOperational, description);
    }
}

module.exports = ApiError;