import { NoProductImageGiftLogo, NoProductImageLogo } from '../../../../shared/images';
import { CheckoutProductItem } from '../../../../shared/interfaces';
import { addComma } from '../../../../shared/services';

interface Props {
  product: CheckoutProductItem;
  isGiveaway?: boolean;
}

export default function useCheckoutProductItem({ product, isGiveaway }: Props) {
  const { dealProductName, contentProductName, discountedPrice, price, quantity, thumbnailUrl } = product;

  return {
    ...product,
    thumbnailUrl: thumbnailUrl || (isGiveaway ? NoProductImageGiftLogo : NoProductImageLogo),
    showContentProductName: dealProductName !== contentProductName,
    showDiscountedPrice: discountedPrice > 0,
    originalTotalPrice: `${addComma(price * quantity)}원`,
    discountedTotalPrice: `${addComma((price - discountedPrice) * quantity)}원`,
  };
}
