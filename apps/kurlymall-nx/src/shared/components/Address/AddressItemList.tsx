import styled from '@emotion/styled';
import { SerializedStyles } from '@emotion/react';

import COLOR from '../../constant/colorset';
import Checkbox from '../Input/Checkbox';
import AddressArea from './AddressArea';
import { isPC } from '../../../../util/window/getDevice';
import ModifyButton from '../icons/ModifyButton';
import { AddressListProps, BaseAddressType, DefaultAddressType } from '../../interfaces/ShippingAddress';
import { AddressResponseInterface } from '../../services/shippingAddress.service';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding: ${isPC ? `20px 0` : `20px 8px 20px 20px`};
  border-bottom: 1px solid ${COLOR.bg};
`;

const CheckboxWrapper = styled.div`
  flex-basis: 36px;
`;

const ModifyButtonWrapper = styled.div`
  display: inline-flex;
  padding-left: 16px;
`;

interface Props {
  addressItem: AddressListProps | AddressResponseInterface;
  style?: SerializedStyles;
  onChangeChecked: () => void;
  onClickUpdate: () => void;
}

export default function AddressItemList({
  addressItem: {
    no,
    name,
    mobile,
    address: jibunAddress,
    addressDetail,
    roadAddress,
    baseAddressType,
    type,
    deliveryType,
    isCurrentDeliveryAddress,
    isRetiredAddress,
  },
  onChangeChecked,
  onClickUpdate,
}: Props) {
  const disabledCheckBox = isRetiredAddress && !isCurrentDeliveryAddress;
  const isDefaultAddress = type === DefaultAddressType.default;
  const address = baseAddressType === BaseAddressType.jibun ? jibunAddress : roadAddress;

  return (
    <Wrapper>
      <CheckboxWrapper>
        <Checkbox
          id={`kurly-address-${no}`}
          value={no}
          checked={isCurrentDeliveryAddress}
          disabled={disabledCheckBox}
          onChange={onChangeChecked}
        />
      </CheckboxWrapper>
      <AddressArea
        isDefaultAddress={isDefaultAddress}
        address={address}
        addressDetail={addressDetail}
        name={name}
        mobile={mobile}
        isRetiredAddress={isRetiredAddress}
        deliveryType={deliveryType}
        onClick={onChangeChecked}
      />
      <ModifyButtonWrapper data-testid="update-address-button" onClick={onClickUpdate}>
        <ModifyButton />
      </ModifyButtonWrapper>
    </Wrapper>
  );
}
