import styled from '@emotion/styled';

import { vars } from '@thefarmersfront/kpds-css';

import CheckoutOrderButton from '../ProceedToCheckout/CheckoutOrderButton';

const ButtonWrapper = styled.div`
  padding: ${vars.spacing.$8} ${vars.spacing.$12};
`;

interface BottomSheetButtonProps {
  onClickCheckoutButton: () => Promise<void>;
  buttonTitle?: string;
}

export default function BottomSheetButton({ onClickCheckoutButton, buttonTitle }: BottomSheetButtonProps) {
  return (
    <ButtonWrapper>
      <CheckoutOrderButton onClickCheckoutButton={onClickCheckoutButton} buttonTitle={buttonTitle} />
    </ButtonWrapper>
  );
}
