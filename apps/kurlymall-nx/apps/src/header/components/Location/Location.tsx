import styled from '@emotion/styled';
import { isEmpty } from 'lodash';

import COLOR from '../../../shared/constant/colorset';
import { BaseAddressType, CurrentAddressResponse } from '../../../shared/interfaces/ShippingAddress';

const Layer = styled.div<{ isOnCart?: boolean }>`
  position: absolute;
  right: -21px;
  top: 17px;
  max-width: 197px;
  padding: 12px 12px;
  border-radius: 6px;
  background-color: ${COLOR.toolTip};
  white-space: nowrap;

  &:after {
    content: '';
    position: absolute;
    right: ${({ isOnCart }) => (isOnCart ? 22 : 15)}px;
    top: -14px;
    border-right: 12px solid ${COLOR.toolTip};
    border-top: 8px solid transparent;
    border-bottom: 8px solid transparent;
    transform: rotate(90deg);
  }
`;

const Text = styled.p`
  font-weight: 400;
  font-size: 14px;
  color: ${COLOR.kurlyWhite};
  line-height: 17px;
`;

const AddressText = styled.p`
  overflow: hidden;
  width: 100%;
  font-weight: 500;
  font-size: 14px;
  color: ${COLOR.kurlyWhite};
  line-height: 17px;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

interface Props {
  currentAddress?: CurrentAddressResponse;
  addressChanged: boolean;
  isAddressAssigned: boolean;
  isOnCart?: boolean;
}

export default function Location({ currentAddress, addressChanged, isAddressAssigned, isOnCart }: Props) {
  // 주소지 정보자체를 못가져오는 경우 비노출처리
  if (!currentAddress) {
    return null;
  }

  if (addressChanged || isAddressAssigned) {
    return (
      <Layer isOnCart={isOnCart}>
        <Text>{isAddressAssigned ? '새 배송지가 추가되었습니다.' : '배송지가 변경되었습니다'}</Text>
      </Layer>
    );
  }

  if (isEmpty(currentAddress.address)) {
    return (
      <Layer isOnCart={isOnCart}>
        <Text>
          배송지를 등록하고
          <br />
          구매 가능한 상품을 확인하세요!
        </Text>
      </Layer>
    );
  }

  const { address, addressDetail, baseAddressType, roadAddress } = currentAddress;

  const isRoad = baseAddressType === BaseAddressType.road;

  {
    /* 로그인 + 배송지 있음 */
  }
  return (
    <Layer isOnCart={isOnCart}>
      <AddressText>
        {isRoad ? roadAddress : address} {addressDetail}
      </AddressText>
      <Text>이 배송지가 맞나요?</Text>
    </Layer>
  );
}
