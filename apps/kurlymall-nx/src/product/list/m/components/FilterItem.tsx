import styled from '@emotion/styled';

import { RefObject } from 'react';

import COLOR from '../../../../shared/constant/colorset';

import type { FilterTemplate, FilterValue } from '../../types';
import { FILTER_TEMPLATE } from '../../types';
import { multiMaxLineText } from '../../../../shared/utils';
import { CheckBoxActive, CheckBoxInactive, RadioButtonActive, RadioButtonInActive } from '../../../../shared/icons';
import { ActiveFilter } from '../containers/ProductList';

const FilterValueContainer = styled.li<{ isSortedCheckbox: boolean }>`
  display: flex;
  align-items: center;
  margin: 0 20px;
  padding: 11px 0;
  :first-of-type {
    padding-top: ${({ isSortedCheckbox }) => (!isSortedCheckbox ? 23 : 11)}px;
  }
`;

const FilterName = styled.span<{ isActive: boolean }>`
  font-weight: ${({ isActive }) => (isActive ? '600' : '400')};
  font-size: 15px;
  line-height: 17px;
  text-overflow: ellipsis;
  color: ${COLOR.kurlyGray800};
  ${multiMaxLineText(1)};
`;

const ValueCount = styled.span`
  flex-shrink: 0;
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  color: ${COLOR.kurlyGray350};
  margin: 1px 0 0 4px;
`;

const CheckBoxButton = styled.button`
  display: flex;
  align-items: center;
  margin-right: 8px;
`;

interface Props {
  onActiveFilter: ({ filterGroupKey, template, filterKey, isActive }: ActiveFilter) => void;
  filterGroupKey: string;
  template: FilterTemplate;
  filter: FilterValue;
  isActive: boolean;
  innerScrollRef?: RefObject<HTMLLIElement>;
}

export default function FilterItem({
  onActiveFilter,
  filterGroupKey,
  template,
  filter,
  isActive,
  innerScrollRef,
}: Props) {
  const { name, key, productCounts } = filter;

  return (
    <FilterValueContainer
      ref={innerScrollRef}
      isSortedCheckbox={template === FILTER_TEMPLATE.SORTED_CHECKBOX}
      onClick={() => onActiveFilter({ filterGroupKey, template, filterKey: key, isActive })}
    >
      <CheckBoxButton>
        {template === FILTER_TEMPLATE.CHECKBOX ||
        template === FILTER_TEMPLATE.SORTED_CHECKBOX ||
        template === FILTER_TEMPLATE.PROMOTION ? (
          isActive ? (
            <CheckBoxActive width={20} height={20} />
          ) : (
            <CheckBoxInactive width={20} height={20} />
          )
        ) : null}
        {template === FILTER_TEMPLATE.RADIO_BUTTON ? (
          isActive ? (
            <RadioButtonActive fillWhite={COLOR.kurlyWhite} fillPurple={COLOR.kurlyPurple} />
          ) : (
            <RadioButtonInActive />
          )
        ) : null}
      </CheckBoxButton>
      <FilterName isActive={isActive}>{name}</FilterName>
      {productCounts > 0 ? <ValueCount>{productCounts}</ValueCount> : null}
    </FilterValueContainer>
  );
}
