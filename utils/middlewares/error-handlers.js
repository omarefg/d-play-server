
const boom = require('@hapi/boom');
const debug = require('debug')('app:error');

const { config } = require('../../config');

function withErrorStack(err, stack) {
    if (config.nodeEnv === 'development') {
        return { ...err, stack };
    }
    return err;
}

function logErrors(err, req, res, next) {
    debug(err);
    next(err);
}

function wrapError(err, req, res, next) {
    if (!err.isBoom) {
        next(boom.badImplementation(err));
    }
    next(err);
}

function errorHandler(err, req, res, next) {
    const { output: { statusCode, payload } } = err;
    res
        .status(statusCode)
        .json(withErrorStack(payload, err.stack));
    next();
}

function notFoundHandler(req, res) {
    const { output: { statusCode, payload } } = boom.notFound();

    res.status(statusCode).json(payload);
}

module.exports = {
    logErrors,
    errorHandler,
    wrapError,
    notFoundHandler,
};
