import { useEffect } from 'react';

import { useScreenName, useWebview } from '../../../../src/shared/hooks';
import { ScreenName } from '../../../../src/shared/amplitude';

import MobileHeader from '../../../../src/shared/components/layouts/MobileHeader';
import HeaderButtons from '../../../../src/shared/components/layouts/HeaderButtons';
import BackButton from '../../../../src/shared/components/Button/BackButton';
import HeaderTitle from '../../../../src/shared/components/layouts/HeaderTitle';
import CartButtonContainer from '../../../../src/shared/containers/m/CartButtonContainer';

import ServiceCenterContainer from '../../../../src/mypage/service-center/containers/ServiceCenterContainer';
import { isWebview } from '../../../../util/window/getDevice';
import appService from '../../../../src/shared/services/app.service';
import UserMenu from '../../../../src/shared/components/layouts/UserMenu';

export default function ServiceCenterPage() {
  const webview = useWebview();

  useScreenName(ScreenName.SERVICE_CENTER);

  useEffect(() => {
    if (isWebview()) {
      appService.changeTitle('고객센터');
    }
  }, []);

  return (
    <>
      {!webview && (
        <MobileHeader>
          <HeaderButtons position="left">
            <BackButton />
          </HeaderButtons>
          <HeaderTitle>고객센터</HeaderTitle>
          <HeaderButtons position="right">
            <CartButtonContainer />
          </HeaderButtons>
        </MobileHeader>
      )}

      <ServiceCenterContainer />

      {!webview && <UserMenu />}
    </>
  );
}
