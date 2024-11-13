import styled from '@emotion/styled';
import { isEqual } from 'lodash';

import type { ReviewFilterOptionItem, ReviewFilterType } from '../../../types';
import type { FilterDictionary } from '../../../m/ReviewFilterBottomSheet';
import { isNotEmpty } from '../../../../../../shared/utils/lodash-extends';
import { CheckBoxInactive } from '../../../../../../shared/icons';
import COLOR from '../../../../../../shared/constant/colorset';
import { ellipsisText, getFilterItemCheckBoxStrokeColor, getFilterItemCheckBoxFillColor } from '../../../utils';
import { compareCountWithLimit } from '../../../../../../shared/utils/compare';
import { REVIEW_LIMIT_COUNT } from '../../../../../../shared/constant';

const Wrapper = styled.div`
  padding-right: 10px;
`;

const ListWrap = styled.ul`
  width: 100%;
  max-height: 413px;
  padding: 0 20px 0 30px;
  overflow-y: auto;
  overscroll-behavior: contain;

  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background: ${COLOR.kurlyGray350};
    border: none;
    border-radius: 4px;
    min-height: 46%;
  }
  &::-webkit-scrollbar-button:vertical:start:decrement {
    display: block;
    height: 20px;
  }
`;

const FilterListItem = styled.li`
  &:first-of-type {
    padding-top: 13px;
  }
  &:last-of-type {
    padding-bottom: 13px;
  }
`;

const FilterListItemButton = styled.button`
  display: flex;
  padding: 7px 0;
  gap: 16px;
`;

const FilterContent = styled.div`
  text-align: left;
  line-height: 24px;
`;

const FilterText = styled.span<{ disabled: boolean }>`
  font-size: 14px;
  letter-spacing: -0.5px;
  color: ${({ disabled }) => (disabled ? COLOR.disabled : COLOR.kurlyGray800)};
  opacity: ${({ disabled }) => (disabled ? 0.8 : 1)};
`;

const FilterCount = styled.span<{ disabled: boolean }>`
  font-size: 12px;
  padding-left: 4px;
  color: ${({ disabled }) => (disabled ? COLOR.disabled : COLOR.kurlyGray350)};
`;

const DEAL_NAME_MAX_LENGTH = 49;

const getIsCheckedFilter = (activeFilterDictionary: FilterDictionary, code: string) =>
  isEqual(activeFilterDictionary[code], true);

interface Props {
  filterType: ReviewFilterType;
  filterDictionary: FilterDictionary;
  list: ReviewFilterOptionItem[];
  onClickFilterItem(filterType: ReviewFilterType, code: string): () => void;
}

export default function FilterList({ filterType, filterDictionary, list, onClickFilterItem }: Props) {
  return (
    <Wrapper>
      <ListWrap>
        {isNotEmpty(list)
          ? list.map(({ code, name, count, disabled = false }) => {
              const isChecked = getIsCheckedFilter(filterDictionary, code);
              return (
                <FilterListItem key={`${code}-${name}`}>
                  <FilterListItemButton type="button" onClick={onClickFilterItem(filterType, code)} disabled={disabled}>
                    <span>
                      <CheckBoxInactive
                        width={24}
                        height={24}
                        stroke={getFilterItemCheckBoxStrokeColor(isChecked, disabled)}
                        fill={getFilterItemCheckBoxFillColor(isChecked, disabled)}
                      />
                    </span>
                    <FilterContent>
                      <FilterText disabled={disabled}>
                        {ellipsisText(DEAL_NAME_MAX_LENGTH, name)}
                        <FilterCount disabled={disabled}>
                          {compareCountWithLimit(count, REVIEW_LIMIT_COUNT)}
                        </FilterCount>
                      </FilterText>
                    </FilterContent>
                  </FilterListItemButton>
                </FilterListItem>
              );
            })
          : null}
      </ListWrap>
    </Wrapper>
  );
}
