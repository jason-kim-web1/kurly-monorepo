import { Button, Typography } from '@thefarmersfront/kpds-react';
import styled from '@emotion/styled';
import { vars } from '@thefarmersfront/kpds-css';

import { OrderDetail } from '../../interface/OrderDetail';
import { RECEIPT_TITLE, RECEIPT_TYPE } from '../../constants/receipt';
import { usePaymentReceipt } from '../../hooks/usePaymentReceipt';

const FullWidthButton = styled(Button)`
  width: 100%;
  margin-top: ${vars.spacing.$16};
`;

interface Props {
  receipt: OrderDetail['receipt'];
}

const PaymentReceipt = ({ receipt: { creditCardUrl, cashUrl } }: Props) => {
  const { isHideReceiptButton, handleClickReceiptButton } = usePaymentReceipt({ creditCardUrl, cashUrl });

  if (isHideReceiptButton) {
    return null;
  }

  return (
    <>
      {creditCardUrl && (
        <FullWidthButton
          _type="secondary"
          _style="stroke"
          color="light"
          size="large"
          onClick={() => handleClickReceiptButton(RECEIPT_TYPE.CREDIT_CART)}
        >
          <Typography variant="$xlargeSemibold">{RECEIPT_TITLE.CREDIT_CART}</Typography>
        </FullWidthButton>
      )}
      {cashUrl && (
        <FullWidthButton
          _type="secondary"
          _style="stroke"
          color="light"
          size="large"
          onClick={() => handleClickReceiptButton(RECEIPT_TYPE.CASH)}
        >
          <Typography variant="$xlargeSemibold">{RECEIPT_TITLE.CASH}</Typography>
        </FullWidthButton>
      )}
    </>
  );
};

export default PaymentReceipt;
