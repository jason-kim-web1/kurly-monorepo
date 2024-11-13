import styled from '@emotion/styled';

import { useEffect, useState } from 'react';

import { keyframes } from '@emotion/react';

import COLOR from '../../../../shared/constant/colorset';
import { LoversTooltipArrow } from '../../../../shared/images';

import { GRADE_LIST } from '../../constants';
import { GradeName } from '../../../../shared/enums';
import { addComma } from '../../../../shared/services';
import { useAppSelector } from '../../../../shared/store';
import nextGradeStyle from '../../constants/nextGradeStyle';

const progressBarMotion = (progressValue: number) => keyframes`
  from {
    width: 0;
  }
  to {
    width: ${progressValue}%;
  }
`;

const Graph = styled.div`
  position: relative;
  height: 6px;
  border: 1px solid ${COLOR.gradeGraphBorder};
  border-radius: 5px;
  background-color: ${COLOR.gradeGraphBg};
`;

const Bar = styled.div<{ progressValue: number; grade: GradeName }>`
  position: absolute;
  left: 0;
  top: -1px;
  width: ${({ progressValue }) => progressValue}%;
  animation: ${(props) => progressBarMotion(props.progressValue)} 0.3s linear;
  height: 6px;
  border-radius: 5px;
  background-color: ${({ grade }) =>
    grade === GradeName.Normal
      ? nextGradeStyle[GradeName.Friends].backgroundColor
      : nextGradeStyle[grade].backgroundColor};
`;

const ToolTipLayer = styled.div`
  position: relative;
  padding-top: 22px;
`;

const InnerLayer = styled.div`
  height: 34px;
  border: 1px solid ${COLOR.gradeToolTipBorder};
  border-radius: 4px;
  line-height: 34px;
  background-color: ${COLOR.gradeToolTipBg};
`;

const Arrow = styled.div<{ progressValue: number }>`
  position: absolute;
  top: 11px;
  left: ${({ progressValue }) => progressValue}%;
  width: 17px;
  height: 12px;
  margin-left: -8px;
  background: url(${LoversTooltipArrow}) no-repeat;
  background-size: 17px 12px;
`;

const Text = styled.p`
  font-size: 14px;
  color: ${COLOR.kurlyGray800};
  text-align: center;
`;

const GradeText = styled.span<{ grade: GradeName }>`
  font-weight: 600;
  color: ${({ grade }) => nextGradeStyle[grade].backgroundColor};
`;

export default function GradeProgress() {
  const [progressValue, setProgressValue] = useState(0);

  const {
    nextMonth: { name },
    upgradeInfo: {
      orderPriceSum,
      requireOrderPriceSum,
      upgradeLevel: { name: upgradeLevelName },
    },
  } = useAppSelector(({ member }) => member.gradeInfo);

  useEffect(() => {
    const nextGrade = GRADE_LIST[name];
    const nextUpgradeGrade = GRADE_LIST[upgradeLevelName];

    const currentIndex = Object.keys(GRADE_LIST).indexOf(name);

    const remainingAmount = orderPriceSum - nextGrade.amount;
    const addedAmount = nextUpgradeGrade.amount - nextGrade.amount;
    const progressWidth = currentIndex * 20 + ((remainingAmount / addedAmount) * 100) / 5;

    if (progressWidth < 5) {
      setProgressValue(4);
    } else if (progressWidth > 97) {
      setProgressValue(97);
    } else {
      setProgressValue(Math.round(progressWidth));
    }
  }, [name, orderPriceSum, upgradeLevelName]);

  return (
    <>
      <Graph>
        <Bar grade={name} progressValue={progressValue} />
      </Graph>
      <ToolTipLayer>
        <InnerLayer>
          <Arrow progressValue={progressValue} />
          <Text>
            {addComma(requireOrderPriceSum)}원 추가 구매시,{' '}
            <GradeText grade={upgradeLevelName}>{upgradeLevelName}</GradeText> 달성 !
          </Text>
        </InnerLayer>
      </ToolTipLayer>
    </>
  );
}
