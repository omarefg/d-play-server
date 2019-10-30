const passport = require('passport');
const boom = require('@hapi/boom');

const UserService = require('../../services/UserService');

require('../auth/strategies/jwt');

function authorizedHandler(req, res, next) {
    passport.authenticate('jwt', { session: false }, async (error, token) => {
        if (error || !token) {
            next(boom.unauthorized('Tu sesión venció'));
        }
        const userService = new UserService();
        try {
            const user = await userService.getUser({
                email: token.email,
            });


            if (!user) {
                next(boom.unauthorized('Tu sesión venció'));
            }
        } catch (err) {
            next(err);
        }
        next();
    })(req, res, next);
}

module.exports = {
    authorizedHandler,
};
