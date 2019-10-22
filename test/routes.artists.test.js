const assert = require('assert');
const proxyquire = require('proxyquire');

const testServer = require('../utils/test-server');

const {
    artistsMock,
    artistMock,
    artistAlbumsMock,
    artistTopTracksMock,
    artistRelatedArtistsMock,
    ArtistServiceMock,
} = require('../utils/mocks/artists');


describe('route - artists', () => {
    const route = proxyquire('../routes/artists.js', {
        '../services/ArtistService': ArtistServiceMock,
    });

    const request = testServer(route);

    describe('GET /artists', () => {
        it('sould response with status 200', (done) => {
            request.get('/api/artists').expect(200, done);
        });

        it('should response with the list of artists', (done) => {
            request.get('/api/artists').end((_err, res) => {
                assert.deepStrictEqual(res.body, {
                    data: artistsMock,
                    message: 'artists',
                });

                done();
            });
        });
    });

    describe('GET /artists/:id', () => {
        it('sould response with status 200', (done) => {
            request.get('/api/artists/0oSGxfWSnnOXhD2fKuz2Gy').expect(200, done);
        });

        it('should response with the artist', (done) => {
            request.get('/api/artists/0oSGxfWSnnOXhD2fKuz2Gy').end((_err, res) => {
                assert.deepStrictEqual(res.body, {
                    data: artistMock,
                    message: 'artist',
                });

                done();
            });
        });
    });

    describe('GET /artists/:id/albums', () => {
        it('sould response with status 200', (done) => {
            request.get('/api/artists/0oSGxfWSnnOXhD2fKuz2Gy/albums').expect(200, done);
        });

        it('should response with the artist albums', (done) => {
            request.get('/api/artists/0oSGxfWSnnOXhD2fKuz2Gy/albums').end((_err, res) => {
                assert.deepStrictEqual(res.body, {
                    data: artistAlbumsMock,
                    message: 'artist albums',
                });

                done();
            });
        });
    });

    describe('GET /artists/:id/top-tracks', () => {
        it('sould response with status 200', (done) => {
            request.get('/api/artists/0oSGxfWSnnOXhD2fKuz2Gy/top-tracks').expect(200, done);
        });

        it('should response with the artist top-tracks', (done) => {
            request.get('/api/artists/0oSGxfWSnnOXhD2fKuz2Gy/top-tracks').end((_err, res) => {
                assert.deepStrictEqual(res.body, {
                    data: artistTopTracksMock,
                    message: 'artist top tracks',
                });

                done();
            });
        });
    });

    describe('GET /artists/:id/related-artists', () => {
        it('sould response with status 200', (done) => {
            request.get('/api/artists/0oSGxfWSnnOXhD2fKuz2Gy/related-artists').expect(200, done);
        });

        it('should response with the artist related artists', (done) => {
            request.get('/api/artists/0oSGxfWSnnOXhD2fKuz2Gy/related-artists').end((_err, res) => {
                assert.deepStrictEqual(res.body, {
                    data: artistRelatedArtistsMock,
                    message: 'artist related artists',
                });

                done();
            });
        });
    });
});
