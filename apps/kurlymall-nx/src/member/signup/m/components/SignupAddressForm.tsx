import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import COLOR from '../../../../shared/constant/colorset';

import { useAppSelector } from '../../../../shared/store';

import { useFormEvent } from '../../../../shared/hooks/useFormEvent';
import useAddressEvent from '../../hook/useAddressEvent';

import { NormalSignupFormInterface } from '../../interfaces/NormalSignupForm.interface';

import { DELIVERY_TYPE, MAX_ADDRESS_DETAIL_LENGTH } from '../../../../shared/constant';

import InputBox from '../../../../shared/components/Input/InputBox';
import InputGroup from '../../../../shared/components/InputGroup/InputGroup';
import { syncTempForm } from '../../reducers/signup.slice';

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

const AddressSearch = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999999;
`;

const Iframe = styled.iframe`
  width: 100%;
  height: 100%;
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

export default function MobileSignupAddressForm() {
  const dispatch = useDispatch();
  const {
    values,
    handleChange,
    context: { setValues },
  } = useFormEvent<NormalSignupFormInterface>();

  const { currentAddress } = useAppSelector(({ shippingAddress }) => shippingAddress);
  const { tempForm } = useAppSelector(({ signup }) => signup);

  const [showAddressSearch, setShowAddressSearch] = useState(false);
  useAddressEvent(setShowAddressSearch);

  const handleSearchAddress = useCallback(() => {
    dispatch(syncTempForm(values));
    setShowAddressSearch(true);
  }, [dispatch, setShowAddressSearch, values]);

  useEffect(() => {
    // formik context가 페이지 이동으로 사라짐으로,
    // 임시 form이 있을경우 다시 세팅해 줍니다.
    if (tempForm) {
      setValues(tempForm);
    }
  }, [setValues, tempForm]);

  return (
    <>
      <InputGroup label={'주소'} isRequired>
        <InputBox
          name={'numberAddress'}
          value={values.numberAddress}
          placeholder="도로명, 지번, 건물명 검색"
          readOnly
          icon={'https://res.kurly.com/kurly/ico/2021/search_20_20_333.svg'}
          onClick={handleSearchAddress}
          css={!values.numberAddress && styles.input}
        />
        {values.numberAddress && (
          <InputBox
            name={'subAddress'}
            value={values.subAddress}
            placeholder="나머지 주소를 입력해 주세요"
            onChange={handleChange}
            css={styles.input}
            maxLength={MAX_ADDRESS_DETAIL_LENGTH}
          />
        )}
        {currentAddress && values.numberAddress && (
          <HintText color={DELIVERY_TYPE[currentAddress?.deliveryType].color}>
            {DELIVERY_TYPE[currentAddress?.deliveryType].text}
          </HintText>
        )}
        <HintText>배송지에 따라 상품 정보가 달라질 수 있습니다.</HintText>
      </InputGroup>
      {showAddressSearch && (
        <AddressSearch>
          <Iframe src={'/address/shipping-address?isIframe=true'} frameBorder="0" width="100%" height="100%" />
        </AddressSearch>
      )}
    </>
  );
}
