const ApiError = require("./apiError");
const StatusCodes = require('../utils/statusCodes');

class TokenError extends ApiError {
    constructor(description = 'Token Error') {
        super(StatusCodes.StatusCodes.UNAUTHORIZED, description);
    }
}

module.exports = TokenError;