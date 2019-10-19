const express = require('express');
const helmet = require('helmet');
const debug = require('debug')('app:server');

const app = express();
const { config } = require('./config');
const { authApi } = require('./routes');

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

// Catch 404
app.use(notFoundHandler);

// Errors Middlewares
app.use(logErrors);
app.use(wrapError);
app.use(errorHandler);

app.listen(config.port, () => {
  debug(`Listening http://localhost:${config.port}`);
});
