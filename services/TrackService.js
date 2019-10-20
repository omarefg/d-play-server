const SpotifyTrackLib = require('../lib/spotify/SpotifyTrackLib');
const { tokenExpiredHandler } = require('../utils/spotify/error-handlers');

class TrackService {
    constructor() {
        this.spotifyTrackLib = new SpotifyTrackLib();
    }

    async getTrackFeatures(id) {
        let recommendations = null;
        try {
            recommendations = await this.spotifyTrackLib.getTrackFeatures(id);
        } catch (error) {
            const { status } = error;
            if (status === 401) {
                const cb = () => this.spotifyTrackLib.getTrackFeatures(id);
                recommendations = await tokenExpiredHandler(cb);
            } else {
                throw new Error(error);
            }
        }
        return recommendations;
    }

    async getMultipleTracksFeatures(ids) {
        let recommendations = null;
        try {
            recommendations = await this.spotifyTrackLib.getMultipleTracksFeatures(ids);
        } catch (error) {
            const { status } = error;
            if (status === 401) {
                const cb = () => this.spotifyTrackLib.getMultipleTracksFeatures(ids);
                recommendations = await tokenExpiredHandler(cb);
            } else {
                throw new Error(error);
            }
        }
        return recommendations;
    }

    async getMultipleTracks(ids) {
        let recommendations = null;
        try {
            recommendations = await this.spotifyTrackLib.getMultipleTracks(ids);
        } catch (error) {
            const { status } = error;
            if (status === 401) {
                const cb = () => this.spotifyTrackLib.getMultipleTracks(ids);
                recommendations = await tokenExpiredHandler(cb);
            } else {
                throw new Error(error);
            }
        }
        return recommendations;
    }

    async getTrackAnalysis(id) {
        let recommendations = null;
        try {
            recommendations = await this.spotifyTrackLib.getTrackAnalysis(id);
        } catch (error) {
            const { status } = error;
            if (status === 401) {
                const cb = () => this.spotifyTrackLib.getTrackAnalysis(id);
                recommendations = await tokenExpiredHandler(cb);
            } else {
                throw new Error(error);
            }
        }
        return recommendations;
    }

    async getTrackById(id) {
        let recommendations = null;
        try {
            recommendations = await this.spotifyTrackLib.getTrackById(id);
        } catch (error) {
            const { status } = error;
            if (status === 401) {
                const cb = () => this.spotifyTrackLib.getTrackById(id);
                recommendations = await tokenExpiredHandler(cb);
            } else {
                throw new Error(error);
            }
        }
        return recommendations;
    }
}

module.exports = TrackService;
