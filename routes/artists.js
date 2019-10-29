const express = require('express');
const ArtistService = require('../services/ArtistService');
const { config: { nodeEnv } } = require('../config');

const { authorizedHandler } = require('../utils/middlewares/authorized-handler');

const isTest = nodeEnv === 'test';
const authenticate = !isTest ? authorizedHandler : (_req, _res, next) => next();


function artistsApi(app) {
    const router = express.Router();
    app.use('/api/artists', router);

    const artistService = new ArtistService();

    router.get(
        '/',
        authenticate,
        async (req, res, next) => {
            const { ids } = req.query;
            try {
                const data = await artistService.getMultipleArtists(ids);
                res.status(200).json({
                    data,
                    message: 'artists',
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
                const data = await artistService.getArtistById(id);
                res.status(200).json({
                    data,
                    message: 'artist',
                });
            } catch (error) {
                next(error);
            }
        },
    );

    router.get(
        '/:id/albums',
        authenticate,
        async (req, res, next) => {
            const { id } = req.params;
            try {
                const data = await artistService.getArtistAlbums(id);
                res.status(200).json({
                    data,
                    message: 'artist albums',
                });
            } catch (error) {
                next(error);
            }
        },
    );

    router.get(
        '/:id/top-tracks',
        authenticate,
        async (req, res, next) => {
            const { id } = req.params;
            const { market } = req.query;
            try {
                const data = await artistService.getArtistTopTracks({ id, market });
                res.status(200).json({
                    data,
                    message: 'artist top tracks',
                });
            } catch (error) {
                next(error);
            }
        },
    );

    router.get(
        '/:id/related-artists',
        authenticate,
        async (req, res, next) => {
            const { id } = req.params;
            try {
                const data = await artistService.getArtistRelatedArtists(id);
                res.status(200).json({
                    data,
                    message: 'artist related artists',
                });
            } catch (error) {
                next(error);
            }
        },
    );
}

module.exports = artistsApi;
