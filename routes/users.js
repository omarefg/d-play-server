const express = require('express');
const passport = require('passport');
const UserService = require('../services/UserService');
const { config: { nodeEnv } } = require('../config');

require('../utils/auth/strategies/jwt');

const isTest = nodeEnv === 'test';
const authenticate = !isTest ? passport.authenticate('jwt', { session: false }) : (_req, _res, next) => next();

function usersApi(app) {
    const router = express.Router();
    app.use('/api/users', router);

    const userService = new UserService();

    router.get(
        '/:id',
        authenticate,
        async (req, res, next) => {
            const { id } = req.params;
            try {
                const data = await userService.getUserById(id);
                delete data.password;
                res.status(200).json({
                    data,
                    message: 'user',
                });
            } catch (error) {
                next(error);
            }
        },
    );
}

module.exports = usersApi;
