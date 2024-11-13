import styled from '@emotion/styled';

import { css } from '@emotion/react';

import ReceiptButton from './ReceiptButton';
import { Receipt } from '../../../../../shared/interfaces/Receipt';
import { isPC } from '../../../../../../util/window/getDevice';

const ReceiptWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 8px;
  padding: 17px 20px 0;
  ${isPC &&
  css`
    gap: 12px;
    padding-top: 40px;
    justify-content: center;
  `}
`;

export default function ReceiptField({ receipt }: { receipt: Receipt }) {
  return receipt.creditCardUrl || receipt.cashUrl ? (
    <ReceiptWrapper>
      {receipt.creditCardUrl && <ReceiptButton title={'카드영수증'} receiptUrl={receipt.creditCardUrl} />}
      {receipt.cashUrl && <ReceiptButton title={'현금영수증'} receiptUrl={receipt.cashUrl} />}
    </ReceiptWrapper>
  ) : null;
}
