import PickupDetailContainer from '../../../../../src/order/checkout/m/containers/PickupDetailContainer';

import { WebviewServerSideProps, getWebviewServerSidePropsWithRefreshToken } from '../../../../../src/server/webview';
import MobileNavigationBar from '../../../../../src/header/containers/m/MobileNavigationBar';
import { BUTTON_TYPE } from '../../../../../src/shared/services';
import { useAppToken } from '../../../../../src/shared/hooks/useAppToken';
import AuthContainer from '../../../../../src/shared/components/Auth/AuthContainer';
import { PICKUP_PLACE_SELECT_TEXT } from '../../../../../src/order/shared/shared/constants';
import { NaverMapContextProvider } from '../../../../../src/shared/context/NaverMapContext/NaverMapContext';
import { PickupDetailProvider } from '../../../../../src/order/checkout/shared/context/PickupDetailContext';

export default function PickupDetail({ accessToken }: WebviewServerSideProps) {
  const { appToken } = useAppToken({ accessToken });

  return (
    <>
      <MobileNavigationBar title={PICKUP_PLACE_SELECT_TEXT} leftButtonType={BUTTON_TYPE.back} hideBottomLine />
      <AuthContainer loginRequired appToken={appToken}>
        <NaverMapContextProvider>
          <PickupDetailProvider>
            <PickupDetailContainer />
          </PickupDetailProvider>
        </NaverMapContextProvider>
      </AuthContainer>
    </>
  );
}

export const getServerSideProps = getWebviewServerSidePropsWithRefreshToken();
