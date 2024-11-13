import pino from 'pino';

import { isProduction, ENVIRONMENT } from '../configs/config';

export const logger = pino({
  prettyPrint: ENVIRONMENT === 'development',
  level: isProduction() ? 'info' : 'debug',
});
