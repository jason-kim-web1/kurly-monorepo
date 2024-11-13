import styled from '@emotion/styled';

import { css } from '@emotion/react';

import Button from '../../../../../shared/components/Button/Button';
import KurlyCardCheckbox from './KurlyCardCheckbox';

const Field = styled.div`
  display: flex;
  width: 414px;
  justify-content: space-between;
  margin-top: 13px;
`;

const PointUsage = styled.div`
  display: flex;
  flex-direction: column;

  p {
    margin-bottom: 10px;
  }
`;

const styles = {
  button: css`
    margin-top: -5px;
    > span {
      font-size: 14px;
    }
  `,
};

interface Props {
  isSelectedPoint: boolean;
  isPLCCExisted: boolean;
  onClickPoint: () => void;
  onClickIssueCard: () => void;
  disabled?: boolean;
}

export default function KurlyCard({
  isSelectedPoint = false,
  isPLCCExisted = false,
  onClickPoint,
  onClickIssueCard,
  disabled,
}: Props) {
  return (
    <Field>
      <PointUsage>
        <p>[컬리카드] 첫 결제 3만원 할인</p>
        <KurlyCardCheckbox isSelectedPoint={isSelectedPoint} onClickPoint={onClickPoint} disabled={disabled} />
      </PointUsage>
      {!isPLCCExisted && (
        <Button
          width={100}
          height={44}
          text="카드발급"
          theme="primary"
          radius={3}
          onClick={onClickIssueCard}
          css={styles.button}
        />
      )}
    </Field>
  );
}
