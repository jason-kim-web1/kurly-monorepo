import { css } from '@emotion/react';

import Stepper from '../../../shared/components/Button/StepperButton';
import { ContentType, DealProduct, DirectOrderType } from '../types';

const stepper = css`
  .count {
    font-weight: 600;
  }
`;

interface Props {
  dealProduct: DealProduct;
  directOrderType?: DirectOrderType;
  isPC?: boolean;
  contentType: ContentType;
  onChange(quantity: number): void;
}

export default function DealProductStepper({ dealProduct, contentType, isPC = true, onChange }: Props) {
  const { quantity, buyUnit, maxEa, minEa } = dealProduct;
  const minusDisabled = contentType === 'MULTI' ? quantity <= 0 : quantity <= minEa;
  const handleChangeQuantity = (nextQuantity: number) => onChange(nextQuantity);
  return (
    <Stepper
      css={stepper}
      count={quantity}
      unit={buyUnit}
      minusDisabled={minusDisabled}
      plusDisabled={quantity > maxEa}
      onChange={handleChangeQuantity}
      isPC={isPC}
    />
  );
}
