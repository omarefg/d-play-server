const express = require('express')
const passport = require('passport')
const boom = require('@hapi/boom')
const jwt = require('jsonwebtoken')
const { config } = require('../config')
const UserService = require('../services/UserService')
const validationHandler = require('../utils/middlewares/validation-handler')
const { createUserSchema } = require('../utils/schemas/')

// Basic Strategy
require('../utils/auth/strategies/basic')

function authApi(app) {
    const router = express.Router()
    app.use('/api/auth', router)

    const userService = new UserService()

    router.post('/sign-in', async (req, res, next) => {
        passport.authenticate('basic', (error, user) => {
            try {
                if (error || !user) {
                    next(boom.unauthorized())
                }

                req.login(user, { session: false }, async error => {
                    if (error) {
                        next(error)
                    }

                    const { _id: id, name, email } = user

                    const payload = {
                        sub: id,
                        name,
                        email,
                    }

                    const token = jwt.sign(payload, config.authJwtSecret, {
                        expiresIn: '15m'
                    })

                    return res.status(200).json({
                        token,
                        user: { id, name, email }
                    })
                })
            } catch (error) {
                next(error)
            }
        })(req, res, next)
    })

    router.post(
        '/sign-up',
        validationHandler(createUserSchema),
        async (req, res, next) => {
            const { body: user } = req
            try {
                const createdUserId = await userService.createUser({ user })
                res.status(201).json({
                    data: createdUserId,
                    message: 'user created'
                })
            } catch (error) {
                next(error)
            }
        }
    )
}

module.exports = authApi
