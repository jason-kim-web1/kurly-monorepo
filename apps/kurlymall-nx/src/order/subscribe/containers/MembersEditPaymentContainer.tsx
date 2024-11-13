import styled from '@emotion/styled';

import { useDispatch } from 'react-redux';

import { css } from '@emotion/react';

import { useEffect } from 'react';

import { isPC } from '../../../../util/window/getDevice';
import COLOR from '../../../shared/constant/colorset';

import Payment from '../components/Payment';
import KurlyMembersInformation from '../components/KurlyMembersInformation';
import RecurringPayment from '../components/RecurringPayment';
import KurlyMembersTerms from '../components/KurlyMembersTerms';
import SubmitButton from '../components/SubmitButton';

import PaymentProcess from '../../checkout/shared/components/PaymentProcess';
import { setChangePayment } from '../reducers/subscribeCheckout.slice';
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

export default function MembersEditPaymentContainer() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setChangePayment(true));
    ignoreError(() => Pixel.logEvent(PIXEL_EVENT_TITLE.SUBMIT_APPLICATION));
  }, [dispatch]);

  return (
    <Wrapper>
      {/* 멤버십 안내 문구 */}
      <KurlyMembersInformation />
      {/* 자동결제 */}
      <RecurringPayment />
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
