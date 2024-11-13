import styled from '@emotion/styled';

import { eq, includes, isArray, isEmpty, sortBy } from 'lodash';

import { Fragment, useState } from 'react';

import COLOR from '../../../../shared/constant/colorset';

import { FilterGroup } from '../../types';
import { UrlBasedFilter } from '../../shared/util/parseFilterData';

import { ArrowDown } from '../../../../shared/icons';

const Wrapper = styled.ul`
  display: flex;
  overflow-x: auto;
  overflow-y: hidden;
  margin-bottom: 15px;
  background-color: ${COLOR.kurlyWhite};
  &::-webkit-scrollbar {
    display: none;
  }
  li:first-of-type {
    margin-left: 16px;
  }
`;

const ProductButton = styled.li<{ hasSelectedFilter: boolean; isPromotion?: boolean; isIcon?: boolean }>`
  display: flex;
  flex-shrink: 0;
  flex-direction: row;
  align-items: center;
  padding: ${({ isIcon, isPromotion }) =>
    isIcon ? '10px 12px 10px 5px' : isPromotion ? '10px 14px' : '10px 9px 10px 14px'};
  margin-left: 8px;
  gap: 10px;
  height: 36px;
  font-size: 14px;
  line-height: 18px;
  background-color: ${COLOR.kurlyWhite};
  border: 1px solid ${({ hasSelectedFilter }) => (hasSelectedFilter ? COLOR.loversFriends : COLOR.kurlyGray200)};
  border-radius: 18px;
  ${({ isPromotion }) =>
    isPromotion &&
    `
    position: relative;
    margin-right: 8px;
    &::after {
      content: '';
      position: absolute;
      z-index: 1;
      right: -9px;
      width: 1px;
      height: 24px;
      background-color: ${COLOR.quickFilterPromotionDividerLine};
    }
  `};
`;

const QuickFilterItem = styled.button<{ hasSelectedFilter: boolean }>`
  display: flex;
  align-items: center;
  font-weight: ${({ hasSelectedFilter }) => (hasSelectedFilter ? 600 : 400)};
  color: ${({ hasSelectedFilter }) => (hasSelectedFilter ? COLOR.loversLavender : COLOR.kurlyGray600)};
  > svg {
    margin-left: 3px;
  }
`;

const QuickFilterCount = styled.span`
  color: ${COLOR.loversLavender};
  font-size: 12px;
  font-weight: 600;
  margin-left: 2px;
`;

const QuickFilterIcon = styled.img`
  width: 24px;
  height: 24px;
  margin-right: 4px;
  border-radius: 50%;
  object-fit: cover;
`;

interface Props {
  filterData: FilterGroup[];
  setQuickFilterKey: (key: string, valueKey?: string) => void;
  selectedFilterData: UrlBasedFilter;
}

interface QuickFilterItemProps {
  filterGroup: FilterGroup;
  selectedFilterData: UrlBasedFilter;
  hasMultipleOrNoQuickFilters?: boolean;
  handleClickQuickFilterKey: (filterGroupKey: string, valueKey?: string) => void;
}

const createProductButton = ({ filterGroup, selectedFilterData, handleClickQuickFilterKey }: QuickFilterItemProps) => {
  const isActive = !isEmpty(selectedFilterData[filterGroup.key]) ? true : false;

  return (
    <ProductButton hasSelectedFilter={isActive} onClick={() => handleClickQuickFilterKey(filterGroup.key)}>
      <QuickFilterItem hasSelectedFilter={isActive}>
        {filterGroup.name}
        {isActive ? <QuickFilterCount>{selectedFilterData[filterGroup.key].length}</QuickFilterCount> : null}
        <ArrowDown stroke={isActive ? COLOR.loversLavender : COLOR.kurlyGray600} />
      </QuickFilterItem>
    </ProductButton>
  );
};

const createPromotionProductButton = ({
  filterGroup,
  selectedFilterData,
  hasMultipleOrNoQuickFilters,
  handleClickQuickFilterKey,
}: QuickFilterItemProps) => {
  if (isEmpty(filterGroup.values)) {
    return null;
  }

  return filterGroup.values.map((value) => {
    const isActive = includes(selectedFilterData[filterGroup.key], value.key);
    const [hasIcon, setHasIcon] = useState(value.iconUrl);

    return (
      <ProductButton
        key={value.key}
        hasSelectedFilter={isActive}
        isIcon={!!hasIcon}
        isPromotion={hasMultipleOrNoQuickFilters}
        onClick={() => handleClickQuickFilterKey(filterGroup.key, value.key)}
      >
        <QuickFilterItem hasSelectedFilter={isActive}>
          {hasIcon ? <QuickFilterIcon src={hasIcon} alt="아이콘" onError={() => setHasIcon('')} /> : null}
          {value.name}
        </QuickFilterItem>
      </ProductButton>
    );
  });
};

export default function QuickFilter({ filterData, setQuickFilterKey, selectedFilterData }: Props) {
  const filteredAndSortedData = isArray(filterData)
    ? sortBy(filterData, [(item) => !eq(item.template, 'promotion')])
    : filterData;
  const hasMultipleOrNoQuickFilters = filteredAndSortedData.filter((filterGroup) => filterGroup.isQuick).length !== 1;
  const handleClickQuickFilterKey = (filterGroupKey: string, valueKey?: string) => {
    setQuickFilterKey(filterGroupKey, valueKey);
  };
  return (
    <Wrapper>
      {filteredAndSortedData.map((filterGroup, index) =>
        filterGroup.isQuick ? (
          <Fragment key={`${filterGroup.key}-${index}`}>
            {eq(filterGroup.template, 'promotion')
              ? createPromotionProductButton({
                  filterGroup,
                  selectedFilterData,
                  hasMultipleOrNoQuickFilters,
                  handleClickQuickFilterKey,
                })
              : createProductButton({ filterGroup, selectedFilterData, handleClickQuickFilterKey })}
          </Fragment>
        ) : null,
      )}
    </Wrapper>
  );
}
