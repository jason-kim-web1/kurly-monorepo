import styled from '@emotion/styled';

import { css } from '@emotion/react';

import { Link } from 'react-scroll';

import COLOR from '../../../../../shared/constant/colorset';

import { ProductDetailContentType } from '../../../types';

const MenuWrapper = styled.li<{ selected: boolean }>`
  display: flex;
  flex: 1;
  background-color: ${COLOR.kurlyWhite};
  box-shadow: inset 0 -0.5px 0 0 ${COLOR.lightGray};

  :first-of-type {
    padding-left: 16px;
  }

  :last-of-type {
    padding-right: 16px;
  }
`;

const MenuInner = styled.span`
  position: relative;
  white-space: nowrap;
`;

const Bar = styled.span`
  position: absolute;
  left: -2px;
  bottom: -13px;
  width: calc(100% + 4px);
  height: 2px;
`;

const Menu = styled(Link)<{ selected: boolean }>`
  position: relative;
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 13px 0;
  background-color: ${COLOR.kurlyWhite};
  box-shadow: inset 0 -0.5px 0 0 ${COLOR.lightGray};

  ${({ selected }) =>
    selected &&
    css`
      ${Bar} {
        background-color: ${COLOR.kurlyPurple};
      }
    `};
`;

const Text = styled.span<{ selected: boolean }>`
  font-weight: ${({ selected }) => (selected ? '600' : '400')};
  font-size: 15px;
  color: ${({ selected }) => (selected ? `${COLOR.kurlyPurple}` : `${COLOR.kurlyGray600}`)};
`;

const Count = styled.span<{ selected: boolean }>`
  display: inline-block;
  padding-left: 4px;
  font-size: 12px;
  font-weight: ${({ selected }) => (selected ? '600' : '400')};
  color: ${({ selected }) => (selected ? COLOR.kurlyPurple : COLOR.kurlyGray450)};
  vertical-align: 1px;
`;

interface Props {
  name: string;
  value: ProductDetailContentType;
  selected: boolean;
  onClickContentMenu(content: ProductDetailContentType): void;
  navigatorOffsetTop: number;
  isCount?: boolean;
  count?: string;
}

export default function MenuItem({
  name,
  value,
  selected,
  onClickContentMenu,
  navigatorOffsetTop,
  isCount = false,
  count = '0',
}: Props) {
  return (
    <MenuWrapper selected={selected}>
      <Menu
        to="contentSection"
        offset={navigatorOffsetTop}
        onClick={() => onClickContentMenu(value)}
        selected={selected}
      >
        <MenuInner>
          <Text selected={selected}>{name}</Text>
          {isCount && count !== '0' && <Count selected={selected}>{count}</Count>}
          <Bar />
        </MenuInner>
      </Menu>
    </MenuWrapper>
  );
}
