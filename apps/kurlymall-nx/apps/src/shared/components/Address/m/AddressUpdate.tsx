import { useEffect, useMemo, useState, FocusEvent } from 'react';
import styled from '@emotion/styled';

import { useRouter } from 'next/router';

import COLOR from '../../../constant/colorset';
import {
  KURLY_REGEX,
  TEXT_DENY_REGEX,
  ADDRESS_INFO,
  ADDRESS_DETAIL_PLACEHOLDER_TEXT,
  ADDRESS_MOBILE_PLACEHOLDER_TEXT,
  NAME_PLACEHOLDER_TEXT,
  MAX_ADDRESS_DETAIL_LENGTH,
} from '../../../constant';

import Button from '../../Button/Button';
import Checkbox from '../../Input/Checkbox';
import InputBox from '../../Input/InputBox';
import PhoneNumberBox from '../../Input/PhoneNumberBox';
import Loading from '../../Loading/Loading';
import { ParsedUrlQuery } from 'querystring';

import { isDefaultPhoneNumber } from '../../../utils';
import Alert from '../../Alert/Alert';
import { BaseAddressType, DefaultAddressType, MemberAddressResponse } from '../../../interfaces/ShippingAddress';

const Wrapper = styled.div`
  padding: 28px 20px 0;
`;

const Contents = styled.div`
  > div {
    padding-bottom: 14px;
    &:first-of-type label {
      padding-bottom: 13px;
      font-weight: 500;
      font-size: 16px;
      line-height: 20px;
    }
    &:last-of-type {
      padding-bottom: 0;
    }
  }
`;

const DefaultAddress = styled.span`
  display: inline-block;
  height: 22px;
  padding: 1px 8px 0;
  border-radius: 11px;
  font-weight: 600;
  font-size: 12px;
  line-height: 22px;
  color: ${COLOR.kurlyGray600};
  background-color: ${COLOR.bgLightGray};
  vertical-align: top;
`;

const ButtonWrapper = styled.div<{ type: DefaultAddressType }>`
  ${({ type }) =>
    type === DefaultAddressType.default
      ? `
    > button:first-of-type {
      margin-top: 24px;
    }
  `
      : `
    > label {
      padding: 15px 0 24px;
      font-size: 15px;
      line-height: 24px;
    }
  `}
  button + button {
    margin-top: 12px;
  }
`;

const styles = {
  inputBox: {
    label: {
      fontWeight: 600,
      paddingBottom: '7px',
    },
    input: {
      height: '48px',
      '::placeholder': {
        color: COLOR.kurlyGray350,
      },
    },
  },
  buttonText: {
    span: {
      fontWeight: 600,
    },
  },
};

interface Props {
  loading: boolean;
  selectedAddress?: MemberAddressResponse;
  onChange: ({ name, value }: { name: string; value: string }) => void;
  onClickSave: (isDefault: boolean, isIframe?: string) => void;
  onClickDelete: (addressNo: number, isMypage?: string) => void;
}

export default function AddressUpdate({ loading, selectedAddress, onChange, onClickSave, onClickDelete }: Props) {
  const router = useRouter();
  const [isDefault, setIsDefault] = useState(false);
  const { isMypage } = router.query as ParsedUrlQuery & { isMypage?: string };

  const defaultAddress = useMemo(() => selectedAddress?.type === DefaultAddressType.default, [selectedAddress]);

  useEffect(() => {
    setIsDefault(defaultAddress);
  }, [defaultAddress]);

  const handleChange = () => {
    setIsDefault((v) => !v);
  };

  const handlePhoneBoxBlur = async ({ target }: FocusEvent<HTMLInputElement>) => {
    if (isDefaultPhoneNumber(target.value)) {
      await Alert({
        text: '휴대폰 번호를 정확히 입력해주세요.',
      });

      target.focus();
    }
  };

  if (!selectedAddress) {
    return <Loading />;
  }

  const {
    no,
    address = '',
    addressDetail = '',
    name = '',
    mobile = '',
    baseAddressType,
    roadAddress,
    type = DefaultAddressType.recent,
  } = selectedAddress;

  const baseAddress = baseAddressType === BaseAddressType.jibun ? address : roadAddress;

  return (
    <Wrapper>
      {loading && <Loading />}
      <Contents>
        {type === DefaultAddressType.default && <DefaultAddress>기본 배송지</DefaultAddress>}
        <InputBox
          id="addressDetail"
          label={baseAddress}
          placeholder={ADDRESS_DETAIL_PLACEHOLDER_TEXT}
          name="addressDetail"
          value={addressDetail}
          onChange={onChange}
          maxLength={MAX_ADDRESS_DETAIL_LENGTH}
          denyPattern={KURLY_REGEX}
          hasDeleteButton={false}
          css={styles.inputBox}
        />

        <InputBox
          id="name"
          label={ADDRESS_INFO.name}
          placeholder={NAME_PLACEHOLDER_TEXT}
          name="name"
          value={name}
          onChange={onChange}
          denyPattern={TEXT_DENY_REGEX}
          maxLength={20}
          hasDeleteButton={false}
          css={styles.inputBox}
        />
        <PhoneNumberBox
          id="mobile"
          label={ADDRESS_INFO.mobile}
          placeholder={ADDRESS_MOBILE_PLACEHOLDER_TEXT}
          name="mobile"
          value={mobile}
          onChange={onChange}
          onBlur={handlePhoneBoxBlur}
          maxLength={11}
          hasDeleteButton={false}
          css={styles.inputBox}
        />
      </Contents>
      <ButtonWrapper type={type}>
        {type !== DefaultAddressType.default && (
          <Checkbox label="기본 배송지로 저장" checked={isDefault} onChange={handleChange} />
        )}
        <Button
          text="저장"
          radius={6}
          disabled={loading}
          onClick={() => onClickSave(isDefault, isMypage)}
          css={styles.buttonText}
        />
        {type !== DefaultAddressType.default && (
          <Button
            text="삭제"
            theme="tertiary"
            radius={6}
            disabled={loading}
            onClick={() => onClickDelete(no, isMypage)}
            css={styles.buttonText}
          />
        )}
      </ButtonWrapper>
    </Wrapper>
  );
}
