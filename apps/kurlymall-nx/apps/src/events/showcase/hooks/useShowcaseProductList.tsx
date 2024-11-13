import { useQuery } from '@tanstack/react-query';
import { get } from 'lodash';

import { getCollectionSet } from '../services/getCollectionSet';
import type { ProductType } from '../types';
import { CollectionSetProductItemType } from '../../../shared/api/events/collection/types';

const mergeProductList = (
  collectionProductList: CollectionSetProductItemType[],
  showcaseProductList: ProductType[],
) => {
  const collectionProductMap = new Map(collectionProductList.map((product) => [product.no, product]));

  return showcaseProductList.map((showcaseProduct) => {
    const matchedCollectionProduct = collectionProductMap.get(showcaseProduct.contentNo);
    if (!matchedCollectionProduct) {
      return {
        ...showcaseProduct,
        status: {
          isPurchase: false,
          isSoldOut: false,
        },
      };
    }

    const { salesPrice, discount, isSales, isPurchaseStatus, isSoldOut } = matchedCollectionProduct;
    const price = discount?.price ?? salesPrice ?? showcaseProduct?.price;
    const discountRate = discount?.rate ?? showcaseProduct?.discountRate;
    const isPurchase = isSales && isPurchaseStatus;

    return {
      ...showcaseProduct,
      price,
      discountRate,
      status: {
        isPurchase,
        isSoldOut,
      },
    };
  });
};

interface Props {
  accessToken: string;
  collectionSetCode: string;
  showcaseProductList: ProductType[];
  enabled: boolean;
}

const useShowcaseProductList = ({ accessToken, collectionSetCode, showcaseProductList, enabled }: Props) => {
  const queryKey = ['events', 'showcase', collectionSetCode, 'collection-set'];
  const queryResult = useQuery(queryKey, () => getCollectionSet(accessToken, collectionSetCode), { enabled });

  const collectionSet = get(queryResult, 'data', {});
  const collectionProductList = get(collectionSet, 'productList', []);
  const integratedProductList = mergeProductList(collectionProductList, showcaseProductList);
  return { ...queryResult, integratedProductList, collectionProductList };
};

export { useShowcaseProductList };
