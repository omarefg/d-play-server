const axios = require('axios');
const qs = require('querystring');
const { config } = require('../../config');

class SpotifyAuthLib {
    constructor() {
        this._accessToken = '';
        this._instance = null;
    }

    static getInstance() {
        if (!this._instance) {
            this._instance = new SpotifyAuthLib();
        }
        return this._instance;
    }

    async getAccessToken() {
        if (!this._accessToken) {
            const axiosConf = {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                auth: {
                    username: config.spotifyClientId,
                    password: config.spotifyClientSecret,
                },
            };

            const requestBody = {
                grant_type: 'client_credentials',
            };

            try {
                const { data: { access_token: accessToken } } = await axios.post(
                    'https://accounts.spotify.com/api/token',
                    qs.stringify(requestBody),
                    axiosConf,
                );
                this._accessToken = accessToken;
            } catch (error) {
                if (error.response) {
                    throw error.response;
                } if (error.request) {
                    throw error.request;
                }
                throw error;
            }
        }
        return this._accessToken;
    }

    restartAccessToken() {
        this._accessToken = '';
    }
}

module.exports = SpotifyAuthLib;
