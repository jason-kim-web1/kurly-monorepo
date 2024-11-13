import styled from '@emotion/styled';

import { useDispatch } from 'react-redux';

import { useEffect, useState } from 'react';

import { eq, isEmpty } from 'lodash';

import { useAppSelector } from '../../shared/store';

import usePageStatus from '../hooks/usePageStatus';

import COLOR from '../../shared/constant/colorset';
import { zIndex } from '../../shared/styles';
import { USER_MENU_PATH, getPageUrl } from '../../shared/constant';

import HeaderButtons from '../../shared/components/layouts/HeaderButtons';
import DeliveryLocationContainer from '../../header/containers/m/DeliveryLocationContainer';
import CartButtonContainer from '../../shared/containers/m/CartButtonContainer';
import MobileHeader from '../../shared/components/layouts/MobileHeader';

import SearchResultContainer from './SearchResultContainer';
import SearchFormBefore from './search-form/SearchFormBefore';
import SearchFormContainerAfter from './search-form/SearchFormContainerAfter';
import Loading from '../../shared/components/Loading/Loading';
import { ThemeColorMeta } from '../../shared/components/ThemeColorMeta/ThemeColorMeta';

import { useSearchData } from '../contexts/SearchDataProvider';
import { redirectTo } from '../../shared/reducers/page';
import { SEARCH_PAGE_STATUS } from '../shared/constants';
import { fusionSignalsService } from '../../shared/fusion-signals/FusionSignalsService';

interface Props {
  onFocusInOut(value: boolean): void;
}

const Wrapper = styled.div`
  position: sticky;
  top: 0;
  z-index: ${zIndex.SearchWrapper};
`;

const BeforeContainer = styled.div``;

const Title = styled.div<{ color: 'white' | 'black' }>`
  width: 100%;
  height: 100%;
  padding: 0 49px;
  left: 0;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  font-size: 16px;
  font-weight: 600;
  line-height: normal;
  text-align: center;
  color: ${({ color }) => (color === 'white' ? `${COLOR.kurlyWhite}` : `${COLOR.kurlyGray800}`)};
`;

export default function Search({ onFocusInOut }: Props) {
  const { site, searchKeyword: sword } = useSearchData();
  const hasSession = useAppSelector(({ auth }) => auth.hasSession);
  const uid = useAppSelector(({ auth }) => auth.uid);
  const [isSearching, setIsSearching] = useState(false);
  const [searchValue, setSearchValue] = useState(sword);
  const { pageStatus, changePageStatus } = usePageStatus();
  const dispatch = useDispatch();

  const handleClickKeyword = (keyword: string) => {
    setIsSearching(() => true);
    changePageStatus(SEARCH_PAGE_STATUS.listContainer);

    const url = getPageUrl(USER_MENU_PATH.search);

    dispatch(
      redirectTo({
        url,
        query: {
          sword: keyword,
          ...(site === 'BEAUTY' ? { site: 'beauty' } : {}),
        },
      }),
    );
  };

  const handleSearchingState = () => {
    changePageStatus(SEARCH_PAGE_STATUS.keywords);
    setIsSearching(!isSearching);
  };

  const handleChangeInput = (value: string) => {
    setSearchValue(value);
    changePageStatus(value === '' ? SEARCH_PAGE_STATUS.keywords : SEARCH_PAGE_STATUS.suggestion);
  };

  useEffect(() => {
    if (!sword) {
      changePageStatus(SEARCH_PAGE_STATUS.keywords);
      return;
    }
    changePageStatus(SEARCH_PAGE_STATUS.listContainer);
  }, [sword, changePageStatus]);

  const headerColor = site === 'MARKET' ? 'purple' : 'white';
  const titleColor = site === 'MARKET' ? 'white' : 'black';
  const iconColor = site === 'MARKET' ? 'white' : 'black';

  useEffect(() => {
    if (!(uid && hasSession && eq(pageStatus, SEARCH_PAGE_STATUS.listContainer) && searchValue)) {
      return;
    }

    fusionSignalsService.setUser({ uid, site });
  }, [uid, pageStatus, hasSession, searchValue]);

  return (
    <>
      <ThemeColorMeta isHiddenHeader={isSearching} isSearchResultPage={!isEmpty(sword)} />
      <Wrapper>
        {isSearching || !!sword ? (
          <SearchFormContainerAfter
            sword={sword}
            site={site}
            isSearching={isSearching}
            onChangeInput={handleChangeInput}
            onClickBackButton={handleSearchingState}
            pageStatus={pageStatus}
            onFocusEvent={onFocusInOut}
          />
        ) : (
          <BeforeContainer onClick={handleSearchingState}>
            <MobileHeader color={headerColor} hideBottomLine>
              <Title color={titleColor}>검색</Title>
              <HeaderButtons position="right">
                <DeliveryLocationContainer color={iconColor} />
                <CartButtonContainer color={iconColor} />
              </HeaderButtons>
            </MobileHeader>
            <SearchFormBefore site={site} onFocusEvent={onFocusInOut} />
          </BeforeContainer>
        )}
      </Wrapper>
      {hasSession ? (
        <SearchResultContainer
          onClickKeyword={handleClickKeyword}
          pageStatus={pageStatus}
          keyword={searchValue}
          isSearching={isSearching}
        />
      ) : (
        <Loading />
      )}
    </>
  );
}
