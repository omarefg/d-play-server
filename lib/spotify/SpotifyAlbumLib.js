const axios = require('axios');
const SpotifyAuthLib = require('./SpotifyAuthLib');
const { config } = require('../../config');
const { errorHandler } = require('../../utils/spotify/error-handlers');

class SpotifyAlbumLib {
    constructor() {
        this.spotifyAuthLib = new SpotifyAuthLib();
    }

    async getMultipleAlbums(ids) {
        const accessToken = await this.spotifyAuthLib.getAccessToken();
        const axiosConfig = {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        };
        try {
            const { data } = await axios.get(
                `${config.spotifyApi}/albums?ids=${ids}`,
                axiosConfig,
            );
            return data;
        } catch (error) {
            throw errorHandler(error);
        }
    }

    async getAlbumById(id) {
        const accessToken = await this.spotifyAuthLib.getAccessToken();
        const axiosConfig = {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        };
        try {
            const { data } = await axios.get(
                `${config.spotifyApi}/albums/${id}`,
                axiosConfig,
            );
            return data;
        } catch (error) {
            throw errorHandler(error);
        }
    }

    async getAlbumTracks({ limit, offset, id }) {
        const accessToken = await this.spotifyAuthLib.getAccessToken();
        const axiosConfig = {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        };
        try {
            const { data } = await axios.get(
                `${config.spotifyApi}/albums/${id}/tracks?limit=${limit || 20}&offset=${offset || 0}`,
                axiosConfig,
            );
            return data;
        } catch (error) {
            throw errorHandler(error);
        }
    }
}

module.exports = SpotifyAlbumLib;
