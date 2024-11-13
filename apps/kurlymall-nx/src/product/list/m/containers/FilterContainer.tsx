import styled from '@emotion/styled';

import { isEmpty, isUndefined, debounce, eq } from 'lodash';

import { useRouter } from 'next/router';

import Link from 'next/link';

import React, { useEffect, useRef, useState } from 'react';

import COLOR from '../../../../shared/constant/colorset';
import { getReplaceUrl } from '../../../../../util/window/getDevice';
import useWindowSize from '../../../../shared/hooks/useWindowSize';

import { ActiveFilter } from './ProductList';
import type { FilterGroup, PageType } from '../../types';

import { Reset } from '../../../../shared/icons';
import Button from '../../../../shared/components/Button/Button';

import FilterMenu from '../components/FilterMenu';
import FilterGroupItem from '../components/FilterGroupItem';
import ActiveFilterValueContainer from './ActiveFilterValueContainer';
import { UrlBasedFilter } from '../../shared/util/parseFilterData';
import { createFilterQueryString } from '../../shared/util/createFilterQueryString';
import { hiddenScrollBar } from '../../../../shared/utils/hidden-scrollbar';
import type { MainSite } from '../../../../main/interfaces/MainSection.interface';
import { useSearchProductsCount } from '../../../../search/hooks/useSearchProductsCount';
import { useCategoryAndCollectionProductsCount } from '../../hook/useCategoryAndCollectionProductsCount';
import { parseQueryString } from '../../../../shared/utils/parseQueryString';

const FILTER_NAVIGATOR_HEIGHT = 55;
const SORT_CONTAINER_HEIGHT = 44;
const SCROLL_PADDING_TOP_WITH_SORT = FILTER_NAVIGATOR_HEIGHT + SORT_CONTAINER_HEIGHT;

const Wrapper = styled.div`
  height: 570px;
  max-height: calc(var(--vh) * 100 - 44px);
  display: flex;
  flex-direction: column;
`;

const Title = styled.span`
  display: block;
  padding: 4px 0 10px 20px;
  font-weight: 600;
  font-size: 18px;
  color: ${COLOR.kurlyGray800};
  line-height: 22px;
`;

const GroupList = styled.ul<{ direction?: 'up' | 'down' }>`
  flex: 1;
  padding-bottom: 9px;
  ${hiddenScrollBar({ x: 'visible' })};
  scroll-padding-top: ${({ direction }) =>
    direction === 'up' ? SCROLL_PADDING_TOP_WITH_SORT : FILTER_NAVIGATOR_HEIGHT}px;
`;

const SvgReset = styled(Reset)`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 6px;
`;

const FilterSubmit = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  padding: 8px 12px;
  height: 68px;
`;

const ResetContainer = styled.div`
  display: flex;
  align-items: center;
  flex-basis: 86px;
  flex-shrink: 0;
  margin-right: 8px;
  padding-left: 10px;
  text-align: center;
`;

const ResetText = styled.span<{ isSelected: boolean }>`
  padding-left: 1px;
  font-weight: 600;
  font-size: 16px;
  color: ${({ isSelected }) => (isSelected ? COLOR.kurlyGray600 : COLOR.lightGray)};
  line-height: 20px;
`;

const ProductsViewLink = styled.div`
  flex: 1;
`;

interface Props {
  filterData: FilterGroup[];
  onClickShowProductsButton: () => void;
  selectedFilterKey: string;
  setSelectedFilterKey: React.Dispatch<React.SetStateAction<string>>;
  activeFilter: UrlBasedFilter;
  onActiveFilter: ({ filterGroupKey, template, filterKey, isActive }: ActiveFilter) => void;
  resetBottomSheetFilter: () => void;
  keyword?: string;
  section: PageType;
  code: string;
  currentSite?: MainSite;
}

function FilterContainer({
  filterData,
  onClickShowProductsButton,
  selectedFilterKey,
  setSelectedFilterKey,
  activeFilter,
  onActiveFilter,
  resetBottomSheetFilter,
  keyword,
  section,
  code: productListCode, // categoryNo or collectionName
  currentSite,
}: Props) {
  const router = useRouter();
  const { pathname, query } = router;
  const { qvt } = parseQueryString(query);
  const isSelected = !isEmpty(activeFilter);

  const [currentScrollPosition, setCurrentScrollPosition] = useState(0);
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('up');

  const { data: searchProductsCount, status: searchProductsCountStatus } = useSearchProductsCount({
    keyword: keyword || '',
    activeFilter: createFilterQueryString(activeFilter),
    currentSite: currentSite,
    qvt,
  });

  const { data: filteredProductsCount, status: productsCountStatus } = useCategoryAndCollectionProductsCount({
    section: section,
    code: productListCode,
    activeFilter: createFilterQueryString(activeFilter),
  });

  const { height: windowInnerHeight } = useWindowSize();

  const productsCount = section === 'search' ? searchProductsCount : filteredProductsCount;
  const countStatus = section === 'search' ? searchProductsCountStatus : productsCountStatus;
  const isValidProductsCount = !isUndefined(productsCount) && countStatus === 'success' && productsCount >= 0;
  const filteredProductsCountButtonText = `${productsCount}개 상품 보기`;
  const buttonText = isValidProductsCount ? filteredProductsCountButtonText : '상품 보기';

  const promotionValues =
    filterData.filter(({ template }: { template: string }) => eq(template, 'promotion'))[0]?.values || [];
  const hasPromotion = promotionValues.some(({ key }: { key: string }) => eq(key, selectedFilterKey));

  const filterGroupData = filterData.find(
    (filter) => filter.key === selectedFilterKey || (hasPromotion && eq(filter.template, 'promotion')),
  );

  const scrollRef = useRef<HTMLUListElement>(null);

  const handleScroll = debounce((scrollTop) => {
    setCurrentScrollPosition(scrollTop);
  }, 300);

  const handleClickShowProductsButton = () => {
    onClickShowProductsButton();
  };

  const pageScroll = (position: number) => {
    if (!scrollRef || !scrollRef.current) {
      return;
    }

    scrollRef.current.scrollTop = position;
  };

  useEffect(() => {
    const vh = windowInnerHeight * 0.01;
    if (vh > 0) {
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    }
  }, [windowInnerHeight]);

  useEffect(() => {
    if (selectedFilterKey === 'brand') {
      return;
    }

    pageScroll(0);
  }, [selectedFilterKey]);

  return (
    <Wrapper>
      <Title>필터</Title>
      <FilterMenu
        filterData={filterData}
        selectedFilterKey={selectedFilterKey}
        activeFilter={activeFilter}
        hasPromotion={hasPromotion}
        setSelectedFilterKey={setSelectedFilterKey}
      />
      {!!filterData && !!filterGroupData ? (
        <GroupList
          ref={scrollRef}
          direction={scrollDirection}
          onScroll={(event) => handleScroll(event.currentTarget.scrollTop)}
        >
          <FilterGroupItem
            filterGroup={filterGroupData}
            activeFilter={activeFilter}
            onActiveFilter={onActiveFilter}
            scrollPosition={currentScrollPosition}
            scrollDirection={scrollDirection}
            setScrollDirection={setScrollDirection}
          />
        </GroupList>
      ) : null}
      <ActiveFilterValueContainer
        activeFilter={activeFilter}
        onActiveFilter={onActiveFilter}
        isBottomSheet={true}
        filterData={filterData}
      />
      <FilterSubmit>
        <ResetContainer onClick={resetBottomSheetFilter}>
          <SvgReset width={15} height={15} stroke={isSelected ? COLOR.kurlyGray600 : COLOR.lightGray} />
          <ResetText isSelected={isSelected}>초기화</ResetText>
        </ResetContainer>
        <Link
          href={{
            pathname: getReplaceUrl(pathname),
            query: {
              ...query,
              filters: createFilterQueryString(activeFilter),
            },
          }}
          passHref
          replace
        >
          <ProductsViewLink>
            <Button
              text={buttonText}
              radius={6}
              onClick={handleClickShowProductsButton}
              isSubmitLoading={countStatus === 'loading'}
              theme={'primary'}
            />
          </ProductsViewLink>
        </Link>
      </FilterSubmit>
    </Wrapper>
  );
}

export default FilterContainer;
