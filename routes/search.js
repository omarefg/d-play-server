const express = require('express');
const SearchService = require('../services/SearchService');
const { config: { nodeEnv } } = require('../config');

const { authorizedHandler } = require('../utils/middlewares/authorized-handler');

const isTest = nodeEnv === 'test';
const authenticate = !isTest ? authorizedHandler : (_req, _res, next) => next();

function searchApi(app) {
    const router = express.Router();
    app.use('/api/search', router);

    const searchService = new SearchService();

    router.get(
        '/',
        authenticate,
        async (req, res, next) => {
            const {
                q, type, limit, offset,
            } = req.query;
            try {
                const data = await searchService.search({
                    q, type, limit, offset,
                });
                res.status(200).json({
                    data,
                    message: 'albums',
                });
            } catch (error) {
                next(error);
            }
        },
    );
}

module.exports = searchApi;
