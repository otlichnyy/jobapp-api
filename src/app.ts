import express from 'express';
import * as httpStatus from 'http-status';
import { successLogHandler, errorLogHandler } from './middleware/morgan';
import { customErrorHandler, errorConvertor } from './middleware/errorHandler';
import ApiError from './utils/apiError';

const app = express();

// Add Logger
if (process.env.NODE_ENV !== 'test') {
  app.use(successLogHandler);
  app.use(errorLogHandler);
}

app.get('/healthz', (_, res) => {
  res.send({ status: 'OK' });
});

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});

// Convert any other Error type to APIError
app.use(errorConvertor);

// Handle app error
app.use(customErrorHandler);

export default app;
