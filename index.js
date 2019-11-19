const express = require('express');
const helmet = require('helmet');
const debug = require('debug')('app:server');
const https = require('https');
const fs = require('fs');

const app = express();

const { config } = require('./config');

const { port, nodeEnv, apiUrlWithoutPort } = config;
const albumsApi = require('./routes/albums');
const artistsApi = require('./routes/artists');
const authApi = require('./routes/auth');
const categoriesApi = require('./routes/categories');
const recommendationsAPi = require('./routes/recommendations');
const searchApi = require('./routes/search');
const tracksApi = require('./routes/tracks');
const usersApi = require('./routes/users');

const {
    logErrors,
    errorHandler,
    wrapError,
    notFoundHandler,
} = require('./utils/middlewares/error-handlers');

const isDev = nodeEnv === 'development';

// Body Parser
app.use(express.json({ limit: '50mb' }));
app.use(helmet());

// Routes
albumsApi(app);
artistsApi(app);
authApi(app);
categoriesApi(app);
recommendationsAPi(app);
searchApi(app);
tracksApi(app);
usersApi(app);

// Catch 404
app.use(notFoundHandler);

// Errors Middlewares
app.use(logErrors);
app.use(wrapError);
app.use(errorHandler);

if (isDev) {
    app.listen(port, (error) => {
        if (error) {
            debug(error);
        }
        debug(`Listening ${apiUrlWithoutPort}:${port}`);
    });
} else {
    https.createServer({
        key: fs.readFileSync('/etc/letsencrypt/live/dplay.cf/privkey.pem'),
        cert: fs.readFileSync('/etc/letsencrypt/live/dplay.cf/fullchain.pem'),
    }, app).listen(port, (error) => {
        if (error) {
            console.log(error);
        }
        console.log(`Listening ${apiUrlWithoutPort}:${port}`);
    });
}
