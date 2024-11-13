import styled from '@emotion/styled';

import { css } from '@emotion/react';

import Checkbox from '../../../../shared/components/Input/Checkbox';
import { QuestionMark } from '../../../../shared/icons';
import COLOR from '../../../../shared/constant/colorset';
import useKurlypayCardPoint from '../../../shared/shared/hooks/useKurlypayCardPoint';
import { isPC } from '../../../../../util/window/getDevice';

import useToggle from '../hooks/useToggle';
import HyundaiPointInfoDialog from './HyundaiPointInfoDialog';

const Wrapper = styled.div`
  display: flex;
  margin: 12px auto 0;
  align-items: center;
  ${isPC && 'width: 206px;'};
`;

const CheckboxText = styled.span`
  display: flex;
  align-items: center;
  margin-left: -6px;
  font-size: 14px;
`;

const styles = {
  label: css`
    padding: 0;
  `,
  questionMark: css`
    margin-top: 1px;
    margin-left: 3px;
    cursor: pointer;
  `,
};

export default function HyundaiCardPoint() {
  const { checked, handleCardPointCheckbox, disableHyundaiPoint } = useKurlypayCardPoint();
  const { isOpen, open, close } = useToggle();

  return (
    <Wrapper>
      <Checkbox
        label={<CheckboxText>M포인트 사용</CheckboxText>}
        width={20}
        height={20}
        checked={checked}
        css={styles.label}
        disabled={disableHyundaiPoint}
        onChange={handleCardPointCheckbox}
      />
      <QuestionMark stroke={COLOR.kurlyGray350} fill={COLOR.kurlyGray350} css={styles.questionMark} onClick={open} />
      <HyundaiPointInfoDialog isOpen={isOpen} onClose={close} />
    </Wrapper>
  );
}
