// eslint-disable-next-line import/no-extraneous-dependencies
import { setupWorker, SetupWorkerApi } from 'msw';

import { handlers } from './handlers';

export const worker: SetupWorkerApi = setupWorker(...handlers());
