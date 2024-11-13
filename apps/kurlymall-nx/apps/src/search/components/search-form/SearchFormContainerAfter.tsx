import styled from '@emotion/styled';

import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { chain, eq, get, isEmpty, isString } from 'lodash';

import COLOR from '../../../shared/constant/colorset';

import { notify, redirectTo } from '../../../shared/reducers/page';

import { useAppSelector } from '../../../shared/store';
import useRecentKeywords from '../../hooks/useRecentKeywords';
import usePageStatus, { PageStatus } from '../../hooks/usePageStatus';

import { MainSite } from '../../../main/interfaces/MainSection.interface';

import { BackArrow } from '../../../shared/images';

import SearchFormAfter from './SearchFormAfter';

import { SelectSearch } from '../../../shared/amplitude/events';
import { amplitudeService } from '../../../shared/amplitude';

import DeliveryLocationContainer from '../../../header/containers/m/DeliveryLocationContainer';
import CartButtonContainer from '../../../shared/containers/m/CartButtonContainer';
import HeaderButtons from '../../../shared/components/layouts/HeaderButtons';
import { SEARCH_RESULT_SELECTION_TYPE, SELECT_SEARCH_SELECTION_TYPE } from '../../shared/constants';
import { setSearchSelectionType } from '../../../product/list/slice';

const Container = styled.div`
  position: sticky;
`;

const HeaderButtonsWrapper = styled(HeaderButtons)`
  right: 1px;
`;

const Wrapper = styled.div`
  align-items: baseline;
  padding-bottom: 44px;
  background-color: ${COLOR.kurlyWhite};
`;

const SearchBackButton = styled.button`
  position: absolute;
  width: 50px;
  height: 43px;
  margin-top: 1px;
  background: url(${BackArrow}) 50% 50%;
  border: none;
`;

interface Props {
  sword: string;
  site: MainSite;
  isSearching: boolean;
  onChangeInput: (value: string) => void;
  onClickBackButton: () => void;
  onFocusEvent: (value: boolean) => void;
  pageStatus?: PageStatus;
}

export default function SearchFormContainerAfter({
  site,
  sword,
  isSearching,
  onChangeInput,
  onClickBackButton,
  onFocusEvent,
  pageStatus,
}: Props) {
  const previousSearchKeywordRef = useRef<string>(sword);
  const [searchValue, setSearchValue] = useState(sword ?? '');
  const { addRecentKeyword } = useRecentKeywords();

  const router = useRouter();
  const { query } = router;
  const dispatch = useDispatch();
  const { changePageStatus } = usePageStatus();

  const updatePageStatus = useCallback(
    (searchKeyword: string) => {
      setSearchValue(searchKeyword.trim());
      try {
        changePageStatus('listContainer');
        addRecentKeyword(searchKeyword.trim(), site);
      } catch (err) {
        dispatch(notify(err.message));
      }
    },
    [addRecentKeyword, changePageStatus, dispatch, site],
  );

  const goToSearch = (param?: { sword: string }) => {
    dispatch(
      redirectTo({
        url: '/search',
        query: {
          ...(site === 'BEAUTY' ? { site: 'beauty' } : {}),
          ...(param ? param : {}),
        },
      }),
    );
  };

  const handleChange = (value: string) => {
    setSearchValue(value);
    onChangeInput(value);

    if (!value) {
      changePageStatus('keywords');

      goToSearch();
    }
  };

  const handleClickDelete = () => {
    handleChange('');
    changePageStatus('keywords');

    goToSearch();
  };

  const handleClickBackButton = () => {
    goToSearch();

    onClickBackButton();
  };

  const { queryId } = useAppSelector(({ productList }) => productList);

  const handleClickSearch = () => {
    const isSearchKeywordNotChanged = eq(sword, searchValue);
    if (isSearchKeywordNotChanged) {
      const hasPreviousSearchFactor = chain(['filters', 'sorted_type'])
        .map((urlQueryKey) => get(query, urlQueryKey))
        .map(isString)
        .some(Boolean)
        .value();
      if (!hasPreviousSearchFactor) {
        // TODO: Document 를 재호출하는것이 아니라 데이터만 refetch 하도록 수정 필요 (Context 전환 작업 이후)
        router.reload();
        return;
      }
    }

    amplitudeService.logEvent(
      new SelectSearch({
        queryId,
        keyword: searchValue,
        selectionType: SELECT_SEARCH_SELECTION_TYPE.KEYWORD,
      }),
    );
    updatePageStatus(searchValue.trim());

    dispatch(setSearchSelectionType(SEARCH_RESULT_SELECTION_TYPE.KEYWORD));

    goToSearch({ sword: searchValue });
  };

  const isSearchResult = useMemo(() => pageStatus === 'listContainer', [pageStatus]);

  useEffect(() => {
    if (isEmpty(sword)) {
      setSearchValue('');
      previousSearchKeywordRef.current = '';
      return;
    }
    if (previousSearchKeywordRef.current === sword) {
      return;
    }
    updatePageStatus(sword);
    previousSearchKeywordRef.current = sword;
  }, [sword, updatePageStatus]);

  return (
    <Container>
      <Wrapper>
        <SearchBackButton onClick={handleClickBackButton} />
        <SearchFormAfter
          site={site}
          isSearching={isSearching}
          onChange={handleChange}
          onClickSearch={handleClickSearch}
          onClickDelete={handleClickDelete}
          searchWord={searchValue}
          isSearchResult={isSearchResult}
          onFocusEvent={onFocusEvent}
        />
        {isSearchResult ? (
          <HeaderButtonsWrapper position="right">
            <DeliveryLocationContainer />
            <CartButtonContainer />
          </HeaderButtonsWrapper>
        ) : null}
      </Wrapper>
    </Container>
  );
}
