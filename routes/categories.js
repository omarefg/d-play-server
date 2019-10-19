const express = require('express');
const passport = require('passport');
const CategorieService = require('../services/CategorieService');

// JWT Strategy
require('../utils/auth/strategies/jwt');


function categoriesApi(app) {
    const router = express.Router();
    app.use('/api/categories', router);

    const categorieService = new CategorieService();

    router.get(
        '/',
        passport.authenticate('jwt', { session: false }),
        async (req, res, next) => {
            const { limit, offset, country } = req.query;
            try {
                const data = await categorieService.getAllCategories({ limit, offset, country });
                res.status(200).json({
                    data,
                    message: 'categories',
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
                const data = await categorieService.getCategorieById(id);
                res.status(200).json({
                    data,
                    message: 'categorie',
                });
            } catch (error) {
                next(error);
            }
        },
    );

    router.get(
        '/:id/playlists',
        passport.authenticate('jwt', { session: false }),
        async (req, res, next) => {
            const { id } = req.params;
            const { limit, offset, country } = req.query;
            try {
                const data = await categorieService.getACategoryPlaylists({
                    limit, offset, country, id,
                });
                res.status(200).json({
                    data,
                    message: 'categorie playlists',
                });
            } catch (error) {
                next(error);
            }
        },
    );
}

module.exports = categoriesApi;
