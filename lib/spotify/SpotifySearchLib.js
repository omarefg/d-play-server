const axios = require('axios');
const SpotifyAuthLib = require('./SpotifyAuthLib');
const { config } = require('../../config');

class SpotifySearchLib {
    constructor() {
        this.spotifyAuthLib = new SpotifyAuthLib();
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
            throw new Error(error);
        }
    }
}

module.exports = SpotifySearchLib;