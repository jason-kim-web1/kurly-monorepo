import { useAppSelector } from '../../../../shared/store';

import CheckoutLoadingButton from '../ProceedToCheckout/CheckoutLoadingButton';
import DisableButton from '../ProceedToCheckout/DisableButton';
import GoToLoginButton from '../ProceedToCheckout/GoToLoginButton';
import CheckoutOrderButton from '../ProceedToCheckout/CheckoutOrderButton';

import useProceedToCheckout from '../../hooks/useProceedToCheckout';
import useDisableButtonText from '../../hooks/useDisableButtonText';
import useCartDetailQuery from '../../queries/useCartDetailQuery';

export default function ProceedToCheckoutButton() {
  const { hasSession, isGuest } = useAppSelector(({ auth }) => auth);

  const { isLoading } = useCartDetailQuery();

  const { disableText } = useDisableButtonText();
  const { onProceedToCheckout } = useProceedToCheckout();

  if (!hasSession) {
    return null;
  }

  if (isLoading) {
    return <CheckoutLoadingButton />;
  }

  if (isGuest) {
    return <GoToLoginButton />;
  }

  if (disableText) {
    return <DisableButton text={disableText} />;
  }

  return <CheckoutOrderButton onClickCheckoutButton={onProceedToCheckout} />;
}
