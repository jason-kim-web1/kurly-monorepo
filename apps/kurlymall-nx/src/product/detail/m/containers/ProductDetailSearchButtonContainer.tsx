import React from 'react';

import { useDispatch } from 'react-redux';

import { eq, every } from 'lodash';

import { amplitudeService, TabName } from '../../../../shared/amplitude';
import { SelectSearchTab } from '../../../../shared/amplitude/events';
import { redirectTo } from '../../../../shared/reducers/page';
import { getPageUrl, USER_MENU_PATH } from '../../../../shared/constant';
import SearchIcon from '../../../../shared/icons/SearchIcon';

import type { ProductSiteType } from '../../types';

interface Props {
  sites: ProductSiteType[];
}
export default function SearchButtonContainer({ sites }: Props) {
  const dispatch = useDispatch();
  const isBeautyOnlyDisplay = every(sites, (site) => eq(site, 'BEAUTY'));

  const handleClickSearchButton = () => {
    amplitudeService.logEvent(new SelectSearchTab());
    amplitudeService.setTabName(TabName.SEARCH);

    dispatch(
      redirectTo({
        url: getPageUrl(USER_MENU_PATH.search),
        query: isBeautyOnlyDisplay
          ? {
              site: 'beauty',
            }
          : undefined,
      }),
    );
  };

  return (
    <button type="button" onClick={handleClickSearchButton}>
      <SearchIcon />
    </button>
  );
}
