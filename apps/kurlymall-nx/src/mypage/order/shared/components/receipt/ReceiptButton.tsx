import styled from '@emotion/styled';

import { css } from '@emotion/react';

import { isPC, isWebview } from '../../../../../../util/window/getDevice';
import COLOR from '../../../../../shared/constant/colorset';
import appService from '../../../../../shared/services/app.service';

const Button = styled.button`
  width: 100%;
  height: 48px;
  border: 1px solid ${COLOR.lightGray};
  border-radius: 6px;
  color: ${COLOR.kurlyGray800};
  font-size: 16px;
  font-weight: 600;
  ${isPC &&
  css`
    width: 200px;
    height: 56px;
    border-radius: 3px;
    font-weight: 500;
  `}
`;

export default function ReceiptButton({ title, receiptUrl }: { title: string; receiptUrl: string }) {
  const handleClickReceipt = () => {
    if (isWebview()) {
      appService.openWebview({
        url: receiptUrl,
        title,
        is_modal: false,
      });
      return;
    }
    window.open(receiptUrl, '_blank');
  };

  return (
    <Button type="button" onClick={handleClickReceipt}>
      {title}
    </Button>
  );
}
