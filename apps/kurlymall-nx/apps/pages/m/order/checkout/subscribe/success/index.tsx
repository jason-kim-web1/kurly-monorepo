import SuccessContainer from '../../../../../../src/order/subscribe/containers/SuccessContainer';
import MobileNavigationBar from '../../../../../../src/header/containers/m/MobileNavigationBar';

import { BUTTON_TYPE } from '../../../../../../src/shared/services';
import { useAppSelector } from '../../../../../../src/shared/store';
import useResultButton from '../../../../../../src/order/subscribe/hooks/useResultButton';

export default function SuccessPage() {
  const isQuickSubscribe = useAppSelector(({ subscribeResult }) => subscribeResult.isQuickSubscribe);
  const { handleClickGoToOrder, handleClickMyMembership } = useResultButton();

  return (
    <>
      <MobileNavigationBar
        title="결제완료"
        leftButtonType="close"
        appNavigatorButtonType={BUTTON_TYPE.close}
        onClickLeftButton={isQuickSubscribe ? handleClickGoToOrder : handleClickMyMembership}
      />
      <SuccessContainer />
    </>
  );
}
