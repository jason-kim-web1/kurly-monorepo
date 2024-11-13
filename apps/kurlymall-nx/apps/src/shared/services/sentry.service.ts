import { AxiosError } from 'axios';

import * as Sentry from '@sentry/nextjs';

import { SeverityLevel } from '@sentry/nextjs';

interface CaptureContext {
  tags?: {
    [key: string]: string;
  };
  extra?: {
    [key: string]: string;
  };
  level?: SeverityLevel;
}

export const sentryCaptureError = (err: Error | string, captureContext?: CaptureContext) => {
  if (typeof err === 'string') {
    Sentry.captureMessage(err, captureContext);

    return;
  }

  if ((err as AxiosError).isAxiosError) {
    const e = err as AxiosError;

    Sentry.captureException(err, {
      extra: {
        networkError: {
          url: e.config.url,
          ...(e.config.data && { request: JSON.parse(e.config.data) }),
          ...(e.response?.data && { response: e.response?.data }),
        },
      },
    });

    return;
  }

  Sentry.captureException(err, captureContext);
};
