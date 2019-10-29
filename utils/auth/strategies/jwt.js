const passport = require('passport');
const { Strategy, ExtractJwt } = require('passport-jwt');
const { config } = require('../../../config');

passport.use(
    new Strategy(
        {
            secretOrKey: config.authJwtSecret,
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        },
        async (tokenPayload, cb) => cb(null, tokenPayload),
    ),
);
