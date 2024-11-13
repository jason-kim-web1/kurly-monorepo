import { css } from '@emotion/react';

import styled from '@emotion/styled';

import COLOR from '../../constant/colorset';
import AddressDeliveryType from '../../../order/checkout/shared/components/AddressDeliveryType';
import { isPC } from '../../../../util/window/getDevice';
import { RETIRED_ADDRESS_DESCRIPTION_TEXT_NON_SPACE } from '../../constant';
import { DeliveryType } from '../../interfaces/ShippingAddress';

interface Props {
  isRetiredAddress: boolean;
  deliveryType: DeliveryType;
}

const RetiredAddress = styled.p`
  font-weight: ${isPC ? 500 : 600};
  padding-top: 10px;
  font-size: 12px;
  line-height: 20px;
  color: ${COLOR.invalidRed};
`;

const style = {
  mobile: css`
    padding-top: 10px;
    font-weight: 600;
    font-size: 12px;
    line-height: 20px;
  `,
  pc: css`
    padding-top: 10px;
    font-weight: 500;

    > span {
      font-size: 12px;
    }
  `,
};

export default function AddressDescription({ isRetiredAddress, deliveryType }: Props) {
  if (isRetiredAddress) {
    return <RetiredAddress>{RETIRED_ADDRESS_DESCRIPTION_TEXT_NON_SPACE}</RetiredAddress>;
  }

  return <AddressDeliveryType type={deliveryType} css={isPC ? style.pc : style.mobile} />;
}
