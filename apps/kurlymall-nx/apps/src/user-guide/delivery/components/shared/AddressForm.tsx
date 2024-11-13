import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { ChangeEvent } from 'react';

import COLOR from '../../../../shared/constant/colorset';
import BackButton from '../../../../shared/components/Button/BackButton';
import Button from '../../../../shared/components/Button/Button';
import DeliveryUnavailableNotice from './DeliveryUnavailableNotice';
import { DeliveryProps } from '../../../../shared/interfaces/ShippingAddress';

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${COLOR.kurlyWhite};
  overflow: auto;
`;

const ResultHeader = styled.div`
  height: 44px;
  border-bottom: 1px solid #ccc;
`;
const HeaderBackButton = styled(BackButton)`
  float: left;
`;

const HeaderText = styled.span`
  font-weight: 600;
  font-size: 16px;
  line-height: 42px;
  float: left;
`;

const Input = styled.input`
  width: 100%;
  height: 50px;
  padding: 0 11px;
  border-radius: 3px;
  font-weight: 500;
  font-size: 16px;
  line-height: 1.5;
  outline: 0;
  border: 1px solid #ddd;
  background-color: #fff;

  ::placeholder {
    color: #ccc;
  }
`;

const InputGroup = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export default function AddressForm({
  address,
  onClickBack,
  setAddressDetail,
  onClickSubmit,
}: {
  address: DeliveryProps;
  onClickBack: () => void;
  setAddressDetail: (detailAddress: string) => void;
  onClickSubmit: () => void;
}) {
  const handleChangeAddressDetail = (e: ChangeEvent<HTMLInputElement>) => {
    setAddressDetail(e.currentTarget.value);
  };

  return (
    <Container>
      <ResultHeader>
        <HeaderBackButton onClick={onClickBack} />
        <HeaderText>주소 재검색</HeaderText>
      </ResultHeader>
      <InputGroup>
        <Input
          css={css`
            width: 80px;
            text-align: center;
          `}
          defaultValue={address.zipcode}
          disabled
        />
        <Input defaultValue={address.baseAddressType === 'road' ? address.roadAddress : address.address} disabled />
        <Input
          placeholder="나머지 주소를 입력해주세요."
          value={address.addressDetail}
          onChange={handleChangeAddressDetail}
        />
        <Button text="주소입력" onClick={onClickSubmit} />
      </InputGroup>
      <DeliveryUnavailableNotice />
    </Container>
  );
}
