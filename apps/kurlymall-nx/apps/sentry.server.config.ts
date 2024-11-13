import * as Sentry from '@sentry/nextjs';

import { ENABLE_SENTRY, SENTRY_INIT_CONFIG } from './src/shared/configs/config';

if (ENABLE_SENTRY) {
  Sentry.init(SENTRY_INIT_CONFIG);
}
