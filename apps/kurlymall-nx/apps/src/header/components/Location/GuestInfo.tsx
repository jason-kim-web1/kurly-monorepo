import styled from '@emotion/styled';

import { DELIVERY_TYPE_NAME } from '../../../shared/constant/region-group-code';

import { DeliveryPinOn } from '../../../shared/images';
import COLOR from '../../../shared/constant/colorset';
import { CurrentAddressResponse, DeliveryType } from '../../../shared/interfaces/ShippingAddress';

const Addresss = styled.span`
  display: block;
  font-size: 16px;
  color: ${COLOR.kurlyGray800};
  text-align: center;
  &:before {
    content: '';
    display: block;
    width: 28px;
    height: 28px;
    margin: 0 auto 13px;
    background: url(${DeliveryPinOn}) no-repeat 50% 50%;
    background-size: 28px 28px;
  }
`;

const Emph = styled.strong<{ type: DeliveryType }>`
  display: block;
  padding: 8px 0 0;
  font-weight: 600;
  font-size: 12px;
  line-height: 14px;
  text-align: center;
  ${(props) => props.type === 'direct' && `color: ${COLOR.kurlyPurple}`};
  ${(props) => props.type === 'indirect' && `color: ${COLOR.kurlyGray600}`};
  ${(props) => props.type === 'disable' && `color: ${COLOR.kurlyGray350}`};
`;

interface Props {
  currentAddress?: CurrentAddressResponse;
}

export default function GuestInfo({ currentAddress }: Props) {
  if (!currentAddress) {
    return null;
  }

  const { address, addressDetail, deliveryType } = currentAddress;

  return (
    <>
      <Addresss>
        {address} {addressDetail ? addressDetail : ''}
      </Addresss>
      <Emph type={deliveryType}>{DELIVERY_TYPE_NAME[deliveryType]}</Emph>
    </>
  );
}
