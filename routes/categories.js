const express = require('express');
const passport = require('passport');
const CategorieService = require('../services/CategorieService');
const { config: { nodeEnv } } = require('../config');

require('../utils/auth/strategies/jwt');

const isTest = nodeEnv === 'test';
const authenticate = !isTest ? passport.authenticate('jwt', { session: false }) : (_req, _res, next) => next();

function categoriesApi(app) {
    const router = express.Router();
    app.use('/api/categories', router);

    const categorieService = new CategorieService();

    router.get(
        '/',
        authenticate,
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
        authenticate,
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
        authenticate,
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
