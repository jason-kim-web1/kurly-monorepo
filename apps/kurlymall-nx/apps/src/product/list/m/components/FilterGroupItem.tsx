import styled from '@emotion/styled';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { head, isUndefined } from 'lodash';

import COLOR from '../../../../shared/constant/colorset';

import { FILTER_TEMPLATE, FilterGroup } from '../../types';
import { UrlBasedFilter } from '../../shared/util/parseFilterData';

import FilterItem from './FilterItem';
import FilterNavigator from './FilterNavigator';

import { ActiveFilter } from '../containers/ProductList';
import type { SortType } from '../../pc/components/FilterGroupItem';
import { FilterSortMenu } from '../../pc/components/FilterGroupItem';
import { MOBILE_WEB_VISIBLE_KEY_LIST_MIN_LENGTH } from '../../shared/constants';

const SortContainer = styled.ul`
  display: flex;
  position: sticky;
  top: 0;
  transition: 0.3s ease-in-out;
  gap: 12px;
  list-style-type: none;
  margin-left: 10px;
  padding: 20px 0 10px 10px;
  background-color: ${COLOR.kurlyWhite};
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

const SortButton = styled.a<{ isActive: boolean }>`
  display: inline-block;
  font-size: 14px;
  color: ${COLOR.kurlyGray800};
  line-height: 18px;
  white-space: nowrap;
  ${({ isActive }) => (isActive ? `font-weight: 600; color: ${COLOR.kurlyPurple};` : '')}
`;

function checkFilterItemActive(activeFilter: UrlBasedFilter, groupKey: string, itemKey: string): boolean {
  if (activeFilter[groupKey]) {
    return activeFilter[groupKey].includes(itemKey);
  }
  return false;
}

const INTERNAL_UNSET_STATUS = 'INTERNAL_UNSET_STATUS';

interface Props {
  filterGroup: FilterGroup;
  activeFilter: UrlBasedFilter;
  onActiveFilter: ({ filterGroupKey, template, filterKey, isActive }: ActiveFilter) => void;
  scrollPosition: number;
  scrollDirection: 'up' | 'down';
  setScrollDirection: React.Dispatch<React.SetStateAction<'up' | 'down'>>;
}

function FilterGroupItem({
  filterGroup,
  activeFilter,
  onActiveFilter,
  scrollPosition,
  scrollDirection,
  setScrollDirection,
}: Props) {
  const { key, template, groupByKey, groupByInitialCharacter, keyList, sortedKeyList } = filterGroup;
  const innerScrollRef = useRef<HTMLLIElement>(null);
  const activeFilterTriggerRef = useRef<boolean>(false);
  const prevTemplateRef = useRef(template);
  const activeSortTypeTriggerRef = useRef<boolean>(false);
  const templateOverWriteRef = useRef<boolean>(false);
  const [activeSortType, setActiveSortType] = useState<SortType>(FilterSortMenu.alphabetically.value);
  groupByInitialCharacter.delete('전체');
  const [selectedInitialCharacter, setSelectedInitialCharacter] = useState(INTERNAL_UNSET_STATUS);
  const [scrollInnerHeight, setScrollInnerHeight] = useState(0);
  const visibleKeyList = useMemo(() => {
    if (activeSortType !== 'alphabetically' && template === FILTER_TEMPLATE.SORTED_CHECKBOX) {
      return sortedKeyList;
    }
    return keyList;
  }, [activeSortType, template, keyList, sortedKeyList]);

  const handleChangeActiveSortType = useCallback(
    (sortType: SortType) => () => {
      if (activeSortType === sortType) {
        return;
      }
      setActiveSortType(sortType);
      activeSortTypeTriggerRef.current = true;
    },
    [activeSortType],
  );

  const getFirstItem = (initialCharacter: string) => {
    const firstItem = head(groupByInitialCharacter.get(initialCharacter) ?? []);

    if (isUndefined(firstItem)) {
      return head(head(Array.from(groupByInitialCharacter.values())) ?? []);
    }

    return firstItem;
  };

  const activeInitialCharacter = () => {
    return getFirstItem(selectedInitialCharacter);
  };

  const handleActiveInitialCharacter = (char: string) => {
    if (!groupByInitialCharacter) {
      return;
    }

    activeFilterTriggerRef.current = true;

    if (selectedInitialCharacter === char) {
      innerScrollRef.current?.scrollIntoView();
      return;
    }

    setSelectedInitialCharacter(char);
  };

  const handleChangeTemplate = useCallback(() => {
    if (template !== FILTER_TEMPLATE.SORTED_CHECKBOX) {
      return;
    }
    templateOverWriteRef.current = true;
    setScrollDirection('up');
    if (selectedInitialCharacter !== INTERNAL_UNSET_STATUS) {
      return;
    }
    setSelectedInitialCharacter(head(Array.from(groupByInitialCharacter.keys())) ?? '');
  }, [template, selectedInitialCharacter, groupByInitialCharacter, setScrollDirection]);

  useEffect(() => {
    if (!innerScrollRef || !innerScrollRef.current) {
      return;
    }

    if (activeSortType === FilterSortMenu.alphabetically.value) {
      innerScrollRef.current.scrollIntoView();
      return;
    }
    if (!!innerScrollRef.current.parentElement) {
      innerScrollRef.current.parentElement.scrollTo(0, 0);
    }
  }, [selectedInitialCharacter, innerScrollRef, activeSortType]);

  useEffect(() => {
    if (activeSortType !== FilterSortMenu.alphabetically.value) {
      return;
    }

    if (!activeFilterTriggerRef.current && !activeSortTypeTriggerRef.current && !templateOverWriteRef.current) {
      setScrollDirection(scrollPosition > scrollInnerHeight ? 'down' : 'up');
    }

    if (templateOverWriteRef.current) {
      setScrollDirection('up');
    }
    setScrollInnerHeight(scrollPosition);
    activeFilterTriggerRef.current = false;
    activeSortTypeTriggerRef.current = false;
    templateOverWriteRef.current = false;
  }, [scrollPosition]);

  useEffect(() => {
    if (key !== 'brand') {
      return;
    }

    if (!innerScrollRef || !innerScrollRef.current) {
      return;
    }

    if (activeSortType === FilterSortMenu.alphabetically.value) {
      innerScrollRef.current.scrollIntoView();
    }
  }, [key, activeSortType]);

  useEffect(() => {
    handleChangeTemplate();
    prevTemplateRef.current = template;
  }, [handleChangeTemplate]);

  return (
    <>
      {template === FILTER_TEMPLATE.SORTED_CHECKBOX && (
        <>
          <SortContainer>
            {Object.values(FilterSortMenu).map(({ label, value }) => (
              <SortItem key={`${label}-${value}`}>
                <SortButton isActive={value === activeSortType} onClick={handleChangeActiveSortType(value)}>
                  {label}
                </SortButton>
              </SortItem>
            ))}
          </SortContainer>
          {activeSortType === FilterSortMenu.alphabetically.value &&
          !!groupByInitialCharacter &&
          visibleKeyList.length >= MOBILE_WEB_VISIBLE_KEY_LIST_MIN_LENGTH ? (
            <FilterNavigator
              scrollDirection={scrollDirection}
              filterGroupedByInitialCharacter={Array.from(groupByInitialCharacter.keys())}
              onActiveInitialCharacter={handleActiveInitialCharacter}
              activeInitialCharacter={selectedInitialCharacter}
            />
          ) : null}
        </>
      )}
      {visibleKeyList.map((filterKey) => (
        <FilterItem
          innerScrollRef={filterKey === activeInitialCharacter() ? innerScrollRef : undefined}
          onActiveFilter={onActiveFilter}
          key={filterKey}
          filterGroupKey={key}
          template={template}
          filter={groupByKey[filterKey]}
          isActive={checkFilterItemActive(activeFilter, key, filterKey)}
        />
      ))}
    </>
  );
}

export default FilterGroupItem;
