const express = require('express');
const helmet = require('helmet');
const debug = require('debug')('app:server');

const app = express();

const { config } = require('./config');
const authApi = require('./routes/auth');
const categoriesApi = require('./routes/categories');
const artistsApi = require('./routes/artists');
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
authApi(app);
categoriesApi(app);
artistsApi(app);
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
