const express = require('express');
const passport = require('passport');
const AlbumService = require('../services/AlbumService');
const { config: { nodeEnv } } = require('../config');

require('../utils/auth/strategies/jwt');

const isTest = nodeEnv === 'test';
const authenticate = !isTest ? passport.authenticate('jwt', { session: false }) : (_req, _res, next) => next();


function albumsApi(app) {
    const router = express.Router();
    app.use('/api/albums', router);

    const albumService = new AlbumService();

    router.get(
        '/',
        authenticate,
        async (req, res, next) => {
            const { ids } = req.query;
            try {
                const data = await albumService.getMultipleAlbums(ids);
                res.status(200).json({
                    data,
                    message: 'albums',
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
                const data = await albumService.getAlbumById(id);
                res.status(200).json({
                    data,
                    message: 'album',
                });
            } catch (error) {
                next(error);
            }
        },
    );

    router.get(
        '/:id/tracks',
        authenticate,
        async (req, res, next) => {
            const { id } = req.params;
            const { limit, offset } = req.query;
            try {
                const data = await albumService.getAlbumTracks({ limit, offset, id });
                res.status(200).json({
                    data,
                    message: 'album tracks',
                });
            } catch (error) {
                next(error);
            }
        },
    );
}

module.exports = albumsApi;
