const request = require('request');
const fs = require('fs');
const SpotifySearchLib = require('../lib/spotify/SpotifySearchLib');
const { tokenExpiredHandler } = require('../utils/spotify/error-handlers');
const { config } = require('../config');
const { buildStringToSign, sign } = require('../utils/audio-search');

const { acrcloudHost, acrcloudAccessKey, acrcloudAccessSecret } = config;

class SearchService {
    constructor() {
        this.spotifySearchLib = new SpotifySearchLib();
        this.options = {
            endpoint: '/v1/identify',
            signature_version: '1',
            data_type: 'audio',
            secure: true,
        };
    }

    async search({
        q, type, limit, offset,
    }) {
        let results = null;
        try {
            results = await this.spotifySearchLib.search({
                q, type, limit, offset,
            });
        } catch (error) {
            const { status } = error;
            if (status === 401) {
                const cb = () => this.spotifySearchLib.search({
                    q, type, limit, offset,
                });
                results = await tokenExpiredHandler(cb);
            } else {
                throw new Error(error);
            }
        }
        return results;
    }

    async searchAudio(blob) {
        const sample = fs.readFileSync(blob);
        console.log(sample);
        const currentData = new Date();
        const timestamp = currentData.getTime() / 1000;
        const stringToSign = buildStringToSign(
            'POST',
            this.options.endpoint,
            acrcloudAccessKey,
            this.options.data_type,
            this.options.signature_version,
            timestamp,
        );

        const signature = sign(stringToSign, acrcloudAccessSecret);

        const formData = {
            sample,
            access_key: acrcloudAccessKey,
            data_type: this.options.data_type,
            signature_version: this.options.signature_version,
            signature,
            sample_bytes: sample.length,
            timestamp,
        };

        request.post({
            url: `${acrcloudHost}${this.options.endpoint}`,
            method: 'POST',
            formData,
        }, (error, res, body) => {
            if (error) {
                throw new Error(error);
            }
            console.log(body);
            return body;
        });
    }
}

module.exports = SearchService;
