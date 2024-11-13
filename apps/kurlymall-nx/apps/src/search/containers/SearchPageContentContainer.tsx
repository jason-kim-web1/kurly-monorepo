import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { isEmpty } from 'lodash';

import SearchContainer from '../components/Search';
import UserMenu from '../../shared/components/layouts/UserMenu';

import { productListSetScreenName } from '../../product/list/shared/util/productListSetScreenName';

import { AppState } from '../../shared/store';

import { useSearchData } from '../contexts/SearchDataProvider';
import { branchService } from '../../shared/branch';
import { Search } from '../../shared/branch/events';
import MainSiteProvider from '../../main/components/shared/MainSiteProvider';

export const SearchPageContentContainer = () => {
  const accessToken = useSelector(({ auth }: AppState) => auth.accessToken);
  const { isReady } = useRouter();

  const { site, searchKeyword, filters } = useSearchData();
  const [isFocus, setIsFocus] = useState(false);

  const handleFocusInOut = (value: boolean) => {
    setIsFocus(value);
  };

  useEffect(() => {
    if (isEmpty(searchKeyword) || !accessToken) {
      return;
    }

    productListSetScreenName(searchKeyword, 'search');

    branchService.logEvent(
      new Search({
        searchQuery: searchKeyword,
      }),
    );
  }, [accessToken, searchKeyword, filters]);

  return (
    <MainSiteProvider site={site}>
      {isReady ? <SearchContainer onFocusInOut={handleFocusInOut} /> : null}
      {!isFocus ? <UserMenu /> : null}
    </MainSiteProvider>
  );
};
