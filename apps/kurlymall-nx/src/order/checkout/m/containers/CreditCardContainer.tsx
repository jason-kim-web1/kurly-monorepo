import { useDispatch } from 'react-redux';

import styled from '@emotion/styled';
import { css } from '@emotion/react';

import { useAppSelector } from '../../../../shared/store';
import { selectCreditCard, setSelectedInstallment } from '../../../checkout/shared/reducers/checkout-payment.slice';

import SelectButtonWithModal from '../../../../shared/components/Input/SelectButtonWithModal';
import { CreditCard, Installment } from '../../../shared/shared/interfaces';

const Container = styled.div`
  padding-top: 20px;
`;

const select = css`
  margin-top: 8px;
  font-size: 16px;
`;

const styles = {
  select: {
    fontSize: '16px',
  },
};

export default function CreditCardContainer() {
  const dispatch = useDispatch();
  const { creditCards, installments, selectedCreditCard, selectedInstallment } = useAppSelector(
    ({ checkoutPayment }) => ({
      creditCards: checkoutPayment.creditCards,
      installments: checkoutPayment.installments,
      selectedCreditCard: checkoutPayment.selectedCreditCard,
      selectedInstallment: checkoutPayment.selectedInstallment,
    }),
  );

  const installmentOptions = selectedCreditCard ? installments[selectedCreditCard.value] : [];

  const handleSelectCard = (value: CreditCard) => {
    dispatch(selectCreditCard(value));
  };

  const handleSelectInstallment = (value: Installment) => {
    dispatch(setSelectedInstallment(value));
  };

  return (
    <Container>
      <SelectButtonWithModal
        id="creditcard"
        title="카드 선택"
        value={selectedCreditCard}
        placeholder="카드를 선택해주세요"
        options={creditCards}
        onSelect={handleSelectCard}
        css={styles.select}
      />
      <SelectButtonWithModal
        id="installment"
        title="할부 선택"
        css={select}
        placeholder="할부를 선택해주세요"
        disabled={!selectedCreditCard}
        value={selectedInstallment}
        options={installmentOptions}
        onSelect={handleSelectInstallment}
      />
    </Container>
  );
}
