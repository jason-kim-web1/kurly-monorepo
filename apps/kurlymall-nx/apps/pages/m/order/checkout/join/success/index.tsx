import { useRouter } from 'next/router';

import MobileNavigationBar from '../../../../../../src/header/containers/m/MobileNavigationBar';
import { BUTTON_TYPE } from '../../../../../../src/shared/services';
import SuccessContainer from '../../../../../../src/order/join/containers/SuccessContainer';
import useNavigator from '../../../../../../src/shared/hooks/useNavigator';

export default function SuccessPage() {
  const { isReady } = useRouter();
  const { goToHome: handleClickClose } = useNavigator();

  if (!isReady) {
    return null;
  }

  return (
    <>
      <MobileNavigationBar
        title="함께구매 공유하기"
        appNavigatorButtonType={BUTTON_TYPE.close}
        leftButtonType={BUTTON_TYPE.close}
        onClickLeftButton={handleClickClose}
      />
      <SuccessContainer />
    </>
  );
}
