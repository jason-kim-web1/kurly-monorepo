import { useMemo } from 'react';

import { PCMainSiteNavigation } from '../navigation';
import { useAppSelector } from '../../shared/store';

function useMainNavigation() {
  const site = useAppSelector(({ main }) => main.site);
  const navigationOptions = useMemo(() => PCMainSiteNavigation[site], [site]);

  return {
    navigationOptions,
  };
}

export default useMainNavigation;
