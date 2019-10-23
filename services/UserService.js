const bcrypt = require('bcrypt');
const MongoLib = require('../lib/MongoLib');

class UserService {
    constructor() {
        this.collection = 'users';
        this.mongoDB = new MongoLib();
    }

    async getUser({ email }) {
        const [user] = await this.mongoDB.getAll(this.collection, { email });
        return user;
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

        const hashedPassword = await bcrypt.hash(password, 10);

        const createdUserId = await this.mongoDB.create(this.collection, {
            name,
            lastName,
            email,
            country,
            password: hashedPassword,
            birthdate,
        });

        return createdUserId;
    }

    async getOrCreateUser({ user }) {
        const queriedUser = await this.getUser({ email: user.email });

        if (queriedUser) {
            return queriedUser;
        }

        await this.createUser({ user });
        return this.getUser({ email: user.email });
    }
}

module.exports = UserService;
