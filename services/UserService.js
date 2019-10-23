const bcrypt = require('bcrypt');
const MongoLib = require('../lib/MongoLib');
const { sendRegistrationEmail } = require('../utils/email');

class UserService {
    constructor() {
        this.collection = 'users';
        this.mongoDB = new MongoLib();
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

            await sendRegistrationEmail(email);

            return createdUserId;
        } catch (error) {
            throw new Error(error);
        }
    }
}

module.exports = UserService;
