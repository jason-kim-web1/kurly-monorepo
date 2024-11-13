import { VersionInfoUpdate } from '../../../lego/types';
import { isProduction, RESOURCE_URL } from '../../configs/config';
import { UnknownError } from '../../errors/UnknownError';
import { getFile } from '../common/getFile';
import { LegoResponse } from './api.type';

export const fetchLegoInfoUpdate = async (): Promise<VersionInfoUpdate> => {
  const url = `${RESOURCE_URL}/json/lego/${isProduction() ? 'meta' : 'meta_dev'}.json`;
  try {
    const response = await getFile<VersionInfoUpdate>(url);
    return response;
  } catch (e) {
    throw new UnknownError(e);
  }
};

export const fetchLegoInfo = async (version: string): Promise<LegoResponse> => {
  const url = `${RESOURCE_URL}/json/lego/${version}.json`;
  try {
    return await getFile<LegoResponse>(url);
  } catch (e) {
    throw new UnknownError(e);
  }
};
