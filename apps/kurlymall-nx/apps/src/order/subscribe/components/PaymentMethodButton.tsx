import styled from '@emotion/styled';

import { css } from '@emotion/react';

import { EmotionJSX } from '@emotion/react/types/jsx-namespace';

import COLOR from '../../../shared/constant/colorset';
import Check from '../../../shared/icons/Check';
import { isPC } from '../../../../util/window/getDevice';
import { PaymentType } from '../interfaces';
import { usePaymentButton } from '../hooks/usePaymentButton';

const Input = styled.input`
  position: absolute;
  z-index: -1;
  width: 0;
  height: 0;
`;

const Label = styled.label<{ checked: boolean; isKurlypayError?: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 48px;
  margin-top: 10px;
  border: 1px solid ${COLOR.kurlyGray250};
  border-radius: 10px;
  padding: 0 20px;
  cursor: pointer;

  ${!isPC &&
  css`
    font-weight: 600;
  `};

  ${({ checked }) =>
    checked &&
    css`
      border-color: ${COLOR.kurlyPurple};
    `}

  ${({ isKurlypayError }) =>
    isKurlypayError &&
    css`
      cursor: unset;
      color: ${COLOR.lightGray};
    `}
`;

interface PaymentButtonProps {
  paymentType: PaymentType;
  title: string | EmotionJSX.Element;
  handleClickPaymentSlide?: () => void;
}
export default function PaymentMethodButton({ paymentType, title, handleClickPaymentSlide }: PaymentButtonProps) {
  const { checked, isKurlypayError, handleClickPaymentButton } = usePaymentButton({
    paymentType,
    handleClickPaymentSlide,
  });

  return (
    <Label checked={checked} isKurlypayError={isKurlypayError}>
      <Input type="radio" name="paymentMethod" checked={checked} onChange={handleClickPaymentButton} />
      {title}
      {checked && <Check width={17} height={17} stroke={COLOR.kurlyPurple} strokeWidth={1.8} strokeLinecap="round" />}
    </Label>
  );
}
