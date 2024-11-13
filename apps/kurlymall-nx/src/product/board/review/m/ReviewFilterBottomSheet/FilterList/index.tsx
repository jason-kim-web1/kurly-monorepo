import styled from '@emotion/styled';
import { isEmpty, size } from 'lodash';
import { useState, useEffect } from 'react';

import { CheckBoxInactive } from '../../../../../../shared/icons';
import COLOR from '../../../../../../shared/constant/colorset';
import type { FilterListItemProp } from '../index';
import { hiddenScrollBar } from '../../../../../../shared/utils/hidden-scrollbar';
import SkeletonLoading from '../../../../../../shared/components/Loading/SkeletonLoading';
import Repeat from '../../../../../../shared/components/Repeat';
import { ellipsisText, getFilterItemCheckBoxStrokeColor, getFilterItemCheckBoxFillColor } from '../../../utils';
import { checkBrowserEnvironment } from '../../../../../../shared/utils/checkBrowserEnvironment';
import { compareCountWithLimit } from '../../../../../../shared/utils/compare';
import { REVIEW_LIMIT_COUNT } from '../../../../../../shared/constant';

const Wrap = styled.div`
  padding: 0 20px;
  flex-grow: 1;
  ${hiddenScrollBar({ x: 'visible' })};
  overscroll-behavior: contain;
`;

const ListWrap = styled.ul`
  display: flex;
  flex-direction: column;
`;

const FilterListItem = styled.li`
  &:first-of-type {
    padding-top: 12px;
  }
`;

const FilterListItemButton = styled.button`
  padding: 11px 0;
  width: 100%;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const FilterContent = styled.p`
  line-height: 21px;
  overflow: hidden;
  text-align: left;
`;

const FilterCheckBoxIconWrap = styled.div`
  flex-shrink: 0;
  line-height: 0;
  align-self: baseline;
`;

const FilterName = styled.span<{ disabled: boolean }>`
  font-size: 15px;
  color: ${({ disabled }) => (disabled ? COLOR.kurlyGray350 : COLOR.kurlyGray800)};
`;

const FilterCount = styled.span`
  flex-shrink: 0;
  font-size: 12px;
  color: ${COLOR.kurlyGray350};
  align-self: flex-end;
  margin-left: 4px;
`;

const FilterListSkeletonItem = () => (
  <FilterListItem>
    <FilterListItemButton disabled>
      <SkeletonLoading width={25} height={20} />
      <SkeletonLoading height={20} />
    </FilterListItemButton>
  </FilterListItem>
);

// NOTE: 가로너비가 375 인 화면 기준
const DEFAULT_ELLIPSIS_TEXT_LENGTH = 45;
const VISIBLE_TEXT_WIDTH_RATIO = 9.1;
const calcVisibleTextLength = (width: number) => Math.floor(width / VISIBLE_TEXT_WIDTH_RATIO);

interface Props {
  isLoading: boolean;
  list: FilterListItemProp[];
  onClickFilterItem(code: string): () => void;
}

export const FilterList = ({ isLoading, list, onClickFilterItem }: Props) => {
  const isFilterListEmpty = isEmpty(list);
  const [ellipsisTextLength, setEllipsisTextLength] = useState(
    window ? calcVisibleTextLength(window.innerWidth) : DEFAULT_ELLIPSIS_TEXT_LENGTH,
  );
  const handleResize = () => {
    const nextWidth = calcVisibleTextLength(window.innerWidth);
    setEllipsisTextLength(nextWidth);
  };

  useEffect(() => {
    if (!checkBrowserEnvironment()) {
      return;
    }
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <Wrap>
      <ListWrap>
        {isLoading ? (
          <Repeat count={8}>
            <FilterListSkeletonItem />
          </Repeat>
        ) : null}
        {!isFilterListEmpty
          ? list.map(({ code, name, count, active, disabled = false }, index) => {
              const countText = compareCountWithLimit(count, REVIEW_LIMIT_COUNT);
              const actualNameLength = ellipsisTextLength - size(countText);
              return (
                <FilterListItem key={`${code}-${index}`}>
                  <FilterListItemButton type="button" onClick={onClickFilterItem(code)} disabled={disabled}>
                    <FilterCheckBoxIconWrap>
                      <CheckBoxInactive
                        width={24}
                        height={24}
                        stroke={getFilterItemCheckBoxStrokeColor(active, disabled)}
                        fill={getFilterItemCheckBoxFillColor(active, disabled)}
                      />
                    </FilterCheckBoxIconWrap>
                    <FilterContent>
                      <FilterName disabled={disabled}>{ellipsisText(actualNameLength, name)}</FilterName>
                      <FilterCount>{countText}</FilterCount>
                    </FilterContent>
                  </FilterListItemButton>
                </FilterListItem>
              );
            })
          : null}
      </ListWrap>
    </Wrap>
  );
};
