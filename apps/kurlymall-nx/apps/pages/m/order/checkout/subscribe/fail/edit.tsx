import { useRouter } from 'next/router';

import { useEffect } from 'react';

import { useDispatch } from 'react-redux';

import FailContainer from '../../../../../../src/order/subscribe/containers/FailContainer';
import MobileNavigationBar from '../../../../../../src/header/containers/m/MobileNavigationBar';

import useNavigator from '../../../../../../src/shared/hooks/useNavigator';
import { BUTTON_TYPE } from '../../../../../../src/shared/services';
import { setChangePayment } from '../../../../../../src/order/subscribe/reducers/subscribeResult.slice';

export default function EditFailPage() {
  const dispatch = useDispatch();
  const { goToMyMembership: handleClickClose } = useNavigator();
  const { isReady } = useRouter();

  useEffect(() => {
    dispatch(setChangePayment(true));
  }, [dispatch]);

  if (!isReady) {
    return null;
  }

  return (
    <>
      <MobileNavigationBar
        title="변경실패"
        leftButtonType="close"
        appNavigatorButtonType={BUTTON_TYPE.close}
        onClickLeftButton={handleClickClose}
      />
      <FailContainer />
    </>
  );
}
