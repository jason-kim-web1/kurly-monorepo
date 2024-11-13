import styled from '@emotion/styled';

import { css } from '@emotion/react';

import COLOR from '../../../../shared/constant/colorset';
import { FavoriteFilterProps } from '../../shared/interfaces/interface';
import { filterType } from '../../shared/constants/favorite.constant';
import { getSortTypeName } from '../../shared/utils/favorite-utils';

const Wrapper = styled.div`
  display: flex;

  > div {
    position: relative;

    :first-of-type {
      padding-right: 8px;

      ::after {
        position: absolute;
        right: 0;
        top: 3px;
        content: '';
        width: 1px;
        height: 15px;
        background-color: ${COLOR.kurlyGray200};
      }
    }

    :last-of-type {
      padding-left: 8px;
    }
  }
`;

const SortTypeText = styled.span<{ isActivate: boolean }>`
  color: ${COLOR.kurlyGray450};
  line-height: 20px;
  font-weight: 400;

  ${({ isActivate }) =>
    isActivate &&
    css`
      color: ${COLOR.kurlyGray800};
      font-weight: 500;
    `}
`;

export default function FavoriteListFilter({ sortType, changeSortType }: FavoriteFilterProps) {
  const sortTypeName = getSortTypeName(sortType);

  return (
    <Wrapper>
      {filterType.map(({ type, name }) => {
        return (
          <div key={type}>
            <SortTypeText isActivate={name === sortTypeName} onClick={() => changeSortType(type)}>
              {name}
            </SortTypeText>
          </div>
        );
      })}
    </Wrapper>
  );
}
