const ApiError = require('./apiError');

class Api404Error extends ApiError {
    constructor(description) {
        super('Not found!', 404, true, description);
    }
}

module.exports = Api404Error;