import { useEffect } from 'react';

import { useDispatch } from 'react-redux';

import FailContainer from '../../../../../src/order/subscribe/containers/FailContainer';
import COLOR from '../../../../../src/shared/constant/colorset';
import SubPageLayout from '../../../../../src/shared/components/layouts/SubPageLayout';
import AuthContainer from '../../../../../src/shared/components/Auth/AuthContainer';
import { setChangePayment } from '../../../../../src/order/subscribe/reducers/subscribeResult.slice';

const styles = {
  layout: {
    background: COLOR.bgLightGray,
  },
};

export default function EditFailPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setChangePayment(true));
  }, [dispatch]);

  return (
    <SubPageLayout css={styles.layout}>
      <AuthContainer loginRequired>
        <FailContainer />
      </AuthContainer>
    </SubPageLayout>
  );
}
