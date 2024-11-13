import styled from '@emotion/styled';

import { KURLY_REGEX } from '../../constant/regex';

import { GiftIconInputSearch } from '../../images';
import InputBox from '../Input/InputBox';

import { MAX_ADDRESS_DETAIL_LENGTH } from '../../constant';

const InputWrapper = styled.div`
  padding-top: 4px;
`;

const Label = styled.label`
  display: block;
  font-size: 14px;
  font-weight: 600;
`;

const SearchAddress = styled.div`
  position: relative;
  width: 100%;
  height: 48px;
  margin-bottom: 12px;
  > div > div {
    overflow-x: auto;
  }
  input:focus {
    border-color: #ddd;
  }
`;

export interface Props {
  address: {
    address: string;
    addressDetail: string;
  };
  onSearchAddress(): void;
  onChangeAddress(value: string): void;
}

export default function AddressBox({ address: { address, addressDetail }, onSearchAddress, onChangeAddress }: Props) {
  return (
    <InputWrapper id="receiver-adress-area">
      <Label htmlFor="receiver-address">주소</Label>
      <SearchAddress onClick={onSearchAddress}>
        <InputBox
          type="text"
          value={address}
          placeholder="도로명, 지번, 건물명 검색"
          id="receiver-address"
          disabled={false}
          readOnly
          icon={GiftIconInputSearch}
        />
      </SearchAddress>
      <InputBox
        type="text"
        id="receiver-sub-address"
        value={addressDetail}
        placeholder="나머지 주소를 입력해 주세요."
        denyPattern={KURLY_REGEX}
        disabled={false}
        maxLength={MAX_ADDRESS_DETAIL_LENGTH}
        hasDeleteButton={addressDetail.length > 0}
        onChange={({ value }) => onChangeAddress(value)}
      />
    </InputWrapper>
  );
}
