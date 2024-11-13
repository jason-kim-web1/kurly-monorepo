import { Button } from '@thefarmersfront/kpds-react';

import useCheckoutOrderButton from '../../hooks/useCheckoutOrderButton';
import CheckoutLoadingButton from './CheckoutLoadingButton';
import { CartItem } from '../../interface/CartProduct';
import { ButtonStyle } from './ButtonStyle';

interface CheckoutOrderButtonProps {
  onClickCheckoutButton: (dealProducts: CartItem[]) => Promise<void>;
  buttonTitle?: string;
}

export default function CheckoutOrderButton({ onClickCheckoutButton, buttonTitle }: CheckoutOrderButtonProps) {
  const { title, isLoadingCheckout, handleClickCheckoutButton } = useCheckoutOrderButton({
    onClickCheckoutButton,
    buttonTitle,
  });

  if (isLoadingCheckout) {
    return <CheckoutLoadingButton />;
  }

  return (
    <Button css={ButtonStyle} _type={'primary'} onClick={handleClickCheckoutButton}>
      {title}
    </Button>
  );
}
