const axios = require('axios');
const SpotifyAuthLib = require('./SpotifyAuthLib');
const { config } = require('../../config');
const { errorHandler } = require('../../utils/spotify/error-handlers');

class SpotifySearchLib {
    constructor() {
        this.spotifyAuthLib = SpotifyAuthLib.getInstance();
    }

    async search({
        q, type, limit, offset,
    }) {
        const accessToken = await this.spotifyAuthLib.getAccessToken();
        const axiosConfig = {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        };
        try {
            const { data } = await axios.get(
                `${config.spotifyApi}/search?q=${q}&type=${type}&limit=${limit || 20}&offset=${offset || 0}`,
                axiosConfig,
            );
            return data;
        } catch (error) {
            throw errorHandler(error);
        }
    }
}

module.exports = SpotifySearchLib;
