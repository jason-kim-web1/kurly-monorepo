import { useMemo, useState } from 'react';

import { useRouter } from 'next/router';

import { Alert } from '@thefarmersfront/kpds-react';

import { handleCheckoutOrderError } from '../utils/checkoutOrderError';
import { useAppSelector } from '../../../shared/store';
import { totalPriceSelector } from '../store/cart';
import { addComma } from '../../../shared/services';
import useDealProducts from './useDealProducts';
import { CartItem } from '../interface/CartProduct';

interface CheckoutOrderButtonProps {
  onClickCheckoutButton: (dealProducts: CartItem[]) => Promise<void>;
  buttonTitle?: string;
}
export default function useCheckoutOrderButton({ onClickCheckoutButton, buttonTitle }: CheckoutOrderButtonProps) {
  const router = useRouter();
  const [isLoadingCheckout, setIsLoadingCheckout] = useState(false);
  const { paymentPrice } = useAppSelector(totalPriceSelector);
  const { dealProducts } = useDealProducts();

  const title = useMemo(() => buttonTitle || `${addComma(paymentPrice)}원 주문하기`, [buttonTitle, paymentPrice]);

  const handleClickCheckoutButton = async () => {
    setIsLoadingCheckout(true);

    try {
      await onClickCheckoutButton(dealProducts);
    } catch (err) {
      if (err instanceof Error) {
        await handleCheckoutOrderError({ err, router });
        return;
      }

      await Alert({ contents: err.message });
    } finally {
      setIsLoadingCheckout(false);
    }
  };

  return { title, isLoadingCheckout, handleClickCheckoutButton };
}
