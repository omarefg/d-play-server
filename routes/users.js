const express = require('express');
const UserService = require('../services/UserService');
const { config: { nodeEnv } } = require('../config');

const { authorizedHandler } = require('../utils/middlewares/authorized-handler');

const isTest = nodeEnv === 'test';
const authenticate = !isTest ? authorizedHandler : (_req, _res, next) => next();

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
