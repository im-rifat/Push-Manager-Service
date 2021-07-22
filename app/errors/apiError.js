const BaseError = require('./baseError');
const StatusCodes = require('../utils/statusCodes');

class ApiError extends BaseError {
    constructor(statusCode = StatusCodes.StatusCodes.INTERNAL_SERVER_ERROR
        , description = 'Internal Server Error', isOperational = true) {
        super(statusCode, StatusCodes.getReasonPhrase(statusCode), description, isOperational);
    }
}

module.exports = ApiError;