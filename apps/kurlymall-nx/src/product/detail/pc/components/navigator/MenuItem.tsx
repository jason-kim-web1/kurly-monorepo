import styled from '@emotion/styled';

import { Link } from 'react-scroll';

import COLOR from '../../../../../shared/constant/colorset';
import { addComma } from '../../../../../shared/services';
import { speed } from '../../../../../shared/styles';
import type { ProductDetailMenuType } from '../../../types';

const MenuWrapper = styled.li`
  display: flex;
  flex: 1;
  border-width: 1px 0 1px 1px;
  border-color: ${COLOR.kurlyGray200};
  border-style: solid;
  background-color: ${COLOR.kurlyGray100};

  :last-of-type {
    border-right-width: 1px;
  }

  .name {
    font-size: 16px;
    font-weight: 500;
    color: ${COLOR.kurlyGray600};
  }
  .count {
    margin-left: 4px;
    font-size: 14px;
    font-weight: 400;
    color: ${COLOR.kurlyGray450};
    line-height: 16px;
  }

  &:has(.active) {
    border-width: 1px 0 0 1px;
  }

  .active {
    background-color: ${COLOR.kurlyWhite};
    .name,
    .count {
      color: ${COLOR.kurlyPurple};
    }
  }
`;

const Menu = styled(Link)`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const DEFAULT_ACTIVE_OFFSET = -140;

interface Props {
  name: string;
  target: ProductDetailMenuType;
  onClickMenu: (content: ProductDetailMenuType) => void;
  isCount?: boolean;
  count?: number;
  scrollOffset?: number;
}

export default function MenuItem({
  name,
  target,
  onClickMenu,
  isCount = false,
  count = 0,
  scrollOffset = DEFAULT_ACTIVE_OFFSET,
}: Props) {
  return (
    <MenuWrapper>
      <Menu
        to={target}
        activeClass="active"
        spy
        offset={scrollOffset}
        duration={speed.scroll}
        onClick={() => onClickMenu(target)}
      >
        <span className="name">{name}</span>
        {isCount && count !== 0 && <span className="count">({addComma(count)})</span>}
      </Menu>
    </MenuWrapper>
  );
}
