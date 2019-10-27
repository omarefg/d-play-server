const axios = require('axios');
const SpotifyAuthLib = require('./SpotifyAuthLib');
const { config } = require('../../config');
const { errorHandler } = require('../../utils/spotify/error-handlers');

class SpotifyArtistLib {
    constructor() {
        this.spotifyAuthLib = new SpotifyAuthLib();
    }

    async getMultipleArtists(ids) {
        const accessToken = await this.spotifyAuthLib.getAccessToken();
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
            throw errorHandler(error);
        }
    }

    async getArtistById(id) {
        const accessToken = await this.spotifyAuthLib.getAccessToken();
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
            throw errorHandler(error);
        }
    }

    async getArtistAlbums(id) {
        const accessToken = await this.spotifyAuthLib.getAccessToken();
        const axiosConfig = {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        };
        try {
            const { data } = await axios.get(
                `${config.spotifyApi}/artists/${id}/albums`,
                axiosConfig,
            );
            return data;
        } catch (error) {
            throw errorHandler(error);
        }
    }

    async getArtistTopTracks({ id, market }) {
        const accessToken = await this.spotifyAuthLib.getAccessToken();
        const axiosConfig = {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        };
        try {
            const { data } = await axios.get(
                `${config.spotifyApi}/artists/${id}/top-tracks?market=${market}`,
                axiosConfig,
            );
            return data;
        } catch (error) {
            throw errorHandler(error);
        }
    }

    async getArtistRelatedArtists(id) {
        const accessToken = await this.spotifyAuthLib.getAccessToken();
        const axiosConfig = {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        };
        try {
            const { data } = await axios.get(
                `${config.spotifyApi}/artists/${id}/related-artists`,
                axiosConfig,
            );
            return data;
        } catch (error) {
            throw errorHandler(error);
        }
    }
}

module.exports = SpotifyArtistLib;
