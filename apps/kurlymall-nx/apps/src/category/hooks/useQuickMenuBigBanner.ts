import { useMemo } from 'react';
import { head } from 'lodash';

import useSiteCategorySelectedCode from './useSiteCategorySelectedCode';
import { PrimaryCategory } from '../../shared/reducers/category';
import { useAppSelector } from '../../shared/store';

export default function useQuickMenuBigBanner(item: PrimaryCategory | undefined) {
  const site = useAppSelector(({ main }) => main.site);
  const { getCode } = useSiteCategorySelectedCode();

  const banner = useMemo(() => {
    return head(item?.banners) ?? null;
  }, [item]);

  const bannerVisible = !getCode(site) && !!banner;

  return {
    bannerVisible,
    banner,
  };
}
