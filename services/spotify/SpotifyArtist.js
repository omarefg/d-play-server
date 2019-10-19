const axios = require('axios');
const SpotifyAuth = require('./SpotifyAuth');
const { config } = require('../../config');

class SpotifyArtist {
    constructor() {
        this.spotifyAuth = new SpotifyAuth();
    }

    async getMultipleArtists(ids) {
        const accessToken = await this.spotifyAuth.getAccessToken();
        const axiosConfig = {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        };
        try {
            const { data } = await axios.get(
                `${config.spotifyApi}/artists?ids=${ids}`,
                axiosConfig,
            );
            return data;
        } catch (error) {
            throw new Error(error);
        }
    }

    async getArtistById(id) {
        const accessToken = await this.spotifyAuth.getAccessToken();
        const axiosConfig = {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        };
        try {
            const { data } = await axios.get(
                `${config.spotifyApi}/artists/${id}`,
                axiosConfig,
            );
            return data;
        } catch (error) {
            throw new Error(error);
        }
    }
}

module.exports = SpotifyArtist;
