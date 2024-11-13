import styled from '@emotion/styled';

import COLOR from '../../../../shared/constant/colorset';

import { GradeName } from '../../../../shared/enums';
import { addComma } from '../../../../shared/services';
import { useAppSelector } from '../../../../shared/store';
import nextGradeStyle from '../../constants/nextGradeStyle';

const Title = styled.h2`
  font-weight: 500;
  font-size: 24px;
  line-height: 36px;
  text-align: center;
  letter-spacing: 0.2px;
`;

const GradeIcon = styled.div<{ grade: GradeName }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 68px;
  height: 68px;
  margin: 24px auto 0;
  border-radius: 3px;
  font-size: 18px;
  line-height: 22px;
  background-color: ${COLOR.kurlyWhite};
  color: ${COLOR.kurlyWhite};
  ${({ grade }) => nextGradeStyle[grade]};
  letter-spacing: 0.5px;
`;

const InfoText = styled.p`
  height: 103px;
  padding: 26px 0 0;
  font-weight: 500;
  font-size: 14px;
  line-height: 18px;
  text-align: center;
`;

const SubText = styled.span`
  display: block;
  padding-top: 5px;
  font-size: 12px;
  line-height: 18px;
  white-space: nowrap;
`;

const Text = styled.p`
  margin-bottom: 10px;
  font-size: 12px;
  color: ${COLOR.kurlyGray600};
`;

export default function GradeTopInfo() {
  const {
    currentMonth: { name: currentGradeName },
    nextMonth: { name: nextGradeName },
    upgradeInfo: {
      orderPriceSum,
      paymentPriceSum,
      usedPointSum,
      requireOrderPriceSum,
      upgradeLevel: { name: upgradeGradeName },
    },
  } = useAppSelector(({ member }) => member.gradeInfo);

  return (
    <>
      <Title>다음 달 나의 예상 등급</Title>
      <GradeIcon grade={nextGradeName}>{nextGradeName}</GradeIcon>

      {currentGradeName === '웰컴' && orderPriceSum === 0 ? ( // 웰컴 등급 사용자의 구매실적 금액이 0인 경우
        <InfoText>첫 구매하고 컬리러버스 멤버가 되어보세요 !</InfoText>
      ) : (
        <InfoText>
          {addComma(requireOrderPriceSum)} 원 추가 구매시, {upgradeGradeName} 달성
          <SubText>
            (누적 결제액 : {addComma(paymentPriceSum)}원, 누적 적립금 사용액 : {addComma(usedPointSum)}원)
          </SubText>
        </InfoText>
      )}
      <Text>* 전월 실적은 전월 결제액과 적립금 사용액 합계입니다.</Text>
    </>
  );
}
