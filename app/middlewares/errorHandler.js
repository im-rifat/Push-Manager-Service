errorHandler = (err, req, res, next) => {
    if(res.headersSent) {
        return next(err);
    }

    return res.status(err.statusCode || 500).send({
        error: {
            code: err.statusCode || 500,
            message: err.message || 'Internal Server Error'
        }
    });
};

module.exports = errorHandler;