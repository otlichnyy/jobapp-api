import express from 'express';
import { successLogHandler, errorLogHandler } from './middleware/morgan';

const app = express();

// Add Logger
if (process.env.NODE_ENV !== 'test') {
  app.use(successLogHandler);
  app.use(errorLogHandler);
}

app.get('/healthz', (_, res) => {
  res.send({ status: 'OK' });
});

export default app;
