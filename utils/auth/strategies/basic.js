const passport = require('passport');
const { BasicStrategy } = require('passport-http');
const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');

const UserService = require('../../../services/UserService');

passport.use(
    new BasicStrategy(async (email, password, cb) => {
        const userService = new UserService();
        try {
            const user = await userService.getUser({ email: email.toLowerCase() });
            if (!user) {
                return cb(boom.unauthorized('Tus credenciales no son correctas'), false);
            }

            if (!(await bcrypt.compare(password, user.password))) {
                return cb(boom.unauthorized('Tus credenciales no son correctas'), false);
            }

            if (!user.confirmed) {
                return cb(boom.forbidden('Correo no verificado', false));
            }

            delete user.password;

            return cb(null, user);
        } catch (error) {
            return cb(error);
        }
    }),
);
