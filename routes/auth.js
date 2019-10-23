const express = require('express');
const passport = require('passport');
const boom = require('@hapi/boom');
const jwt = require('jsonwebtoken');
const { config } = require('../config');
const UserService = require('../services/UserService');
const validationHandler = require('../utils/middlewares/validation-handler');
const { userExistHandler } = require('../utils/middlewares/user-exists-handler');
const { userSchema } = require('../utils/schemas/');

// Basic Strategy
require('../utils/auth/strategies/basic');

function authApi(app) {
    const router = express.Router();
    app.use('/api/auth', router);

    const userService = new UserService();

    router.post('/sign-in', async (req, res, next) => {
        passport.authenticate('basic', (error, user) => {
            try {
                if (error || !user) {
                    next(boom.unauthorized());
                }

                req.login(user, { session: false }, async (cbError) => {
                    if (cbError) {
                        next(cbError);
                    }

                    const { _id: id, name, email } = user;

                    const payload = {
                        sub: id,
                        name,
                        email,
                    };

                    const token = jwt.sign(payload, config.authJwtSecret, {
                        expiresIn: '15m',
                    });

                    return res.status(200).json({
                        token,
                        user: { id, name, email },
                    });
                });
            } catch (err) {
                next(err);
            }
        })(req, res, next);
    });

    router.post(
        '/sign-up',
        validationHandler(userSchema),
        userExistHandler,
        async (req, res, next) => {
            const { body: user } = req;
            try {
                const createdUserId = await userService.createUser({ user });
                res.status(201).json({
                    data: createdUserId,
                    message: 'user created',
                });
            } catch (error) {
                next(error);
            }
        },
    );

    // router.get('/confirmation/:token', async (req, res, next) => {

    // });
}

module.exports = authApi;
