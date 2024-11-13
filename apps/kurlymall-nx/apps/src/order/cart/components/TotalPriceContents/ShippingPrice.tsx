import { Typography } from '@thefarmersfront/kpds-react';

import styled from '@emotion/styled';

import { vars } from '@thefarmersfront/kpds-css';

import { css } from '@emotion/react';

import { useShippingPrice } from '../../hooks/useShippingPrice';

const ShippingPriceText = styled(Typography)<{ showFreeShippingReason: boolean }>`
  ${({ showFreeShippingReason }) =>
    showFreeShippingReason &&
    css`
      color: ${vars.color.main.$primary};
    `}
`;

export default function ShippingPrice() {
  const { shippingPriceText, showFreeShippingReason } = useShippingPrice();

  return (
    <>
      <Typography variant={`$xlargeRegular`}>배송비</Typography>
      <ShippingPriceText variant={`$xlargeSemibold`} showFreeShippingReason={showFreeShippingReason}>
        {shippingPriceText}
      </ShippingPriceText>
    </>
  );
}
