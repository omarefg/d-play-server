const express = require('express');
const passport = require('passport');
const RecommendationService = require('../services/RecommendationService');

// JWT Strategy
require('../utils/auth/strategies/jwt');


function recommendationsApi(app) {
    const router = express.Router();
    app.use('/api/recommendations', router);

    const recommendationService = new RecommendationService();

    router.get(
        '/',
        passport.authenticate('jwt', { session: false }),
        async (req, res, next) => {
            const {
                artists, genres, tracks, limit,
            } = req.query;
            try {
                const data = await recommendationService.getRecommendations({
                    artists, genres, tracks, limit,
                });
                res.status(200).json({
                    data,
                    message: 'recommendations',
                });
            } catch (error) {
                next(error);
            }
        },
    );

    router.get(
        '/available-genre-seeds',
        passport.authenticate('jwt', { session: false }),
        async (req, res, next) => {
            try {
                const data = await recommendationService.getRecommendationGenres();
                res.status(200).json({
                    data,
                    message: 'recommendation genres',
                });
            } catch (error) {
                next(error);
            }
        },
    );

    router.get(
        '/new-releases',
        passport.authenticate('jwt', { session: false }),
        async (req, res, next) => {
            const { limit, offset, country } = req.query;
            try {
                const data = await recommendationService.getNewReleases({ limit, offset, country });
                res.status(200).json({
                    data,
                    message: 'new releases',
                });
            } catch (error) {
                next(error);
            }
        },
    );

    router.get(
        '/featured-playlists',
        passport.authenticate('jwt', { session: false }),
        async (req, res, next) => {
            const { limit, offset, country } = req.query;
            try {
                const data = await recommendationService.getFeaturedPlaylists({
                    limit, offset, country,
                });
                res.status(200).json({
                    data,
                    message: 'featured playlists',
                });
            } catch (error) {
                next(error);
            }
        },
    );
}

module.exports = recommendationsApi;