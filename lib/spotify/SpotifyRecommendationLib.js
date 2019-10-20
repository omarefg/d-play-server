const axios = require('axios');
const SpotifyAuthLib = require('./SpotifyAuthLib');
const { config } = require('../../config');

class SpotifyRecommendationLib {
    constructor() {
        this.spotifyAuthLib = new SpotifyAuthLib();
    }

    async getRecommendations({
        artists, genres, tracks, limit,
    }) {
        const accessToken = await this.spotifyAuthLib.getAccessToken();
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

    async getRecommendationGenres() {
        const accessToken = await this.spotifyAuthLib.getAccessToken();
        const axiosConfig = {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        };
        try {
            const { data } = await axios.get(
                `${config.spotifyApi}/recommendations/available-genre-seeds`,
                axiosConfig,
            );
            return data;
        } catch (error) {
            throw new Error(error);
        }
    }

    async getNewReleases({ limit, offset, country }) {
        const accessToken = await this.spotifyAuthLib.getAccessToken();
        const axiosConfig = {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        };
        try {
            const { data } = await axios.get(
                `${config.spotifyApi}/browse/new-releases?${country ? `country=${country}` : ''}&offset=${offset || 0}&limit=${limit || 20}`,
                axiosConfig,
            );
            return data;
        } catch (error) {
            throw new Error(error);
        }
    }

    async getFeaturedPlaylists({ limit, offset, country }) {
        const accessToken = await this.spotifyAuthLib.getAccessToken();
        const axiosConfig = {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        };
        try {
            const { data } = await axios.get(
                `${config.spotifyApi}/browse/featured-playlists?${country ? `country=${country}` : ''}&offset=${offset || 0}&limit=${limit || 20}`,
                axiosConfig,
            );
            return data;
        } catch (error) {
            throw new Error(error);
        }
    }
}

module.exports = SpotifyRecommendationLib;
