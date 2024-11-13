import { useQuery } from '@tanstack/react-query';

import { useDispatch } from 'react-redux';

import { useEffect, useMemo } from 'react';

import { fetchCategory } from '../../shared/api';
import { MainSite } from '../../main/interfaces/MainSection.interface';
import { keys } from './keys';
import { isPC } from '../../../util/window/getDevice';
import { actions, SiteCategoryState } from '../../shared/reducers/category';
import { Awaited } from '../../shared/types';

const mapToSiteCategoryState = (result: Awaited<ReturnType<typeof fetchCategory>>): SiteCategoryState => ({
  ...result,
  categoriesMeta: {
    ...result.categoriesMeta,
    isNew: {
      iconUrl: isPC ? result.categoriesMeta.isNew.pcIconUrl : result.categoriesMeta.isNew.mobileIconUrl,
    },
  },
});

const initialData = {
  categories: [],
  categoriesMeta: {
    recommendCategoriesName: '',
    recommend: {
      pcIconUrl: '',
      pcIconActiveUrl: '',
    },
    isNew: {
      pcIconUrl: '',
      mobileIconUrl: '',
    },
  },
  quick: [],
};

export default function useGetCategoryGroups(site: MainSite, enabled = true) {
  const dispatch = useDispatch();

  const {
    data: queryData,
    isPlaceholderData,
    status: queryStatus,
    ...rest
  } = useQuery(keys[site], () => fetchCategory(site.toLowerCase()), {
    select: mapToSiteCategoryState,
    enabled,
    placeholderData: initialData,
  });

  // NOTE: placeholderData 속성 있을 시
  const data = useMemo(() => queryData || mapToSiteCategoryState(initialData), [queryData]);
  const status = isPlaceholderData ? 'loading' : queryStatus;

  useEffect(() => {
    if (isPlaceholderData) return;
    dispatch(actions.setCategory({ site, values: data }));
  }, [dispatch, data, site, isPlaceholderData]);

  return {
    data,
    status,
    ...rest,
  };
}
