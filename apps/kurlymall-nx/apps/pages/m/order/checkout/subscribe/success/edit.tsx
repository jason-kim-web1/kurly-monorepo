import { useEffect } from 'react';

import { useDispatch } from 'react-redux';

import SuccessContainer from '../../../../../../src/order/subscribe/containers/SuccessContainer';
import MobileNavigationBar from '../../../../../../src/header/containers/m/MobileNavigationBar';

import { BUTTON_TYPE } from '../../../../../../src/shared/services';
import useNavigator from '../../../../../../src/shared/hooks/useNavigator';
import { setChangePayment } from '../../../../../../src/order/subscribe/reducers/subscribeResult.slice';

export default function EditSuccessPage() {
  const dispatch = useDispatch();
  const { goToMyMembership: handleClickClose } = useNavigator();

  useEffect(() => {
    dispatch(setChangePayment(true));
  }, [dispatch]);

  return (
    <>
      <MobileNavigationBar
        title="변경완료"
        leftButtonType="close"
        appNavigatorButtonType={BUTTON_TYPE.close}
        onClickLeftButton={handleClickClose}
      />
      <SuccessContainer />
    </>
  );
}
