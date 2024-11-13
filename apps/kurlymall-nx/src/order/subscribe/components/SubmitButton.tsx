import styled from '@emotion/styled';

import { css } from '@emotion/react';

import { useMemo } from 'react';

import Button from '../../../shared/components/Button/Button';
import { isPC } from '../../../../util/window/getDevice';
import { BORDER_RADIUS } from '../constants';
import usePaymentAction from '../hooks/usePaymentAction';
import useSubmitButton from '../hooks/useSubmitButton';
import { useAppSelector } from '../../../shared/store';

const Wrapper = styled.div`
  ${isPC
    ? css`
        padding: 24px 30px 30px;
      `
    : css`
        padding: 18px 12px 8px;
        @supports (padding-bottom: constant(safe-area-inset-bottom)) {
          padding-bottom: calc(8px + constant(safe-area-inset-bottom));
        }
        @supports (padding-bottom: env(safe-area-inset-bottom)) {
          padding-bottom: calc(8px + env(safe-area-inset-bottom));
        }
      `}
`;

export default function SubmitButton() {
  const { handleClickPayment } = usePaymentAction();
  const { buttonTitle, isPaymentsLoading, isLoading } = useSubmitButton();
  const termsState = useAppSelector(({ subscribeCheckout }) => subscribeCheckout.terms);
  const isAllCheckedTerms = useMemo(
    () => Object.entries(termsState).every(([key, state]) => key === 'marketingAgreed' || state),
    [termsState],
  );

  return (
    <Wrapper>
      <Button
        text={buttonTitle}
        onClick={handleClickPayment}
        radius={BORDER_RADIUS}
        isLoading={isLoading}
        isSubmitLoading={isPaymentsLoading}
        disabled={!isAllCheckedTerms}
      />
    </Wrapper>
  );
}
