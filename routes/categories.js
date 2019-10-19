const express = require('express');
const passport = require('passport');
const CategorieService = require('../services/CategorieService');

// JWT Strategy
require('../utils/auth/strategies/jwt');


function categorieApi(app) {
    const router = express.Router();
    app.use('/api/categories', router);

    const categorieService = new CategorieService();

    router.get(
        '/',
        passport.authenticate('jwt', { session: false }),
        async (req, res, next) => {
            try {
                const data = await categorieService.getAllCategories();
                res.status(200).json({
                    data,
                    message: 'categories',
                });
            } catch (error) {
                next(error);
            }
        },
    );
}

module.exports = categorieApi;
