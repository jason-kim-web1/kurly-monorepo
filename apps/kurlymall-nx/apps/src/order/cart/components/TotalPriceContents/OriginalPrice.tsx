import { Typography } from '@thefarmersfront/kpds-react';

import { addComma } from '../../../../shared/services';
import { useAppSelector } from '../../../../shared/store';
import { totalPriceSelector } from '../../store/cart';

export default function OriginalPrice() {
  const { productPrice, discountPrice } = useAppSelector(totalPriceSelector);

  return (
    <>
      <Typography variant={`$xlargeRegular`}>상품금액</Typography>
      <Typography variant={`$xlargeSemibold`}>{addComma(productPrice + discountPrice)}원</Typography>
    </>
  );
}
