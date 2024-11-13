import { MouseEvent, useState } from 'react';

import styled from '@emotion/styled';

import Menu from './Menu';

import { HamburgerMenu, HamburgerMenuOn } from '../../../shared/images';

import COLOR from '../../../shared/constant/colorset';

const CategoryMenu = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  :hover {
    cursor: pointer;
    > span:first-of-type {
      background: url(${HamburgerMenuOn}) no-repeat 0 0;
    }
    > span:last-of-type {
      color: ${COLOR.kurlyPurple};
    }
  }
`;

const Icon = styled.span`
  width: 16px;
  height: 14px;
  margin-right: 14px;
  background: url(${HamburgerMenu}) no-repeat 0 0;
  background-size: 16px 14px;
`;

const CategoryMenuText = styled.span`
  font-size: 16px;
  font-weight: 500;
  line-height: 20px;
  letter-spacing: -0.3px;
  color: ${COLOR.kurlyGray800};
`;

interface Props {
  onClick?(): void;
}

export default function Hamburger({ onClick }: Props) {
  const [menuOpened, setMenuOpened] = useState(false);

  const handleCategoryMouseEnter = () => {
    setMenuOpened(true);
  };

  const handleCategoryMouseLeave = (e: MouseEvent) => {
    e.stopPropagation();
    setMenuOpened(false);
  };

  return (
    <CategoryMenu onClick={onClick} onMouseEnter={handleCategoryMouseEnter} onMouseLeave={handleCategoryMouseLeave}>
      <Icon />
      <CategoryMenuText>카테고리</CategoryMenuText>
      {menuOpened && <Menu />}
    </CategoryMenu>
  );
}
