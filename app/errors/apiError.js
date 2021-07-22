const BaseError = require('./baseError');
const StatusCodes = require('../utils/statusCodes');

class ApiError extends BaseError {
    constructor(name, statusCode = StatusCodes.INTERNAL_SERVER_ERROR
        , isOperational = true, description = 'Internal Server Error') {
        super(name, statusCode, isOperational, description);
    }
}

module.exports = ApiError;