const CustomAPIError = require('../errors/custom-errors');
const errorHandler = (err, req, res, next) => {
    if(err instanceof CustomAPIError) {
        return res.status(err.statusCode).json({msg: err.message});
    }

    return res.status(500).send('Something went wrong try again later.');
}

module.exports = errorHandler