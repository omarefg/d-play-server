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

    async getUserById(id) {
        try {
            const user = await this.mongoDB.get(this.collection, id);
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
                lists: [{
                    name: 'Favoritas',
                    description: '',
                    image: `https://picsum.photos/200?t=${Date.now()}`,
                    items: [],
                }],
                profilePic: 'data:image/svg+xml;base64,PHN2ZwogICAgaWQ9IlNvbGlkIgogICAgaGVpZ2h0PSI1MTIiCiAgICB2aWV3Qm94PSIwIDAgNjQgNjQiCiAgICB3aWR0aD0iNTEyIgogICAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogICAgZmlsbD0iI2ZmZiIKPgogICAgPHBhdGgKICAgICAgICBkPSJtMTEgNDkuNTI5djEyLjQ3MWg1LjUxN2MtMS40NjEtNC4xOTEuNTctOC4xMzggMS40ODMtOS42di0xMS4wNDVsLTEuODI3LjY5MWE4IDggMCAwIDAgLTUuMTczIDcuNDgzeiIKICAgIC8+CiAgICA8cGF0aAogICAgICAgIGQ9Im0zMiAzOGExMC44NjcgMTAuODY3IDAgMCAxIC01LjIxLTEuNTRjMCAuMDE0LS4wMTYuMDIxLS4wMjIuMDM0YTQuMDQ0IDQuMDQ0IDAgMCAxIC0uNzY4IDEuMzI5djEwLjE3N2E2IDYgMCAwIDAgMTIgMHYtMTAuMTc3YTQuMDU5IDQuMDU5IDAgMCAxIC0uNzY3LTEuMzIzYy0uMDA2LS4wMTQtLjAyLS4wMjQtLjAyNS0uMDM4YTEwLjg2NyAxMC44NjcgMCAwIDEgLTUuMjA4IDEuNTM4eiIKICAgIC8+CiAgICA8cGF0aAogICAgICAgIGQ9Im00Ny44MjcgNDIuMDQ2LTEuODI3LS42OTF2MTEuMDQ1Yy45MTMgMS40NjYgMi45NDQgNS40MTMgMS40ODMgOS42aDUuNTE3di0xMi40NzFhOCA4IDAgMCAwIC01LjE3My03LjQ4M3oiCiAgICAvPgogICAgPHBhdGgKICAgICAgICBkPSJtMjkuNjI3IDI4LjIyMS0xLjI1NCAxLjU1OGE1Ljk3NCA1Ljk3NCAwIDAgMCA3LjI1NCAwbC0xLjI1NC0xLjU1OGE0LjAxOCA0LjAxOCAwIDAgMSAtNC43NDYgMHoiCiAgICAvPgogICAgPHBhdGgKICAgICAgICBkPSJtNDQgNDAuNi00LTEuNTEydjguOTEyYTggOCAwIDAgMSAtMTYgMHYtOC45MTJsLTQgMS41MTJ2MTIuNHMtMy4zOTIgNC41MzEtMS4zMjggOWgyNi42NTZjMi4wNjQtNC40NjktMS4zMjgtOS0xLjMyOC05eiIKICAgIC8+CiAgICA8cGF0aAogICAgICAgIGQ9Im0xMiAzNi41di03YTEgMSAwIDAgMCAtLjM1NC0uNzYzIDEuMDA5IDEuMDA5IDAgMCAwIC0uODEtLjIyM2wtNiAxYTEgMSAwIDAgMCAtLjgzNi45ODZ2NWEyIDIgMCAxIDAgMiAydi02LjE1M2w0LS42NjZ2My44MTlhMiAyIDAgMSAwIDIgMnoiCiAgICAvPgogICAgPHBhdGgKICAgICAgICBkPSJtNjAuMjQyIDUuOTctLjQ4NC0xLjk0LTQgMWExIDEgMCAwIDAgLS43NDguODI4bC0uNzM5IDUuMTY5YTIgMiAwIDEgMCAxLjcxNSAyLjExNGwuOTE0LTYuMzM0eiIKICAgIC8+CiAgICA8cGF0aAogICAgICAgIGQ9Im03IDE3aDJ2LTJoMnYtMmgtMnYtMmgtMnYyaC0ydjJoMnoiCiAgICAvPgogICAgPHBhdGgKICAgICAgICBkPSJtNjAgMzJ2LTJoLTJ2MmgtMnYyaDJ2Mmgydi0yaDJ2LTJ6IgogICAgLz4KICAgIDxwYXRoCiAgICAgICAgZD0ibTE4IDI2aDJ2Ni44OGE0LjA4NSA0LjA4NSAwIDAgMSAtMS4yMSAyLjkxIDYuMTI2IDYuMTI2IDAgMCAwIC0xLjc2NCAzLjhsNi42MjQtMi41YTIuMDE0IDIuMDE0IDAgMCAwIDEuMzUtMS44OTl2LTIuNTMzYzIuMTg1IDIuMDY1IDQuODY5IDMuMzQyIDcgMy4zNDJzNC44MTUtMS4yNzcgNy0zLjM0MnYyLjUzM2EyLjAwNSAyLjAwNSAwIDAgMCAxLjMyMSAxLjg4MWw2LjY1MyAyLjUxM2E2LjEyNiA2LjEyNiAwIDAgMCAtMS43NjQtMy44IDQuMDg1IDQuMDg1IDAgMCAxIC0xLjIxLTIuOTA1di02Ljg4aDJhMiAyIDAgMCAwIDItMnYtNWEyIDIgMCAwIDAgLTItMnYtMWExNCAxNCAwIDAgMCAtMjggMHYxYTIgMiAwIDAgMCAtMiAydjVhMiAyIDAgMCAwIDIgMnptMTQgOGMtMy4yMTYgMC04LjQxOS00LjEyMi04Ljk0Ny05aDUuMzQxYTEuOCAxLjggMCAwIDAgMS4xMS0uMzkybDIuNDk2LTEuOTQxIDIuNSAxLjk0MWExLjggMS44IDAgMCAwIDEuMTEuMzkyaDUuMzQxYy0uNTMyIDQuODc4LTUuNzM1IDktOC45NTEgOXptLTQuMjA5LTE2YTE3Ljk3NCAxNy45NzQgMCAwIDAgNy4yMDktNCAxOC4wODQgMTguMDg0IDAgMCAwIDQuNDA4IDR6bS03Ljc5MS0yYTEyIDEyIDAgMCAxIDI0IDB2MmMwLTYuMDYtNS45NC0xMi0xMi0xMnMtMTIgNS45NC0xMiAxMnoiCiAgICAvPgo8L3N2Zz4=',
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
