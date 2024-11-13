import styled from '@emotion/styled';

import Link from 'next/link';

import { css } from '@emotion/react';

import { MEMBER_BENEFIT_NAVMENU } from '../../constants';
import COLOR from '../../../../shared/constant/colorset';
import useBenefitsMenu from '../../hooks/useBenefitsMenu';
import { MEMBER_BENEFIT_PATH } from '../../../../shared/constant';

const bundleStyle = styled.div`
  display: flex;
  overflow: auto hidden;
  scroll-snap-type: x mandatory;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const NavigationBundle = styled(bundleStyle)`
  position: relative;
  justify-content: space-between;
  gap: 16px;
  padding: 0 25px;

  &::after {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 1px;
    background-color: #eceff3;
    content: '';
  }
`;

const NavigationItem = styled.div<{ isActive: boolean }>`
  position: relative;
  color: ${({ isActive }) => (isActive ? COLOR.benefitGray : COLOR.benefitTextGray)};
  font-weight: ${({ isActive }) => (isActive ? 600 : 400)};

  &::after {
    ${({ isActive }) =>
      isActive &&
      css`
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 1;
        height: 2px;
        background-color: ${COLOR.benefitGray};
        content: '';
      `}
  }
`;

const MenuLink = styled.a`
  display: block;
  height: 46px;
  font-size: 16px;
  line-height: 46px;
  letter-spacing: -0.4px;
  white-space: nowrap;
`;

const NavigationSubBundle = styled(bundleStyle)`
  background-color: ${COLOR.kurlyPurple};
`;

const NavigationSubItem = styled.div<{ isActive: boolean }>`
  flex: 1 0 29%;
  color: ${({ isActive }) => (isActive ? '#fff' : 'rgba(255, 255, 255, 0.6)')};
`;

const SubLink = styled.a`
  display: block;
  height: 44px;
  line-height: 46px;
  text-align: center;
`;

export default function MemberBenefitNav() {
  const { id, activeName, paymentSubMenu, getMenuUrl, isShowSubMenu } = useBenefitsMenu();

  return (
    <>
      <NavigationBundle>
        {MEMBER_BENEFIT_NAVMENU.map(({ name, url }) => (
          <NavigationItem key={name} isActive={activeName === name}>
            <Link href={getMenuUrl(name, url)} passHref>
              <MenuLink>{name}</MenuLink>
            </Link>
          </NavigationItem>
        ))}
      </NavigationBundle>
      {isShowSubMenu && (
        <NavigationSubBundle>
          {paymentSubMenu.map(({ paymentId, menu }) => (
            <NavigationSubItem key={paymentId} isActive={id === paymentId}>
              <Link href={`${MEMBER_BENEFIT_PATH.payment.uri}/${paymentId}`} passHref>
                <SubLink>{menu}</SubLink>
              </Link>
            </NavigationSubItem>
          ))}
        </NavigationSubBundle>
      )}
    </>
  );
}
