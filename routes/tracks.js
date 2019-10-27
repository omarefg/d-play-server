const express = require('express');
const passport = require('passport');
const TrackService = require('../services/TrackService');
const { config: { nodeEnv } } = require('../config');

require('../utils/auth/strategies/jwt');

const isTest = nodeEnv === 'test';
const authenticate = !isTest ? passport.authenticate('jwt', { session: false }) : (_req, _res, next) => next();

function tracksApi(app) {
    const router = express.Router();
    app.use('/api/tracks', router);

    const trackService = new TrackService();

    router.get(
        '/',
        authenticate,
        async (req, res, next) => {
            const { ids } = req.query;
            try {
                const data = await trackService.getMultipleTracks(ids);
                res.status(200).json({
                    data,
                    message: 'tracks',
                });
            } catch (error) {
                next(error);
            }
        },
    );

    router.get(
        '/:id',
        authenticate,
        async (req, res, next) => {
            const { id } = req.params;
            try {
                const data = await trackService.getTrackById(id);
                res.status(200).json({
                    data,
                    message: 'track',
                });
            } catch (error) {
                next(error);
            }
        },
    );

    router.get(
        '/audio-features',
        authenticate,
        async (req, res, next) => {
            const { ids } = req.query;
            try {
                const data = await trackService.getMultipleTracksFeatures(ids);
                res.status(200).json({
                    data,
                    message: 'track features',
                });
            } catch (error) {
                next(error);
            }
        },
    );

    router.get(
        '/audio-features/:id',
        authenticate,
        async (req, res, next) => {
            const { id } = req.params;
            try {
                const data = await trackService.getTrackFeatures(id);
                res.status(200).json({
                    data,
                    message: 'track features',
                });
            } catch (error) {
                next(error);
            }
        },
    );

    router.get(
        '/audio-analysis/:id',
        authenticate,
        async (req, res, next) => {
            const { id } = req.params;
            try {
                const data = await trackService.getTrackAnalysis(id);
                res.status(200).json({
                    data,
                    message: 'track analysis',
                });
            } catch (error) {
                next(error);
            }
        },
    );
}

module.exports = tracksApi;
