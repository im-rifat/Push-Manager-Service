class BaseError extends Error {
    constructor(statusCode, name, description, isOperational) {
        super(description);

        Object.setPrototypeOf(this, new.target.prototype);

        this.name = name;
        this.statusCode = statusCode;
        this.isOperational = isOperational;

        Error.captureStackTrace(this);
    }
}

module.exports = BaseError;