const db = require('../models');
const StatusCodes = require('../utils/statusCodes');

createDevice = (req, res, next) => {
    res.status(StatusCodes.StatusCodes.NOT_IMPLEMENTED).send({message: 'Not implemented yet'});
};

module.exports = {
    createDevice
};