const express = require('express');
const passport = require('passport');
const RecommendationService = require('../services/RecommendationService');
const { config: { nodeEnv } } = require('../config');

const cacheResponse = require('../utils/cache-response');
const { FIVE_MINUTES_IN_SECONDS, SIXTY_MINUTES_IN_SECONDS } = require('../utils/time');

require('../utils/auth/strategies/jwt');

const isTest = nodeEnv === 'test';
const authenticate = !isTest ? passport.authenticate('jwt', { session: false }) : (_req, _res, next) => next();

function recommendationsApi(app) {
    const router = express.Router();
    app.use('/api/recommendations', router);

    const recommendationService = new RecommendationService();

    router.get(
        '/',
        authenticate,
        async (req, res, next) => {
            const {
                artists, genres, tracks, limit,
            } = req.query;
            try {
                const data = await recommendationService.getRecommendations({
                    artists, genres, tracks, limit,
                });
                cacheResponse(res, FIVE_MINUTES_IN_SECONDS);
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
        authenticate,
        async (req, res, next) => {
            try {
                const data = await recommendationService.getRecommendationGenres();
                cacheResponse(res, SIXTY_MINUTES_IN_SECONDS);
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
        authenticate,
        async (req, res, next) => {
            const { limit, offset, country } = req.query;
            try {
                const data = await recommendationService.getNewReleases({ limit, offset, country });
                cacheResponse(res, FIVE_MINUTES_IN_SECONDS);
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
        authenticate,
        async (req, res, next) => {
            const { limit, offset, country } = req.query;
            try {
                const data = await recommendationService.getFeaturedPlaylists({
                    limit, offset, country,
                });
                cacheResponse(res, FIVE_MINUTES_IN_SECONDS);
                res.status(200).json({
                    data,
                    message: 'featured playlists',
                });
            } catch (error) {
                next(error);
            }
        },
    );

    router.get(
        '/recommendation-page',
        authenticate,
        async (req, res, next) => {
            const { country } = req.query;
            try {
                const data = await recommendationService.getRecommendationPageData({ country });
                cacheResponse(res, FIVE_MINUTES_IN_SECONDS);
                res.status(200).json({
                    data,
                    message: 'recommendation-page',
                });
            } catch (error) {
                next(error);
            }
        },
    );

    router.get(
        '/playlists/:id/tracks',
        authenticate,
        async (req, res, next) => {
            const { id } = req.params;
            const { limit, offset } = req.query;
            try {
                const data = await recommendationService.getPlaylistTracks({ limit, offset, id });
                cacheResponse(res, SIXTY_MINUTES_IN_SECONDS);
                res.status(200).json({
                    data,
                    message: 'playlist tracks',
                });
            } catch (error) {
                next(error);
            }
        },
    );
}

module.exports = recommendationsApi;
