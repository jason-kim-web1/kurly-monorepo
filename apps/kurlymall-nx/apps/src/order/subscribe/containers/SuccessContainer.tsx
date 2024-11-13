import styled from '@emotion/styled';

import { useEffect } from 'react';

import SuccessResult from '../components/SuccessResult';
import SuccessBilling from '../components/SuccessBilling';
import SuccessNotice from '../components/SuccessNotice';
import SuccessAction from '../components/SuccessAction';
import COLOR from '../../../shared/constant/colorset';
import { isPC, isWebview } from '../../../../util/window/getDevice';
import { ScreenName, amplitudeService } from '../../../shared/amplitude';
import { MembershipStatusChange } from '../../../shared/amplitude/events/order/MembershipStatusChange';
import appService from '../../../shared/services/app.service';
import { useScreenName } from '../../../shared/hooks';
import { useAppSelector } from '../../../shared/store';
import { Subscribe } from '../../../shared/branch/events/Subscribe';
import { branchService } from '../../../shared/branch';

const Wrapper = styled.div`
  max-width: 400px;
  padding: ${isPC ? '56px 30px 30px' : '56px 20px 0'};
  margin: 0 auto;
  background: ${COLOR.kurlyWhite};
`;

export default function SuccessContainer() {
  const { isChangePayment, couponPackId } = useAppSelector(({ subscribeResult }) => ({
    isChangePayment: subscribeResult.isChangePayment,
    couponPackId: subscribeResult.couponPackId,
  }));

  useScreenName(ScreenName.MEMBERSHIP_SUBSCRIBE_SUCCESS);

  useEffect(() => {
    if (isWebview()) {
      appService.refreshMypage();
    }

    if (!isChangePayment) {
      amplitudeService.logEvent(new MembershipStatusChange({ status_type: 'subscribe' }));
      if (couponPackId) {
        branchService.logEvent(new Subscribe({ description: couponPackId }));
      }
    }
  }, [couponPackId, isChangePayment]);

  return (
    <Wrapper>
      <SuccessResult />
      <SuccessBilling />
      <SuccessNotice />
      <SuccessAction />
    </Wrapper>
  );
}
