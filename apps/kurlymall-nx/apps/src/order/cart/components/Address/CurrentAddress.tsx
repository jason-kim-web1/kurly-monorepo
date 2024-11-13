import { Typography } from '@thefarmersfront/kpds-react';

import styled from '@emotion/styled';

import { vars } from '@thefarmersfront/kpds-css';

import React, { Fragment } from 'react';

import { DELIVERY_TYPE_NAME } from '../../../../shared/constant';
import useCurrentAddress from '../../../common/hooks/useCurrentAddress';
import { DeliveryType } from '../../constants/Address';
import AddressChangeButton from './AddressChangeButton';
import AddressDetail from './AddressDetail';

const ShippingTypeColors: Record<DeliveryType, string> = {
  direct: vars.color.main.$primary,
  indirect: vars.color.$blue850,
  disable: vars.color.main.$danger,
};

const ShippingType = styled(Typography)<{ deliveryType: DeliveryType }>`
  color: ${({ deliveryType }) => ShippingTypeColors[deliveryType]};
  margin-bottom: ${vars.spacing.$4};
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

export default function CurrentAddress() {
  const { data: currentAddress } = useCurrentAddress();

  if (!currentAddress) {
    return null;
  }

  return (
    <>
      <ShippingType variant={`$mediumSemibold`} deliveryType={currentAddress.deliveryType} as={'p'}>
        {DELIVERY_TYPE_NAME[currentAddress.deliveryType]}
      </ShippingType>

      <Wrapper>
        <AddressDetail />
        <AddressChangeButton />
      </Wrapper>
    </>
  );
}
