const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const boom = require('@hapi/boom');
const UserService = require('../services/UserService');
const EmailService = require('../services/EmailService');

const {
    config: {
        nodeEnv, emailSecret, clientUrl,
    },
} = require('../config');

const { authorizedHandler } = require('../utils/middlewares/authorized-handler');

const isTest = nodeEnv === 'test';
const authenticate = !isTest ? authorizedHandler : (_req, _res, next) => next();

function usersApi(app) {
    const router = express.Router();
    app.use('/api/users', router);

    const userService = new UserService();
    const emailService = new EmailService();

    router.get(
        '/:id',
        authenticate,
        async (req, res, next) => {
            const { id } = req.params;
            try {
                const data = await userService.getUserById(id);
                if (data) {
                    delete data.password;
                }
                res.status(200).json({
                    data,
                    message: 'user',
                });
            } catch (error) {
                next(error);
            }
        },
    );

    router.put(
        '/:id',
        authenticate,
        async (req, res, next) => {
            const { id } = req.params;
            const { body: user } = req;
            try {
                const data = await userService.updateUser({ id, ...user });
                res.status(200).json({
                    data,
                    message: 'user updated',
                });
            } catch (error) {
                next(error);
            }
        },
    );

    router.get(
        '/:id/update-email/:email',
        authenticate,
        async (req, res, next) => {
            const { id, email } = req.params;
            try {
                await emailService.sendChangeEmail(email, id);
                res.status(200).json({ message: 'email sent' });
            } catch (error) {
                next(error);
            }
        },
    );

    router.get('/change-email/:token', async (req, res, next) => {
        try {
            const { token } = req.params;
            const { email, id } = jwt.verify(token, emailSecret);
            await userService.updateUser({ email, id });
            res.redirect(`${clientUrl}/server/auth/sign-out`);
        } catch (error) {
            next(error);
        }
    });

    router.put(
        '/:id/update-password',
        authenticate,
        async (req, res, next) => {
            const { id } = req.params;
            const { oldP, newP } = req.body;
            try {
                const user = await userService.getUserById(id);
                if (!(await bcrypt.compare(oldP, user.password))) {
                    next(boom.badRequest('Tus credenciales no son correctas'), false);
                    return;
                }
                const password = await bcrypt.hash(newP, 10);
                await userService.updateUser({ password, id });
                res.status(200).send();
            } catch (error) {
                next(error);
            }
        },
    );
}

module.exports = usersApi;
