import styled from '@emotion/styled';

import { useEffect, useState } from 'react';

import Link from 'next/link';

import { MEMBER_BENEFIT_NAVMENU } from '../../constants';
import COLOR from '../../../../shared/constant/colorset';
import { useScroll } from '../../../../shared/hooks';
import useBenefitsMenu from '../../hooks/useBenefitsMenu';
import { MEMBER_BENEFIT_PATH } from '../../../../shared/constant';

const CHANGE_SCROLLY = 500;

const Navigation = styled.div<{ isNavTopPosChange: boolean }>`
  position: fixed;
  top: ${({ isNavTopPosChange }) => (isNavTopPosChange ? 80 : 270)}px;
  left: 50%;
  min-width: 105px;
  margin-left: -605px;
  text-align: right;

  @media (max-width: 1100px) {
    left: 0;
    margin-left: 0;
  }
`;

const NavigationItem = styled.div<{ isActive: boolean }>`
  position: relative;
  margin-bottom: 16px;
  padding-right: 15px;
  font-size: 16px;
  color: ${({ isActive }) => (isActive ? COLOR.loversPurple : COLOR.kurlyGray450)};

  &:last-of-type {
    margin-bottom: 12px;
  }
  &::after {
    position: absolute;
    top: 7px;
    right: 0;
    width: 6px;
    height: 6px;
    border-radius: 100%;
    background-color: ${({ isActive }) => (isActive ? COLOR.loversFriends : COLOR.kurlyGray350)};
    content: '';
  }
`;

const NavigationSubItem = styled.div<{ isActive: boolean }>`
  margin-bottom: 10px;
  padding-right: 15px;
  font-size: 16px;
  color: ${({ isActive }) => (isActive ? '#a775d6' : COLOR.kurlyGray450)};
`;

export default function MemberBenefitNav() {
  const { id, activeName, paymentSubMenu, getMenuUrl, isShowSubMenu } = useBenefitsMenu();

  const { scrollY } = useScroll();

  const [isNavTopPosChange, setIsNavTopPosChange] = useState(false);

  useEffect(() => {
    if (scrollY > CHANGE_SCROLLY) {
      setIsNavTopPosChange(true);
    } else {
      setIsNavTopPosChange(false);
    }
  }, [scrollY]);

  return (
    <Navigation isNavTopPosChange={isNavTopPosChange}>
      {MEMBER_BENEFIT_NAVMENU.map(({ name, url }) => (
        <NavigationItem key={name} isActive={activeName === name}>
          <Link href={getMenuUrl(name, url)} passHref>
            {name}
          </Link>
        </NavigationItem>
      ))}
      {isShowSubMenu &&
        paymentSubMenu.map(({ paymentId, menu }) => (
          <NavigationSubItem key={paymentId} isActive={id === paymentId}>
            <Link href={`${MEMBER_BENEFIT_PATH.payment.uri}/${paymentId}`} passHref>
              {menu}
            </Link>
          </NavigationSubItem>
        ))}
    </Navigation>
  );
}
