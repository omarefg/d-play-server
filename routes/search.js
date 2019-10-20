const express = require('express');
const passport = require('passport');
const SearchService = require('../services/SearchService');

// JWT Strategy
require('../utils/auth/strategies/jwt');


function searchApi(app) {
    const router = express.Router();
    app.use('/api/search', router);

    const searchService = new SearchService();

    router.get(
        '/',
        passport.authenticate('jwt', { session: false }),
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
