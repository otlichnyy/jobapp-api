import { Response } from 'express';
import morgan from 'morgan';
import logger from '../config/logger';

morgan.token(
  'message',
  (_, res: Response) => JSON.stringify(res.locals?.errorMessage) || ''
);

const getIpFormat = () =>
  process.env.NODE_ENV === 'production' ? ':remote-addr - ' : '';

const successResponseFormat = `${getIpFormat()}:method :url :status - :response-time ms`;
const errorResponseFormat = `${getIpFormat()}:method :url :status - :response-time ms - message: :message`;

const successLogHandler = morgan(successResponseFormat, {
  skip: (_, res) => res.statusCode >= 400,
  stream: { write: (message) => logger.info(message.trim()) },
});

const errorLogHandler = morgan(errorResponseFormat, {
  skip: (_, res) => res.statusCode < 400,
  stream: { write: (message) => logger.error(message.trim()) },
});

export { successLogHandler, errorLogHandler };
