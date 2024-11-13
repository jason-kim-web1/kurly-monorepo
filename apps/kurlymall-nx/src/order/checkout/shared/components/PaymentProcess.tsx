import styled from '@emotion/styled';
import { isNull } from 'lodash';
import { nanoid } from 'nanoid';

import { css } from '@emotion/react';

import { zIndex } from '../../../../shared/styles';
import COLOR from '../../../../shared/constant/colorset';
import { useAppSelector } from '../../../../shared/store';
import useBridgeProcessEvent from '../hooks/useBridgeProcessEvent';
import { isPC, isWebview } from '../../../../../util/window/getDevice';
import usePaymentProcessEvent from '../hooks/usePaymentProcessEvent';

const Iframe = styled.iframe`
  position: fixed;
  top: 0;
  left: 0;
  border: 0;
  width: 100%;
  height: 100%;
  z-index: ${zIndex.paymentProcess};
  background-color: ${COLOR.kurlyWhite};

  ${!isPC &&
  !isWebview() &&
  css`
    top: 44px;
    height: calc(100% - 44px);
  `}
`;

interface PaymentProcessProps {
  onCloseAction?: () => void;
}

/**
 * 결제진행을 처리할 iframe 레이아웃
 * @param onCloseAction iframe이 history back으로 닫힐 때 실행되어야 하는 액션
 */
export default function PaymentProcess({ onCloseAction }: PaymentProcessProps) {
  const paymentGatewayUrl = useAppSelector(({ payments }) => payments.paymentGatewayUrl);

  useBridgeProcessEvent();
  usePaymentProcessEvent(onCloseAction);

  if (isNull(paymentGatewayUrl)) {
    return null;
  }

  const key = `payment-process-${nanoid().toString()}`;

  return <Iframe src={paymentGatewayUrl} key={key} id="payment-process" allow="camera" />;
}
