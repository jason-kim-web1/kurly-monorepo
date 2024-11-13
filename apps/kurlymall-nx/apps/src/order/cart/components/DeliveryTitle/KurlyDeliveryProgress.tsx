import styled from '@emotion/styled';
import { vars } from '@thefarmersfront/kpds-css';
import { Typography } from '@thefarmersfront/kpds-react';

import useKurlyDeliveryProgress from '../../hooks/useKurlyDeliveryProgress';
import { multiMaxLineText } from '../../../../shared/utils';

const Wrapper = styled.div`
  width: 100%;
  text-align: right;
  margin: ${vars.spacing.$4} ${vars.spacing.$0} ${vars.spacing.$4} 14px;
`;

const Progress = styled.div`
  position: relative;
  height: 6px;
  background-color: ${vars.color.background.$background3};
  border-radius: ${vars.radius.$6};
  overflow: hidden;
`;

const Bar = styled.span<{ width: number; isMembersBenefit: boolean }>`
  position: absolute;
  top: 0;
  left: -100%;
  bottom: 0;
  width: 100%;
  background-color: ${({ isMembersBenefit }) =>
    isMembersBenefit ? vars.color.member.$members : vars.color.$purple800};
  border-radius: ${vars.radius.$6};
  transform: translateX(${({ width }) => width * 100}%);
  transition: transform 0.3s ease-in-out;
`;

const RemainingFreeShippingCost = styled(Typography)`
  color: ${vars.color.text.$tertiary};
  margin: ${vars.spacing.$0} ${vars.spacing.$0} ${vars.spacing.$10} 65px;
  ${multiMaxLineText(3)}
`;

export default function KurlyDeliveryProgress() {
  const { remainingCostText, progressState, isMembersBenefit } = useKurlyDeliveryProgress();

  return (
    <Wrapper>
      <RemainingFreeShippingCost variant="$mediumSemibold">{remainingCostText}</RemainingFreeShippingCost>
      <Progress>
        <Bar width={progressState} isMembersBenefit={isMembersBenefit} />
      </Progress>
    </Wrapper>
  );
}
