import { useAppSelector } from '../../../../shared/store';

import CheckoutLoadingButton from '../ProceedToCheckout/CheckoutLoadingButton';
import DisableButton from '../ProceedToCheckout/DisableButton';
import GoToLoginButton from '../ProceedToCheckout/GoToLoginButton';
import CheckoutOrderButton from '../ProceedToCheckout/CheckoutOrderButton';

import useCheckoutOrder from '../../hooks/useCheckoutOrder';
import useDisableButtonText from '../../hooks/useDisableButtonText';
import useCartDetailQuery from '../../queries/useCartDetailQuery';
import { DeliveryNotice } from '../../interface/DeliveryNotice';

interface FooterButtonProps {
  openRecommendBottomSheet: () => void;
  openDeliveryBottomSheet: ({ deliveryNotice }: { deliveryNotice: DeliveryNotice }) => void;
}

export default function ProceedToCheckoutButton(bottomSheetHandlers: FooterButtonProps) {
  const isGuest = useAppSelector(({ auth }) => auth.isGuest);

  const { isLoading } = useCartDetailQuery();

  const { disableText } = useDisableButtonText();
  const { onProceedToCheckout } = useCheckoutOrder(bottomSheetHandlers);

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
