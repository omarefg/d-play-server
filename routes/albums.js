const express = require('express');
const passport = require('passport');
const AlbumService = require('../services/AlbumService');

// JWT Strategy
require('../utils/auth/strategies/jwt');


function artistsApi(app) {
    const router = express.Router();
    app.use('/api/albums', router);

    const albumService = new AlbumService();

    router.get(
        '/',
        passport.authenticate('jwt', { session: false }),
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
        passport.authenticate('jwt', { session: false }),
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
        passport.authenticate('jwt', { session: false }),
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

module.exports = artistsApi;
