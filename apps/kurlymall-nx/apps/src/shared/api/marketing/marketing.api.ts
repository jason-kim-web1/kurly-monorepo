import { isProduction, RESOURCE_URL } from '../../configs/config';
import { UnknownError } from '../../errors';
import { getFile } from '../common';
import { ContentResponse, MetaResponse } from './api.type';

export const fetchMetaData = async ({ filePath }: { filePath: string }) => {
  const url = `${RESOURCE_URL}/json/${filePath}/${isProduction() ? 'meta' : 'meta_dev'}.json`;

  try {
    const response = await getFile<MetaResponse>(url);

    return response;
  } catch (err) {
    console.error(err);

    throw new UnknownError(err as Error);
  }
};

export async function fetchBaseContent<T>({ filePath, version }: { filePath: string; version: string }) {
  const url = `${RESOURCE_URL}/json/${filePath}/${version}.json`;

  try {
    const response = await getFile<ContentResponse<T>>(url);

    return response;
  } catch (err) {
    console.error(err);

    throw new UnknownError(err as Error);
  }
}
