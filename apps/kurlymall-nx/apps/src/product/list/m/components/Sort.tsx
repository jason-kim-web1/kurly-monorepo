import styled from '@emotion/styled';
import { MouseEvent, useCallback, useEffect, useMemo, useState } from 'react';

import { isEmpty, isUndefined } from 'lodash';

import { useRouter } from 'next/router';

import COLOR from '../../../../shared/constant/colorset';

import { Question21x21cccc } from '../../../../shared/images';
import { zIndex } from '../../../../shared/styles';

import { FilterGroup, PageType, ProductAvailableSort } from '../../types';

import { UrlBasedFilter } from '../../shared/util/parseFilterData';

import FilterButton from './FilterButton';
import { ActiveFilter } from '../containers/ProductList';
import SlideModal from '../../../../shared/components/modal/SlideModal';
import FilterContainer from '../containers/FilterContainer';
import Alert from '../../../../../src/shared/components/Alert/Alert';
import { getDefaultPerPage } from '../../shared/util/getDefaultPerPage';
import { ArrowDown } from '../../../../shared/icons';
import { useAppSelector } from '../../../../shared/store';
import { useScroll } from '../../../../shared/hooks';
import type { MainSite } from '../../../../main/interfaces/MainSection.interface';
import { addComma } from '../../../../shared/services';
import { DEFAULT_SORT_TYPE, RECOMMEND_MESSAGE_SEARCH } from '../../../../search/shared/constants';
import { RECOMMEND_MESSAGE } from '../../shared/constants';

const ListAbility = styled.div<{ headerHeight: number }>`
  position: sticky;
  top: ${({ headerHeight }) => `${headerHeight}px`};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px 16px 2px 20px;
  z-index: ${zIndex.productSort};
  background-color: ${COLOR.kurlyWhite};
`;

const TotalPagingCount = styled.div`
  font-size: 14px;
  color: ${COLOR.kurlyGray800};
  white-space: nowrap;
`;

const SortWrap = styled.div`
  display: flex;
  flex-direction: row;
`;

const SortTitle = styled.strong`
  display: flex;
  align-items: center;
  padding: 13px 12px;
  font-weight: 400;
  font-size: 14px;
  color: ${COLOR.kurlyGray800};
  text-align: right;
  outline: none;
  &:after {
    content: '';
    height: 20px;
    margin-top: -2px;
  }
  > svg {
    margin-left: -2px;
  }
`;

const CloseSort = styled(ArrowDown)``;

const OpenSort = styled(CloseSort)`
  transform: rotate(180deg);
`;

const SortList = styled.ul<{ hasFilterData: boolean }>`
  position: absolute;
  right: ${({ hasFilterData }) => (hasFilterData ? '60px' : '28px')};
  top: 39px;
  width: 104px;
  border-radius: 6px;
  background-color: ${COLOR.kurlyWhite};
  box-shadow: 2px 2px 10px rgb(0 0 0 / 10%);
`;

const SortItem = styled.li<{ isRecommend: boolean }>`
  display: ${({ isRecommend }) => (isRecommend ? 'flex' : '')};
`;

const SortLink = styled.a<{ isCurrent: boolean }>`
  display: block;
  overflow: hidden;
  width: 104px;
  padding: 19px 0 19px 16px;
  font-size: 14px;
  color: ${COLOR.kurlyGray800};
  white-space: nowrap;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0.05);
  &:first-of-type {
    padding: 16px 0 16px 16px;
  }
  ${({ isCurrent }) => (isCurrent ? `font-weight: 700;color: ${COLOR.kurlyPurple};` : '')}
  &:hover {
    font-weight: 600;
    color: ${COLOR.kurlyPurple};
  }
`;

const ButtonLayer = styled.button`
  overflow: hidden;
  width: 26px;
  height: 26px;
  margin: 11px 15px 0 0;
  background: url(${Question21x21cccc}) no-repeat 50% 50%;
  font-size: 0;
  text-indent: -9999px;
`;

const contentsStyle = `
  .popup-content {
    text-align: left;
    color: ${COLOR.kurlyGray600};
  }
`;

interface Props {
  totalProductsCount: number;
  availableSort: {
    type: string;
    name: string;
  }[];
  defaultSortType: string;
  section: PageType;
  filterData?: FilterGroup[];
  selectedFilterKey: string;
  setSelectedFilterKey: React.Dispatch<React.SetStateAction<string>>;
  modalState: boolean;
  setModalState: React.Dispatch<React.SetStateAction<boolean>>;
  activeFilter: UrlBasedFilter;
  urlFilters: UrlBasedFilter;
  onActiveFilter: ({ filterGroupKey, template, filterKey, isActive }: ActiveFilter) => void;
  syncFilterWithUrl: () => void;
  resetBottomSheetFilter: () => void;
  onSortingEvent?: React.Dispatch<React.SetStateAction<boolean>>;
  onChangeSortEvent: ({ type, name }: { type: string; name: string }) => void;
  keyword?: string;
  extraHeight?: number;
  isCollectionGroup?: boolean;
  code: string;
  currentSite?: MainSite;
}

export default function Sort({
  totalProductsCount,
  availableSort,
  defaultSortType,
  section,
  filterData = [],
  selectedFilterKey,
  setSelectedFilterKey,
  modalState,
  setModalState,
  activeFilter,
  urlFilters,
  onActiveFilter,
  syncFilterWithUrl,
  resetBottomSheetFilter,
  onSortingEvent,
  onChangeSortEvent,
  keyword,
  extraHeight = 0,
  isCollectionGroup,
  code,
  currentSite,
}: Props) {
  const { query, replace: routerReplace } = useRouter();
  const selectedType = (query?.sorted_type ?? defaultSortType) || DEFAULT_SORT_TYPE;
  const defaultSortName = availableSort?.find((it) => it.type === selectedType)?.name || '추천순';
  const mobileHeaderHeight = useAppSelector(({ header }) => header.mobileHeaderHeight);
  const selectedSortName = useMemo(() => defaultSortName, [defaultSortName]);
  const [isSortLayerShown, setIsSortLayerShown] = useState(false);
  const defaultPerPage = getDefaultPerPage(section);
  const { scrollY } = useScroll();
  const hasFilterData = !isEmpty(filterData);
  const headerHeight = mobileHeaderHeight + extraHeight + (isCollectionGroup ? 44 : 0);

  const onChangeSort = (sort: ProductAvailableSort) => {
    const { type, name } = sort;

    query.sorted_type = sort.type;
    query.per_page = query.per_page || defaultPerPage.toString();

    if (!isUndefined(onSortingEvent)) {
      onSortingEvent(true);
    }
    onChangeSortEvent({ type, name });

    void routerReplace({
      query,
    });
  };

  const handleSortOpen = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      setIsSortLayerShown(!isSortLayerShown);
    },
    [isSortLayerShown],
  );

  const handleRecommendView = useCallback(() => {
    Alert({
      title: '추천순',
      text: section === 'search' ? RECOMMEND_MESSAGE_SEARCH : RECOMMEND_MESSAGE,
      contentsStyle,
    });
  }, [section]);

  const handleSortChange = (value: ProductAvailableSort) => {
    setIsSortLayerShown(false);

    if (value.type === selectedType) {
      return;
    }

    onChangeSort(value);
  };

  const handleModalState = () => {
    syncFilterWithUrl();
    setModalState(!modalState);
    setIsSortLayerShown(false);
  };

  const handleClickFilterButton = () => {
    handleModalState();
  };

  useEffect(() => {
    if (scrollY > 60) {
      setIsSortLayerShown(false);
    }
  }, [scrollY, setIsSortLayerShown]);

  return (
    <>
      <ListAbility headerHeight={headerHeight}>
        <TotalPagingCount>{`총 ${addComma(totalProductsCount)}개`}</TotalPagingCount>
        <SortWrap>
          <SortTitle onClick={handleSortOpen}>
            {selectedSortName}
            {isSortLayerShown ? (
              <OpenSort width={20} height={20} stroke={COLOR.kurlyGray800} strokeWidth={1} />
            ) : (
              <CloseSort width={20} height={20} stroke={COLOR.kurlyGray800} strokeWidth={1} />
            )}
          </SortTitle>
          {isSortLayerShown ? (
            <SortList hasFilterData={hasFilterData && totalProductsCount > 1}>
              {availableSort.map((it) => (
                <SortItem key={it.type} isRecommend={it.name === '추천순'}>
                  <SortLink isCurrent={it.type === selectedType} onClick={() => handleSortChange(it)}>
                    {it.name}
                  </SortLink>
                  {it.name === '추천순' ? (
                    <ButtonLayer onClick={handleRecommendView}>추천순 설명보기</ButtonLayer>
                  ) : null}
                </SortItem>
              ))}
            </SortList>
          ) : null}
          {hasFilterData && (totalProductsCount > 0 || !isEmpty(activeFilter)) ? (
            <FilterButton onClick={handleClickFilterButton} urlBasedFilter={urlFilters} />
          ) : null}
        </SortWrap>
      </ListAbility>
      {hasFilterData ? (
        <SlideModal open={modalState} onClose={handleModalState}>
          <FilterContainer
            filterData={filterData}
            selectedFilterKey={selectedFilterKey}
            setSelectedFilterKey={setSelectedFilterKey}
            onClickShowProductsButton={handleModalState}
            activeFilter={activeFilter}
            onActiveFilter={onActiveFilter}
            resetBottomSheetFilter={resetBottomSheetFilter}
            keyword={keyword}
            code={code}
            section={section}
            currentSite={currentSite}
          />
        </SlideModal>
      ) : null}
    </>
  );
}
