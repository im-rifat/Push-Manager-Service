const ApiError = require('./apiError');
const StatusCodes = require('../utils/statusCodes');

class Api404Error extends ApiError {
    constructor(description) {
        super(StatusCodes.StatusCodes.NOT_FOUND, description);
    }
}

module.exports = Api404Error;