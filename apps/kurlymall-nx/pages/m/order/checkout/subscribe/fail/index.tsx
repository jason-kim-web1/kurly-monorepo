import { useRouter } from 'next/router';

import FailContainer from '../../../../../../src/order/subscribe/containers/FailContainer';
import MobileNavigationBar from '../../../../../../src/header/containers/m/MobileNavigationBar';

import { BUTTON_TYPE } from '../../../../../../src/shared/services';
import { useAppSelector } from '../../../../../../src/shared/store';
import useResultButton from '../../../../../../src/order/subscribe/hooks/useResultButton';

export default function FailPage() {
  const { isReady } = useRouter();
  const isQuickSubscribe = useAppSelector(({ subscribeResult }) => subscribeResult.isQuickSubscribe);
  const { handleClickGoToOrder, handleClickMembership } = useResultButton();

  if (!isReady) {
    return null;
  }

  return (
    <>
      <MobileNavigationBar
        title="결제실패"
        leftButtonType="close"
        appNavigatorButtonType={BUTTON_TYPE.close}
        onClickLeftButton={isQuickSubscribe ? handleClickGoToOrder : handleClickMembership}
      />
      <FailContainer />
    </>
  );
}
