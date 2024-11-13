import styled from '@emotion/styled';

import { useState } from 'react';

import { ArrowUp } from '../../../../shared/icons';
import COLOR from '../../../../shared/constant/colorset';
import FilterItem from './FilterItem';
import type { FilterGroup } from '../../types';
import FilterSelectPopup from '../containers/FilterSelectPopup';
import type { UrlBasedFilter } from '../../shared/util/parseFilterData';
import FilterNavigator from './FilterNavigator';
import { FILTER_TEMPLATE } from '../../types';

const GroupItem = styled.div`
  border-bottom: 1px solid ${COLOR.kurlyGray200};

  &:last-of-type {
    border-bottom: 0px;
  }
`;

const GroupTitleButton = styled.button`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 52px;
  overflow: hidden;
`;

const GroupTitle = styled.div`
  display: flex;
  align-items: center;
  font-weight: 500;
  font-size: 15px;
  line-height: 20px;
  color: ${COLOR.kurlyGray800};
`;

const GroupCount = styled.span`
  font-weight: 500;
  font-size: 12px;
  line-height: 20px;
  margin-left: 4px;
  color: ${COLOR.kurlyGray350};
`;

const IconArrow = styled(ArrowUp)`
  transition: transform 250ms ease-out;
`;

const FilterItemGroup = styled.nav`
  transition: all 250ms cubic-bezier(0.83, 0, 0.17, 1);
  height: auto;
  opacity: 0;
  overflow: hidden;
`;

const SortContainer = styled.menu<{ isVisibleNavigator: boolean }>`
  display: flex;
  gap: 12px;
  list-style-type: none;
  margin-bottom: ${({ isVisibleNavigator }) => (isVisibleNavigator ? '25px' : '16px')};
`;

const SortItem = styled.li`
  &:after {
    content: '';
    display: inline-block;
    width: 1px;
    height: 12px;
    margin-left: 12px;
    background-color: ${COLOR.kurlyGray200};
    font-size: 10px;
    vertical-align: -2px;
  }

  :last-of-type::after {
    display: none;
  }
`;

const SortButton = styled.button<{ isActive: boolean }>`
  font-size: 14px;
  color: ${({ isActive }) => (isActive ? COLOR.kurlyPurple : COLOR.kurlyGray800)};
  font-weight: ${({ isActive }) => (isActive ? 500 : 400)};
`;

const MoreButton = styled.button`
  width: 100%;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${COLOR.kurlyGray450};
  font-weight: 500;
  font-size: 12px;
  margin-bottom: 11px;
`;

const ArrowRight = styled(ArrowUp)`
  transform: rotate(90deg);
`;

interface Props {
  filterGroup: FilterGroup;
  activeFilter: UrlBasedFilter;
}

function checkFilterItemActive(activeFilter: UrlBasedFilter, groupKey: string, itemKey: string): boolean {
  if (activeFilter[groupKey]) {
    return activeFilter[groupKey].includes(itemKey);
  }
  return false;
}

export const FilterSortMenu = {
  alphabetically: {
    label: '가나다순',
    value: 'alphabetically',
  },
  quantity: {
    label: '상품 많은순',
    value: 'quantity',
  },
} as const;

export type SortType = keyof typeof FilterSortMenu;

export default function FilterGroupItem({ filterGroup, activeFilter }: Props) {
  const { key, name, template, groupByKey, groupByInitialCharacter, keyList, sortedKeyList } = filterGroup;
  const removedAllFromGroupByInitialCharacter = new Map(groupByInitialCharacter);
  removedAllFromGroupByInitialCharacter.delete('전체');
  const [isExpanded, setIsExpanded] = useState(true);
  const [activeSortType, setActiveSortType] = useState<SortType>(FilterSortMenu.alphabetically.value);
  const [isDialogFilter, setIsDialogFilter] = useState(false);
  const [navigatorKey, setNavigatorKey] = useState<{ key: string }>({ key: '전체' });

  const visibleKeyList =
    activeSortType === FilterSortMenu.alphabetically.value
      ? groupByInitialCharacter.get(navigatorKey.key)
      : sortedKeyList;
  const renderingKeyList = !!visibleKeyList ? visibleKeyList.slice(0, 10) : [];
  const activeFilterCountInGroup = activeFilter[key]?.length ?? 0;
  const isVisibleMoreButton = keyList.length > 10;
  const isVisibleNavigator =
    key === 'brand' && activeSortType === FilterSortMenu.alphabetically.value && groupByInitialCharacter.size > 2;

  const handleSortType = (sort: SortType) => {
    setActiveSortType(sort);
  };

  const handleDialogFilter = () => {
    setIsDialogFilter(!isDialogFilter);
  };

  return (
    <>
      <GroupItem>
        <GroupTitleButton onClick={() => setIsExpanded(!isExpanded)}>
          <GroupTitle>
            {name}
            {activeFilterCountInGroup > 0 ? <GroupCount>{activeFilterCountInGroup}</GroupCount> : null}
          </GroupTitle>
          <IconArrow style={{ transform: `rotate(${isExpanded ? 0 : 180}deg)` }} />
        </GroupTitleButton>
        <FilterItemGroup style={{ maxHeight: isExpanded ? '100vh' : 0, opacity: isExpanded ? 1 : 0 }}>
          {template === FILTER_TEMPLATE.SORTED_CHECKBOX ? (
            <SortContainer isVisibleNavigator={isVisibleNavigator}>
              {Object.values(FilterSortMenu).map(({ label, value }) => (
                <SortItem key={`${label}-${value}`}>
                  <SortButton isActive={value === activeSortType} onClick={() => handleSortType(value)}>
                    {label}
                  </SortButton>
                </SortItem>
              ))}
            </SortContainer>
          ) : null}
          {isVisibleNavigator ? (
            <FilterNavigator
              activeNavigatorKey={navigatorKey.key}
              groupByInitialCharacterKeys={Array.from(groupByInitialCharacter.keys())}
              onNavigatorKey={setNavigatorKey}
              isDialog={false}
            />
          ) : null}
          {renderingKeyList.map((filterKey) => (
            <FilterItem
              activeFilter={activeFilter}
              key={filterKey}
              filterGroupKey={key}
              template={template}
              filter={groupByKey[filterKey]}
              isActive={checkFilterItemActive(activeFilter, key, filterKey)}
            />
          ))}
          {isVisibleMoreButton ? (
            <MoreButton onClick={handleDialogFilter}>
              {name} 더보기 <ArrowRight />
            </MoreButton>
          ) : null}
        </FilterItemGroup>
      </GroupItem>
      <FilterSelectPopup
        open={isDialogFilter}
        filterData={filterGroup}
        activeFilter={activeFilter}
        defaultSortType={activeSortType}
        onChangeSortType={handleSortType}
        onDialogFilter={handleDialogFilter}
        groupByInitialCharacter={removedAllFromGroupByInitialCharacter}
        navigatorKey={navigatorKey}
        onNavigatorKey={setNavigatorKey}
      />
    </>
  );
}
