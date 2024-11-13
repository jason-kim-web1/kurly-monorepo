import styled from '@emotion/styled';
import { useSelector } from 'react-redux';

import { InputHTMLAttributes } from 'react';

import { AppState } from '../../../../shared/store';

import AddressBox from '../../../../shared/components/Address/AddressBox';
import InputBox from '../../../../shared/components/Input/InputBox';
import MessageArea from '../../../../shared/components/Message/MessageTextArea';
import PhoneNumberBox from '../../../../shared/components/Input/PhoneNumberBox';

import { KURLY_REGEX } from '../../../../shared/constant/regex';

const Wrapper = styled.div`
  label {
    padding: 8px 0;
  }
`;

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  onSearchAddress(): void;
  onChangeAcceptInfo(props: 'phoneNumber' | 'memo' | 'address', value: string): void;
}

export default function ShippingAddress({ className, onChangeAcceptInfo, onSearchAddress }: Props) {
  const readOnlyMobile = useSelector(({ gift }: AppState) => gift.readOnlyMobile);
  const { name, phoneNumber, address, addressDetail, memo } = useSelector(({ gift }: AppState) => gift.acceptInfo);

  const onValidateAddress = (value: string, type: 'memo' | 'address' | 'phoneNumber') => {
    // 상세주소 정제: ~ 입력 시 - 로 변경처리 해야 한다.
    onChangeAcceptInfo(type, type === 'address' ? value.replace(/~/g, '-') : value);
  };

  return (
    <Wrapper className={className}>
      <InputBox
        id="receiver-name"
        label="받으실 분"
        placeholder="받으실 분 성함을 입력해주세요."
        value={name}
        maxLength={20}
        readOnly
      />
      <PhoneNumberBox
        id="receiver-phone-number"
        label="휴대폰"
        placeholder="휴대폰 번호를 입력해 주세요."
        value={phoneNumber}
        maxLength={11}
        readOnly={readOnlyMobile}
        hasDeleteButton={phoneNumber.length > 0}
        onChange={({ value }: { value: string }) => onValidateAddress(value, 'phoneNumber')}
      />
      <AddressBox
        address={{
          address,
          addressDetail,
        }}
        onSearchAddress={onSearchAddress}
        onChangeAddress={(value: string) => onValidateAddress(value, 'address')}
      />
      <MessageArea
        id="receiver-delivery-request"
        label="배송기사 요청사항"
        placeholder="예 : 벨 누르지 말고 전화주세요."
        value={memo || ''}
        showCount
        maxLength={50}
        denyPattern={KURLY_REGEX}
        onChange={(value: string) => onValidateAddress(value, 'memo')}
      />
    </Wrapper>
  );
}
