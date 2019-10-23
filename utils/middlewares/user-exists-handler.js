const boom = require('@hapi/boom');
const UserService = require('../../services/UserService');

const userExistHandler = (req, res, next) => {
    const userService = new UserService();
    const { body: { email } } = req;
    userService.getUser({ email })
        .then((user) => {
            if (user) {
                const error = new Error('Ya te encuentras registrado');
                next(boom.conflict(error));
            } else {
                next();
            }
        });
};

module.exports = {
    userExistHandler,
};
