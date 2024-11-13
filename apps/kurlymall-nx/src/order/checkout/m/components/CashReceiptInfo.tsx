import styled from '@emotion/styled';

import { css } from '@emotion/react';

import COLOR from '../../../../shared/constant/colorset';
import Button from '../../../../shared/components/Button/Button';

const ReceiptInfoText = styled.p`
  padding-top: 6px;
  color: ${COLOR.kurlyGray600};
`;

const styles = {
  button: css`
    position: absolute;
    top: 23px;
    right: 20px;
    padding: 0;
    > span {
      font-size: 14px;
    }
  `,
};

interface Props {
  hasReceiptInfo?: boolean;
  openCashReceipt: () => void;
}

export default function CashReceiptInfo({ hasReceiptInfo = false, openCashReceipt }: Props) {
  return (
    <>
      <ReceiptInfoText>신청 정보를 등록해 주세요</ReceiptInfoText>
      <Button
        text={hasReceiptInfo ? '수정하기' : '신청하기'}
        theme={hasReceiptInfo ? 'tertiary' : 'secondary'}
        radius={4}
        css={styles.button}
        width={77}
        height={36}
        onClick={openCashReceipt}
      />
    </>
  );
}
