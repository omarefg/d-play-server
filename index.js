const express = require('express');
const helmet = require('helmet');
const debug = require('debug')('app:server');

const app = express();

const { config } = require('./config');
const albumsApi = require('./routes/albums');
const artistsApi = require('./routes/artists');
const authApi = require('./routes/auth');
const categoriesApi = require('./routes/categories');
const recommendationsAPi = require('./routes/recommendations');
const searchApi = require('./routes/search');
const tracksApi = require('./routes/tracks');

const {
    logErrors,
    errorHandler,
    wrapError,
    notFoundHandler,
} = require('./utils/middlewares/error-handlers');

// Body Parser
app.use(express.json());
app.use(helmet());

// Routes
albumsApi(app);
artistsApi(app);
authApi(app);
categoriesApi(app);
recommendationsAPi(app);
searchApi(app);
tracksApi(app);

// Catch 404
app.use(notFoundHandler);

// Errors Middlewares
app.use(logErrors);
app.use(wrapError);
app.use(errorHandler);

app.listen(config.port, () => {
    debug(`Listening http://localhost:${config.port}`);
});
