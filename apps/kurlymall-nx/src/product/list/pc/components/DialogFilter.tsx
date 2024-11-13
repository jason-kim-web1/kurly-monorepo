import styled from '@emotion/styled';

import { Dispatch, SetStateAction, useCallback, useEffect, useRef, useState } from 'react';

import { cloneDeep, isEmpty } from 'lodash';

import { useRouter } from 'next/router';

import { hiddenScrollBar } from '../../../../shared/utils/hidden-scrollbar';
import { Close, Reset } from '../../../../shared/icons';
import Button from '../../../../shared/components/Button/Button';
import COLOR from '../../../../shared/constant/colorset';
import type { SortType } from './FilterGroupItem';
import { FilterSortMenu } from './FilterGroupItem';
import DialogFilterItem from './DialogFilterItem';
import { createFilterQueryString } from '../../shared/util/createFilterQueryString';
import FilterNavigator from './FilterNavigator';

import type { FilterGroup, FilterTemplate } from '../../types';
import { FILTER_TEMPLATE } from '../../types';
import type { UrlBasedFilter } from '../../shared/util/parseFilterData';
import { useIsOverflow } from '../../../../shared/hooks';

const HeaderFilter = styled.div`
  position: relative;
  padding-top: 30px;
  padding-bottom: 20px;
  display: flex;
  align-items: center;
  min-height: 50px;
  line-height: unset;
  flex-shrink: 0;
`;

const Title = styled.h3`
  margin-right: 14px;
  font-weight: 500;
  font-size: 24px;
  line-height: 39px;
  letter-spacing: -0.05em;
`;

const MenuSelect = styled.ul`
  display: flex;
`;

const MenuItem = styled.li`
  display: flex;
  padding-left: 12px;
  align-items: center;
  ::after {
    content: '';
    display: block;
    width: 1px;
    height: 12px;
    margin-left: 12px;
    background-color: ${COLOR.kurlyGray200};
  }
  :last-of-type::after {
    display: none;
  }
`;

const MenuButton = styled.button<{ isActive: boolean }>`
  display: block;
  font-size: 14px;
  line-height: 18px;
  ${({ isActive }) => isActive && `color: ${COLOR.kurlyPurple}; font-weight: 500;`}
`;

const CloseButton = styled.button`
  position: absolute;
  top: 30px;
  right: 6.5px;
`;

const Divider = styled.div`
  height: 1px;
  background-color: ${COLOR.bgLightGray};
  margin: 0px -30px;
`;

const FilterListWrapper = styled.ul<{ sortType: SortType }>`
  display: flex;
  flex-wrap: wrap;
  ${hiddenScrollBar()};
  max-height: 380px;
  margin-bottom: 56px;

  ${({ sortType }) =>
    sortType == 'alphabetically'
      ? `
      > li {
        > p {
         padding-top: 16px;
       }}`
      : `
      li:nth-child(-n+3) {
        margin-top: 12px;
      }
  `}
`;

const FilterListGroup = styled.li`
  width: 100%;
`;

const InitialCharacter = styled.p`
  display: block;
  font-weight: 500;
  font-size: 20px;
  letter-spacing: -0.05em;
  color: ${COLOR.kurlyGray800};
  margin-bottom: 2px;
  line-height: 25px;
`;

const FilterList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  align-items: stretch;
`;

const FooterFilter = styled.div`
  display: flex;
  justify-content: center;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  margin-bottom: 24px;
  background-color: ${COLOR.kurlyWhite};
`;

const ButtonSubmit = styled(Button)`
  > span {
    font-size: 14px;
  }
`;

const ResetButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 140px;
  height: 44px;
  margin-right: 8px;
  background-color: ${COLOR.kurlyWhite};
  border: 1px solid ${COLOR.lightGray};
  border-radius: 3px;
  text-align: center;
`;

const ResetText = styled.span<{ isResetable: boolean }>`
  margin-left: 5px;
  font-weight: 500;
  color: ${({ isResetable }) => (isResetable ? COLOR.kurlyGray600 : COLOR.lightGray)};
`;

function checkFilterItemActive(activeFilter: UrlBasedFilter, groupKey: string, itemKey: string): boolean {
  if (activeFilter[groupKey]) {
    return activeFilter[groupKey].includes(itemKey);
  }
  return false;
}

interface Props {
  filterData: FilterGroup;
  activeFilter: UrlBasedFilter;
  defaultSortType: SortType;
  onChangeSortType: (sort: SortType) => void;
  groupByInitialCharacter: Map<string, string[]>;
  navigatorKey: string;
  onNavigatorKey: Dispatch<SetStateAction<{ key: string }>>;

  onClose(): void;
}

export default function DialogFilter({
  filterData,
  activeFilter,
  defaultSortType,
  onChangeSortType,
  onClose,
  groupByInitialCharacter,
  navigatorKey: initialNavigatorKey,
  onNavigatorKey,
}: Props) {
  const router = useRouter();
  const { pathname, query } = router;
  const [activeSortType, setActiveSortType] = useState<SortType>(defaultSortType);
  const [dialogActiveFilter, setDialogActiveFilter] = useState(cloneDeep(activeFilter));
  const [navigatorKey, setNavigatorKey] = useState<{ key: string }>({ key: initialNavigatorKey });
  const filterListRef = useRef<HTMLUListElement>(null);
  const charElementListRef = useRef<HTMLSpanElement[]>([]);
  const { isOverflowY } = useIsOverflow({ ref: filterListRef });

  const visibleKeyList =
    activeSortType === FilterSortMenu.alphabetically.value ? filterData.keyList : filterData.sortedKeyList;
  const isResetable = dialogActiveFilter[filterData.key]?.length > 0;
  const isAlphabeticallyBrand =
    filterData.key === 'brand' &&
    activeSortType === FilterSortMenu.alphabetically.value &&
    groupByInitialCharacter.size > 1;
  const isVisibleNavigator = isAlphabeticallyBrand && isOverflowY;

  const handleDialogFilterItem = useCallback(
    (filterGroupKey: string, template: FilterTemplate, filterKey: string, isActive: boolean) => {
      const copiedFilter = cloneDeep(dialogActiveFilter);

      if (isActive) {
        const filterQuery = copiedFilter[filterGroupKey].filter((filterValue) => filterValue !== filterKey);
        copiedFilter[filterGroupKey] = filterQuery;
      } else {
        const filterQuery =
          template === FILTER_TEMPLATE.RADIO_BUTTON
            ? [filterKey]
            : [...(copiedFilter[filterGroupKey] || []), filterKey];
        copiedFilter[filterGroupKey] = filterQuery;
      }
      setDialogActiveFilter(copiedFilter);
    },
    [dialogActiveFilter],
  );

  const handleSortType = (sort: SortType) => {
    setActiveSortType(sort);
  };

  const handleSubmit = () => {
    const nextQueryString = createFilterQueryString(Object.assign(activeFilter, dialogActiveFilter));

    onNavigatorKey({ key: navigatorKey.key });
    onChangeSortType(activeSortType);
    onClose();
    router.push(
      {
        pathname,
        query: {
          ...query,
          page: 1,
          filters: nextQueryString,
        },
      },
      undefined,
      {
        scroll: isEmpty(nextQueryString) && !isEmpty(activeFilter),
      },
    );
  };

  useEffect(() => {
    if (activeSortType === FilterSortMenu.alphabetically.value) {
      const groupByInitialCharacterKeys = Array.from(groupByInitialCharacter.keys());
      const refIndex = groupByInitialCharacterKeys.indexOf(navigatorKey.key);

      if (refIndex === -1 || !charElementListRef.current[refIndex]) {
        return;
      }

      window.requestAnimationFrame(() => {
        charElementListRef.current[refIndex].scrollIntoView();
      });
    }
  }, [activeSortType, groupByInitialCharacter, navigatorKey]);

  useEffect(() => {
    if (activeSortType === FilterSortMenu.quantity.value && filterListRef?.current) {
      filterListRef.current.scrollTo(0, 0);
    }
  }, [activeSortType]);

  return (
    <>
      <HeaderFilter>
        <Title>{filterData.name}</Title>
        {filterData.template === FILTER_TEMPLATE.SORTED_CHECKBOX ? (
          <MenuSelect>
            {Object.values(FilterSortMenu).map(({ label, value }) => (
              <MenuItem key={`${label}-${value}`}>
                <MenuButton isActive={value === activeSortType} onClick={() => handleSortType(value)}>
                  {label}
                </MenuButton>
              </MenuItem>
            ))}
          </MenuSelect>
        ) : null}
        <CloseButton onClick={onClose}>
          <Close />
        </CloseButton>
      </HeaderFilter>
      {isVisibleNavigator ? (
        <FilterNavigator
          groupByInitialCharacterKeys={Array.from(groupByInitialCharacter.keys()).filter((key) => key !== '전체')}
          onNavigatorKey={setNavigatorKey}
          activeNavigatorKey={navigatorKey.key}
          isDialog={true}
        />
      ) : null}
      <Divider />
      <FilterListWrapper ref={filterListRef} sortType={activeSortType}>
        {isAlphabeticallyBrand ? (
          <>
            {Array.from(groupByInitialCharacter.keys())
              .filter((key) => key !== '전체')
              .map((initialCharacter, index) => (
                <FilterListGroup key={initialCharacter}>
                  <InitialCharacter
                    ref={(r) => {
                      if (r) {
                        charElementListRef.current[index] = r;
                      }
                    }}
                  >
                    {initialCharacter}
                  </InitialCharacter>
                  <FilterList>
                    {groupByInitialCharacter.get(initialCharacter)?.map((filterKey) => (
                      <DialogFilterItem
                        activeFilter={dialogActiveFilter}
                        key={filterKey}
                        filterGroupKey={filterData.key}
                        template={filterData.template}
                        filter={filterData.groupByKey[filterKey]}
                        isActive={checkFilterItemActive(dialogActiveFilter, filterData.key, filterKey)}
                        handleDialogFilterItem={handleDialogFilterItem}
                      />
                    ))}
                  </FilterList>
                </FilterListGroup>
              ))}
          </>
        ) : (
          <>
            {visibleKeyList.map((filterKey) => (
              <DialogFilterItem
                activeFilter={dialogActiveFilter}
                key={filterKey}
                filterGroupKey={filterData.key}
                template={filterData.template}
                filter={filterData.groupByKey[filterKey]}
                isActive={checkFilterItemActive(dialogActiveFilter, filterData.key, filterKey)}
                handleDialogFilterItem={handleDialogFilterItem}
              />
            ))}
          </>
        )}
      </FilterListWrapper>

      <FooterFilter>
        <ResetButton
          onClick={() =>
            setDialogActiveFilter({
              [filterData.key]: [],
            })
          }
          disabled={!isResetable}
        >
          <Reset width={12} height={12} stroke={isResetable ? COLOR.kurlyGray600 : COLOR.lightGray} />
          <ResetText isResetable={isResetable}>초기화</ResetText>
        </ResetButton>
        <ButtonSubmit text="확인" width={140} height={44} radius={3} onClick={() => handleSubmit()} />
      </FooterFilter>
    </>
  );
}
