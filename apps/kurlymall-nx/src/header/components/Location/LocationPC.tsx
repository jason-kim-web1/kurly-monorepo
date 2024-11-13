import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { isEmpty } from 'lodash';

import COLOR from '../../../shared/constant/colorset';
import { SearchDeliveryPinPC, DeliveryPinTail } from '../../../shared/images';

import Button from '../../../shared/components/Button/Button';
import AddressDeliveryType from '../../../order/checkout/shared/components/AddressDeliveryType';
import { BaseAddressType, CurrentAddressResponse } from '../../../shared/interfaces/ShippingAddress';

const Layer = styled.div<{ top: boolean }>`
  position: absolute;
  right: -124px;
  top: ${({ top }) => (top ? '10px' : '14px')};
  width: 267px;
  padding: 18px 17px 17px;
  border: 1px solid ${COLOR.lightGray};
  background-color: ${COLOR.kurlyWhite};

  /* 영역겹치기용 */
  &:before {
    content: '';
    position: absolute;
    left: 125px;
    top: -20px;
    width: 36px;
    height: 36px;
  }

  &:after {
    content: '';
    position: absolute;
    left: 133px;
    top: -11px;
    width: 18px;
    height: 11px;
    background: url(${DeliveryPinTail}) no-repeat 50% 50%;
  }
`;

const Text = styled.p`
  font-weight: 500;
  font-size: 16px;
  color: ${COLOR.kurlyGray800};
  line-height: 24px;
  letter-spacing: 0.32px;
`;

const Emph = styled.strong`
  font-weight: 400;
  color: ${COLOR.kurlyPurple};
`;

const ButtonGruop = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  padding-top: 11px;

  & > button span {
    font-weight: 500;
    font-size: 12px;
  }

  & > button {
    padding-bottom: 1px;
    white-space: nowrap;
    & + button {
      width: 145px;
    }
  }
`;

const iconStyle = css`
  width: 20px;
  height: 20px;
  margin-left: -9px;
  vertical-align: -5px;
`;

const icon = {
  css: iconStyle,
  src: SearchDeliveryPinPC,
};

const deliveryField = {
  padding: '9px 0 3px',
  fontWeight: 400,
  fontSize: '14px',
  letterSpacing: '1px',
};

const Nowrap = styled.span`
  white-space: nowrap;
`;

interface Props {
  isSticky: boolean;
  currentAddress?: CurrentAddressResponse;
  isGuest: boolean;
  onClick: () => void;
  onClickLogin: () => void;
}

export default function LocationPC({ isSticky, currentAddress, isGuest, onClick, onClickLogin }: Props) {
  if (!currentAddress) {
    return null;
  }

  // 로그아웃 + 배송지 없음
  if (isEmpty(currentAddress.address)) {
    return (
      <Layer top={isSticky}>
        <Text>
          <Emph>배송지를 등록</Emph>하고
          <br />
          <Nowrap>구매 가능한 상품을 확인하세요!</Nowrap>
        </Text>
        <ButtonGruop>
          {isGuest && (
            <Button theme="secondary" text="로그인" width={80} height={36} radius={3} onClick={onClickLogin} />
          )}
          <Button theme="primary" text="주소 검색" styleIcon={icon} height={36} radius={3} onClick={onClick} />
        </ButtonGruop>
      </Layer>
    );
  }

  const { address, addressDetail, baseAddressType, roadAddress, deliveryType } = currentAddress;

  const isRoad = baseAddressType === BaseAddressType.road;

  {
    /* 로그인 + 배송지 있음 */
  }
  return (
    <Layer top={isSticky}>
      <Text>
        {isRoad ? roadAddress : address} {addressDetail}
      </Text>
      <AddressDeliveryType type={deliveryType} css={deliveryField} />
      <ButtonGruop>
        <Button theme="secondary" text="배송지 변경" height={36} radius={3} onClick={onClick} />
      </ButtonGruop>
    </Layer>
  );
}
