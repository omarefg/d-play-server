const axios = require('axios');
const SpotifyAuth = require('./SpotifyAuth');
const { config } = require('../../config');

class SpotifyRecommendation {
    constructor() {
        this.spotifyAuth = new SpotifyAuth();
    }

    async getRecommendations({
        artists, genres, tracks, limit,
    }) {
        const accessToken = await this.spotifyAuth.getAccessToken();
        const axiosConfig = {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        };
        try {
            const { data } = await axios.get(
                `${config.spotifyApi}/recommendations?limit=${limit || 20}&seed_artists=${artists}&seed_genres=${genres}&seed_tracks=${tracks}`,
                axiosConfig,
            );
            return data;
        } catch (error) {
            throw new Error(error);
        }
    }
}

module.exports = SpotifyRecommendation;
