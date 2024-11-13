import { useEffect } from 'react';

import styled from '@emotion/styled';

import { useDispatch } from 'react-redux';

import { css } from '@emotion/react';

import RecurringPayment from '../components/RecurringPayment';
import Payment from '../components/Payment';
import SubmitButton from '../components/SubmitButton';
import KurlyMembersTerms from '../components/KurlyMembersTerms';
import KurlyMembersInformation from '../components/KurlyMembersInformation';

import { isPC } from '../../../../util/window/getDevice';
import COLOR from '../../../shared/constant/colorset';

import { useScreenName } from '../../../shared/hooks';
import { ScreenName } from '../../../shared/amplitude';
import PaymentProcess from '../../checkout/shared/components/PaymentProcess';
import { setChangePayment } from '../reducers/subscribeCheckout.slice';
import KurlyMembersCoupon from '../components/KurlyMembersCoupon';
import { branchService } from '../../../shared/branch';
import { AchieveLevel } from '../../../shared/branch/events/AchieveLevel';
import { ignoreError } from '../../../shared/utils/general';
import Pixel from '../../../shared/pixel/PixelService';
import { PIXEL_EVENT_TITLE } from '../../../shared/pixel/constants/pixelEventTitle';

const Wrapper = styled.div`
  ${isPC
    ? css`
        width: 400px;
        margin: 0 auto;
        background: ${COLOR.kurlyWhite};
        letter-spacing: -0.5px;
        font-weight: 500;
      `
    : css`
        font-weight: 600;
      `}
`;

export default function MembersSubscribeCheckoutContainer() {
  const dispatch = useDispatch();
  useScreenName(ScreenName.MEMBERSHIP_SUBSCRIBE);

  useEffect(() => {
    dispatch(setChangePayment(false));
    ignoreError(() => {
      branchService.logEvent(new AchieveLevel());
      Pixel.logEvent(PIXEL_EVENT_TITLE.SUBMIT_APPLICATION);
    });
  }, [dispatch]);

  return (
    <Wrapper>
      {/* 멤버십 안내 문구 */}
      <KurlyMembersInformation />
      {/* 자동결제 */}
      <RecurringPayment />
      {/* 멤버스 쿠폰팩 */}
      <KurlyMembersCoupon />
      {/* 결제수단 */}
      <Payment />
      {/* 약관동의 */}
      <KurlyMembersTerms />
      {/* 결제하기 */}
      <SubmitButton />
      {/* 결제창 */}
      <PaymentProcess />
    </Wrapper>
  );
}
