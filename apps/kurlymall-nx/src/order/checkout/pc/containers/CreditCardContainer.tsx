import { useDispatch } from 'react-redux';

import styled from '@emotion/styled';

import Select from '../components/Select';

import { useAppSelector } from '../../../../shared/store';
import { selectCreditCard, setSelectedInstallment } from '../../../checkout/shared/reducers/checkout-payment.slice';
import { CreditCard, Installment } from '../../../shared/shared/interfaces';

const Container = styled.div`
  margin-top: 20px;
`;

const SelectWrap = styled.div`
  :not(:first-of-type) {
    margin-top: 10px;
  }
`;

export default function CreditCardContainer() {
  const dispatch = useDispatch();
  const { selectedCreditCard, selectedInstallment, creditCards, installments } = useAppSelector(
    ({ checkoutPayment }) => ({
      selectedCreditCard: checkoutPayment.selectedCreditCard,
      selectedInstallment: checkoutPayment.selectedInstallment,
      creditCards: checkoutPayment.creditCards,
      installments: checkoutPayment.installments,
    }),
  );

  const installmentOptions = selectedCreditCard ? installments[selectedCreditCard.value] : [];

  const handleChangeCreditCard = (value: { name: string; value: string }) => {
    dispatch(selectCreditCard(value as CreditCard));
  };

  const handleChangeInstallment = (value: { name: string; value: string }) => {
    dispatch(setSelectedInstallment(value as Installment));
  };

  return (
    <Container>
      <SelectWrap>
        <Select
          placeholder="카드를 선택해주세요"
          value={selectedCreditCard}
          options={creditCards}
          onChange={handleChangeCreditCard}
        />
      </SelectWrap>
      <SelectWrap>
        <Select
          placeholder="할부를 선택해주세요"
          value={selectedInstallment}
          options={installmentOptions}
          disabled={!selectedCreditCard}
          onChange={handleChangeInstallment}
        />
      </SelectWrap>
    </Container>
  );
}
