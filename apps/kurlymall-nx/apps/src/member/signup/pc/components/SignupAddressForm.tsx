import { css } from '@emotion/react';

import styled from '@emotion/styled';

import { useAppSelector } from '../../../../shared/store';
import { useFormEvent } from '../../../../shared/hooks/useFormEvent';
import useAddressEvent from '../../hook/useAddressEvent';

import { DELIVERY_TYPE, MAX_ADDRESS_DETAIL_LENGTH } from '../../../../shared/constant';
import COLOR from '../../../../shared/constant/colorset';

import Button from '../../../../shared/components/Button/Button';
import InputBox from '../../../../shared/components/Input/InputBox';
import InputGroup from '../../../../shared/components/InputGroup/InputGroup';
import { NormalSignupFormInterface } from '../../interfaces/NormalSignupForm.interface';
import useOpenAddress from '../../../../shared/hooks/useOpenAddress';

const HintText = styled.span<{ color?: string }>`
  display: block;
  margin-top: 10px;
  font-size: 12px;
  line-height: 18px;
  ${({ color }) =>
    color
      ? `
    color: ${color};
    font-weight: 500;
  `
      : `
    color: ${COLOR.kurlyGray600}
  `};
`;

const styles = {
  input: css`
    padding-bottom: 0;
  `,
  button: css`
    > span {
      font-size: 14px;
      font-weight: 500;
    }
  `,
};

export default function SignupAddressForm() {
  const {
    values: { numberAddress, subAddress },
    handleChange,
  } = useFormEvent<NormalSignupFormInterface>();

  const handleOpenAddress = useOpenAddress();

  const { currentAddress } = useAppSelector(({ shippingAddress }) => shippingAddress);

  useAddressEvent();

  return (
    <InputGroup
      label={'주소'}
      isRequired
      action={
        numberAddress && (
          <Button
            text={'재검색'}
            theme={'secondary'}
            icon="https://res.kurly.com/pc/service/cart/2007/ico_search.svg"
            onClick={handleOpenAddress}
          />
        )
      }
    >
      {!numberAddress ? (
        <Button
          theme="secondary"
          text="주소 검색"
          height={44}
          radius={4}
          icon="https://res.kurly.com/pc/service/cart/2007/ico_search.svg"
          css={styles.button}
          onClick={handleOpenAddress}
        />
      ) : (
        <>
          <InputBox
            id="numberAddress"
            name={'address'}
            value={numberAddress}
            placeholder="주소를 검색해 주세요"
            readOnly
          />
          <InputBox
            id="subAddress"
            name={'subAddress'}
            value={subAddress}
            maxLength={MAX_ADDRESS_DETAIL_LENGTH}
            placeholder="나머지 주소를 입력해주세요"
            css={styles.input}
            onChange={handleChange}
          />
        </>
      )}
      {currentAddress && numberAddress && (
        <HintText color={DELIVERY_TYPE[currentAddress?.deliveryType].color}>
          {DELIVERY_TYPE[currentAddress?.deliveryType].text}
        </HintText>
      )}
      <HintText>배송지에 따라 상품 정보가 달라질 수 있습니다.</HintText>
    </InputGroup>
  );
}
