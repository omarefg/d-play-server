const express = require('express');
const passport = require('passport');
const ArtistService = require('../services/ArtistService');

// JWT Strategy
require('../utils/auth/strategies/jwt');


function artistsApi(app) {
    const router = express.Router();
    app.use('/api/artists', router);

    const artistService = new ArtistService();

    router.get(
        '/',
        passport.authenticate('jwt', { session: false }),
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
        passport.authenticate('jwt', { session: false }),
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
        passport.authenticate('jwt', { session: false }),
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
        passport.authenticate('jwt', { session: false }),
        async (req, res, next) => {
            const { id } = req.params;
            try {
                const data = await artistService.getArtistTopTracks(id);
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
        '/artists/{id}/related-artists',
        passport.authenticate('jwt', { session: false }),
        async (req, res, next) => {
            const { id } = req.params;
            try {
                const data = await artistService.getArtistRelatedArtists(id);
                res.status(200).json({
                    data,
                    message: 'artist top tracks',
                });
            } catch (error) {
                next(error);
            }
        },
    );
}

module.exports = artistsApi;
