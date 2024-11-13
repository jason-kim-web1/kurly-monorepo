import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { useDispatch } from 'react-redux';

import Select from '../Select';

import { useAppSelector } from '../../../../../shared/store';
import { Installment } from '../../../../shared/shared/interfaces';
import { selectVendor, setKurlypayCardInstallment } from '../../../shared/reducers/checkout-payment.slice';
import { PaymentVenderName } from '../../../../../shared/constant';

const select = css`
  width: 100%;
  font-size: 16px;
  height: 38px;

  > button {
    height: 38px;
  }
`;

const SelectboxWrapper = styled.div`
  width: 206px;
  margin: 0 auto;
`;

export default function KurlypayInstallmentSeletBox({
  installments,
  className,
}: {
  installments: Installment[];
  className?: string;
}) {
  const dispatch = useDispatch();

  const { selectedVendor, kurlypayInstallment } = useAppSelector(({ checkoutPayment }) => ({
    selectedVendor: checkoutPayment.selectedVendor,
    kurlypayInstallment: checkoutPayment.kurlypayInstallment,
  }));

  const handleSelectInstalment = (value: Installment) => {
    if (selectedVendor?.code !== PaymentVenderName.KURLYPAY) {
      dispatch(selectVendor('kurlypay'));
    }
    dispatch(setKurlypayCardInstallment(value));
  };

  return (
    <SelectboxWrapper className={className}>
      <Select
        css={select}
        placeholder="할부를 선택해주세요"
        value={kurlypayInstallment}
        options={installments}
        onChange={handleSelectInstalment}
      />
    </SelectboxWrapper>
  );
}
