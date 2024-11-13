import { useMemo } from 'react';

import { useScreenName } from '../../../src/shared/hooks';
import { ScreenName } from '../../../src/shared/amplitude';

import MobileHeader from '../../../src/shared/components/layouts/MobileHeader';
import HeaderButtons from '../../../src/shared/components/layouts/HeaderButtons';
import DeliveryLocationContainer from '../../../src/header/containers/m/DeliveryLocationContainer';
import CartButtonContainer from '../../../src/shared/containers/m/CartButtonContainer';
import AuthContainer from '../../../src/shared/components/Auth/AuthContainer';
import UserInfoContainer from '../../../src/mypage/info-section/containers/UserInfoContainer';
import UserMenu from '../../../src/shared/components/layouts/UserMenu';
import HeaderTitle from '../../../src/shared/components/layouts/HeaderTitle';

import { useAppSelector } from '../../../src/shared/store';

export default function MyKurly() {
  useScreenName(ScreenName.MY_KURLY);

  const site = useAppSelector(({ main }) => main.site);

  const { headerColor, titleColor }: { headerColor: 'purple' | 'white'; titleColor: 'white' | 'black' } = useMemo(
    () =>
      site === 'MARKET'
        ? { headerColor: 'purple', titleColor: 'white' }
        : { headerColor: 'white', titleColor: 'black' },
    [site],
  );

  return (
    <>
      <MobileHeader color={headerColor}>
        <HeaderTitle color={titleColor}>마이컬리</HeaderTitle>
        <HeaderButtons position="right">
          <DeliveryLocationContainer color={titleColor} />
          <CartButtonContainer color={titleColor} />
        </HeaderButtons>
      </MobileHeader>
      <AuthContainer loginRequired>
        <UserInfoContainer />
      </AuthContainer>
      <UserMenu />
    </>
  );
}
