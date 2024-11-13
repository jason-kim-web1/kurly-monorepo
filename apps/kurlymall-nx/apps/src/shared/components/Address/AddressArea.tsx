import styled from '@emotion/styled';

import COLOR from '../../constant/colorset';
import { isPC } from '../../../../util/window/getDevice';
import AddressDescription from './AddressDescription';
import { DeliveryType } from '../../interfaces/ShippingAddress';

const Wrapper = styled.div<{ disabled: boolean }>`
  flex: 1;
  ${({ disabled }) =>
    disabled &&
    `
  pointer-events: none;

  > p:first-of-type {
    color: ${COLOR.kurlyGray400}
  }
  `}
`;

const UserDetail = styled.div`
  display: flex;
  align-items: center;
  color: ${COLOR.kurlyGray600};
  font-size: 14px;

  ${isPC
    ? `
      padding-top: 5px;
      line-height: 20px;
  `
    : `
      padding-top: 4px;
    `}
`;

const Address = styled.p`
  font-size: 16px;
  line-height: 20px;
  color: ${COLOR.kurlyGray800};
  word-break: break-all;
`;

const Badge = styled.div`
  display: inline-block;
  padding: 4px 8px;
  margin-bottom: ${isPC ? 10 : 8}px;
  border-radius: 11px;
  background-color: ${COLOR.bgLightGray};
  color: ${COLOR.kurlyGray600};
  font-weight: 600;
  font-size: 12px;
  text-align: center;
`;

const Divider = styled.span`
  display: inline-block;
  width: 1px;
  height: 12px;
  margin: 0 ${isPC ? 8 : 6}px;
  flex-shrink: 0;
  background-color: ${COLOR.lightGray};
`;

interface Props {
  isDefaultAddress: boolean;
  address: string;
  addressDetail: string;
  name?: string;
  mobile?: string;
  isRetiredAddress: boolean;
  deliveryType: DeliveryType;
  onClick?: () => void;
}

export default function AddressArea({
  isDefaultAddress,
  address,
  addressDetail,
  name,
  mobile,
  isRetiredAddress,
  deliveryType,
  onClick,
}: Props) {
  const shouldShowUserDetail = name || mobile;

  return (
    <Wrapper data-testid="address-area" onClick={onClick} disabled={isRetiredAddress}>
      {isDefaultAddress && <Badge>기본 배송지</Badge>}
      <Address>
        {address} {addressDetail}
      </Address>
      {shouldShowUserDetail && (
        <UserDetail>
          {name}
          {name && <Divider />}
          {mobile && <>{mobile}</>}
        </UserDetail>
      )}
      <AddressDescription isRetiredAddress={isRetiredAddress} deliveryType={deliveryType} />
    </Wrapper>
  );
}
