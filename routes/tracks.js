const express = require('express');
const passport = require('passport');
const TrackService = require('../services/TrackService');

// JWT Strategy
require('../utils/auth/strategies/jwt');


function tracksApi(app) {
    const router = express.Router();
    app.use('/api/tracks', router);

    const trackService = new TrackService();

    router.get(
        '/',
        passport.authenticate('jwt', { session: false }),
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
        passport.authenticate('jwt', { session: false }),
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
        passport.authenticate('jwt', { session: false }),
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
        passport.authenticate('jwt', { session: false }),
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
        passport.authenticate('jwt', { session: false }),
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
