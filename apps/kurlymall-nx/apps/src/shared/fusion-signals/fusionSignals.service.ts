import httpClient from '../configs/http-client';
import { UnknownError } from '../errors/UnknownError';
import { FusionSignalsParams } from './fusionSignalsType';

const putFusionSignals = async ({ type, params }: { type: string; params: FusionSignalsParams }) => {
  const endpoint = '/v1/fusion/signals';
  const timestamp = new Date().getTime();
  try {
    await httpClient.put(endpoint, {
      type: type,
      timestamp,
      params,
    });
  } catch (err: any) {
    throw new UnknownError(err);
  }
};

export { putFusionSignals };
