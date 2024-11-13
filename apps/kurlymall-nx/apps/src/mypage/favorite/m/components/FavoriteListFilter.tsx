import styled from '@emotion/styled';

import { css } from '@emotion/react';

import COLOR from '../../../../shared/constant/colorset';
import { zIndex } from '../../../../shared/styles';
import { ArrowDown, ArrowUp } from '../../../../shared/icons';

import { filterType } from '../../shared/constants/favorite.constant';
import { FavoriteFilterType } from '../../shared/interfaces/interface';

import useToggle from '../../../../order/checkout/shared/hooks/useToggle';

import { getSortTypeName } from '../../shared/utils/favorite-utils';

const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-contents: center;
  align-items: center;
`;

const SortedTypeText = styled.div`
  font-size: 14px;
  color: ${COLOR.kurlyGray800};
  line-height: 18px;
`;

const SortTypeList = styled.div`
  z-index: ${zIndex.productSort};
  position: absolute;
  top: 30px;
  right: 0;
  border-radius: 6px;
  width: 104px;
  background-color: ${COLOR.kurlyWhite};
  box-shadow: 2px 2px 10px rgb(0 0 0 / 10%);
`;

const SortTypeItem = styled.div<{ isActivate: boolean }>`
  display: flex;
  padding: 15px 16px 14px 16px;
  align-items: center;
  height: 48px;

  ${({ isActivate }) =>
    isActivate &&
    css`
      color: ${COLOR.kurlyPurple};
      font-weight: 600;
      line-height: 19px;
    `}
`;

interface Props {
  sortType: FavoriteFilterType;
  changeSortType: (type: FavoriteFilterType) => void;
}

export default function FavoriteListFilter({ sortType, changeSortType }: Props) {
  const { toggle, isOpen } = useToggle();

  const sortTypeName = getSortTypeName(sortType);

  return (
    <Wrapper onClick={toggle}>
      <SortedTypeText>{sortTypeName}</SortedTypeText>
      {isOpen ? <ArrowUp stroke={COLOR.kurlyGray800} /> : <ArrowDown stroke={COLOR.kurlyGray800} />}
      {isOpen && (
        <SortTypeList>
          {filterType.map(({ type, name }) => {
            return (
              <SortTypeItem key={type} isActivate={name === sortTypeName} onClick={() => changeSortType(type)}>
                {name}
              </SortTypeItem>
            );
          })}
        </SortTypeList>
      )}
    </Wrapper>
  );
}
