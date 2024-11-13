import { head } from 'lodash';

import { fetchCollectionSet } from '../../../shared/api/events/collection/collection-caching';
import { createCollectionSetProductItem } from '../../../shared/api/events/collection/utils/createCollectionSetProductItem';
import type { CollectionSetProductItemType } from '../../../shared/api/events/collection/types';

const getCollectionSet = async (
  accessToken: string,
  code: string,
): Promise<{ collectionCode: string; productList: CollectionSetProductItemType[] }> => {
  const response = await fetchCollectionSet(accessToken, code);
  const collectionData = head(response);
  if (!collectionData) {
    throw new Error('Invalid response');
  }

  const { collectionCode, products } = collectionData;
  const productList = products.map((item) => createCollectionSetProductItem(item));
  return { collectionCode, productList };
};

export { getCollectionSet };
