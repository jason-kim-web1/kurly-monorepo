import styled from '@emotion/styled';
import { css } from '@emotion/react';

import Link from 'next/link';

import HamburgerMenu from './HamburgerMenu/HamburgerMenu';

import COLOR from '../../shared/constant/colorset';
import { zIndex } from '../../shared/styles';
import DeliveryGuideLink from './DeliveryGuideLink';
import { MainTopNavigationOption } from '../../main/navigation';

const NavigationBar = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  width: 1050px;
  height: 56px;
  margin: 0 auto;
`;

const MenuBar = styled.ul`
  display: flex;
  margin-left: 30px;
`;

const Menu = styled.li`
  display: flex;
  justify-content: center;
  width: 150px;
  height: 55px;
  padding-top: 18px;
  line-height: 20px;
  text-align: center;
`;

const MenuHamburger = styled.div();

const MenuText = styled.span<{ isBold: boolean }>`
  height: fit-content;
  font-size: 16px;
  font-weight: 500;
  color: ${COLOR.kurlyGray800};
  cursor: pointer;

  :hover {
    color: ${COLOR.kurlyPurple};
    border-bottom: 1px solid ${COLOR.kurlyPurple};
  }
  ${({ isBold }) =>
    isBold &&
    `
    color: ${COLOR.kurlyPurple};
  `}
`;

const NavigationBarWrapper = styled.div<{ sticky: boolean }>`
  min-width: 1050px;
  letter-spacing: -0.3px;
  background-color: ${COLOR.kurlyWhite};
  position: relative;
  box-shadow: 0 3px 4px 0 rgba(0, 0, 0, 0.07);
  width: 100%;
  z-index: ${zIndex.globalNavigationBarNotSticky};
  ${({ sticky }) =>
    sticky &&
    css`
      position: fixed;
      z-index: ${zIndex.globalNavigationBarWrap};
      top: 0;
      left: 0;
      ${NavigationBar} {
        justify-content: flex-start;
      }
      ${MenuBar} {
        flex: 0 0;
      }
      ${Menu} {
        flex: 0 0 120px;
      }
      ${MenuHamburger} {
        flex: 0 0 120px;
      }
    `};
`;

const MenuActionWrapper = styled.div`
  display: flex;
  align-items: center;
`;

interface Props {
  activeId: number;
  sticky: boolean;
  options: MainTopNavigationOption[];
  onClickMainMenu(id: number): void;
}

export default function GlobalNavigationBar({ activeId, sticky, options, onClickMainMenu }: Props) {
  return (
    <>
      <NavigationBarWrapper sticky={sticky} id="header">
        <NavigationBar>
          <MenuHamburger>
            <HamburgerMenu />
          </MenuHamburger>
          <MenuBar>
            {options.map(({ idx, name, link }) => (
              <Link key={idx} href={link}>
                <Menu onClick={() => onClickMainMenu(idx ?? 0)}>
                  <MenuText isBold={idx === activeId}>{name}</MenuText>
                </Menu>
              </Link>
            ))}
          </MenuBar>
          {!sticky && (
            <MenuActionWrapper>
              <DeliveryGuideLink />
            </MenuActionWrapper>
          )}
        </NavigationBar>
      </NavigationBarWrapper>
    </>
  );
}
