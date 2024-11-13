import styled from '@emotion/styled';

import { css } from '@emotion/react';

import Button from '../../../../shared/components/Button/Button';

const Field = styled.div`
  display: flex;
  width: 414px;
  align-items: center;
  justify-content: space-between;
`;

const styles = {
  button: css`
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
    <Field>
      <p>신청 정보를 등록해 주세요</p>
      <Button
        text={hasReceiptInfo ? '수정하기' : '신청하기'}
        theme={hasReceiptInfo ? 'tertiary' : 'secondary'}
        radius={4}
        css={styles.button}
        width={100}
        height={44}
        onClick={openCashReceipt}
      />
    </Field>
  );
}
