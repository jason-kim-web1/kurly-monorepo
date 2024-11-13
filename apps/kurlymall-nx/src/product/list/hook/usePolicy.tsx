import { eq } from 'lodash';

import { useCategory } from '../categories/hook/useCategory';
import { useCollection } from '../collections/hook/useCollection';
import { useCollectionGroups } from '../collections/hook/useCollectionGroups';
import type { ProductListType } from '../types';

interface Params {
  code: string;
  type: ProductListType;
}

export function usePolicy({ code, type }: Params) {
  const isCollection = eq(type, 'collection');
  const isCategory = eq(type, 'categories');
  const isCollectionGroups = eq(type, 'collection-groups');

  const { isError: isCollectionError, isLoading: isCollectionLoading } = useCollection({
    collectionName: code,
    options: { enabled: isCollection },
  });
  const { isError: isCategoryError, isLoading: isCategoryLoading } = useCategory({
    categoryNo: code,
    options: { enabled: isCategory },
  });
  const { isError: isCollectionGroupsError, isLoading: isCollectionGroupsLoading } = useCollectionGroups({
    collectionGroupsCode: code,
    options: { enabled: isCollectionGroups },
  });

  const resultMap = {
    collection: {
      isError: isCollectionError,
      isLoading: isCollectionLoading,
    },
    categories: {
      isError: isCategoryError,
      isLoading: isCategoryLoading,
    },
    'collection-groups': {
      isError: isCollectionGroupsError,
      isLoading: isCollectionGroupsLoading,
    },
  };

  return { isError: resultMap[type].isError, isLoading: resultMap[type].isLoading };
}
