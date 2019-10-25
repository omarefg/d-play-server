const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const MongoLib = require('../lib/MongoLib');
const EmailService = require('./EmailService');
const { config } = require('../config');

const { clientUrl, emailSecret } = config;
class UserService {
    constructor() {
        this.collection = 'users';
        this.mongoDB = new MongoLib();
        this.emailService = new EmailService();
    }

    async getUser({ email }) {
        try {
            const [user] = await this.mongoDB.getAll(this.collection, { email });
            return user;
        } catch (error) {
            throw new Error(error);
        }
    }

    async createUser({ user }) {
        const {
            name,
            email,
            password,
            birthdate,
            lastName,
            country,
        } = user;

        try {
            await this.emailService.sendRegistrationEmail(email);

            const hashedPassword = await bcrypt.hash(password, 10);

            const createdUserId = await this.mongoDB.create(this.collection, {
                name,
                lastName,
                email,
                country,
                password: hashedPassword,
                birthdate,
                confirmed: false,
            });

            return createdUserId;
        } catch (error) {
            if (error.isBoom) {
                throw error;
            }
            throw new Error(error);
        }
    }

    async updateUser({ id, ...data }) {
        const updatedUserId = await this.mongoDB.update(this.collection, id, data);
        return updatedUserId || {};
    }

    async confirmRegisteredUser(token) {
        try {
            const { email } = jwt.verify(token, emailSecret);
            const user = await this.getUser({ email });
            if (!user.isConfirmed) {
                const { _id: id } = user;
                await this.updateUser({ id, confirmed: true });
            }
            return `${clientUrl}/inicia-sesion`;
        } catch (error) {
            throw new Error(error);
        }
    }
}

module.exports = UserService;
