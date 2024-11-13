import styled from '@emotion/styled';

import COLOR from '../../../../shared/constant/colorset';

import { GradeName } from '../../../../shared/enums';
import { GRADE_LIST, isNormalPointExcludeTime } from '../../constants';
import { useAppSelector } from '../../../../shared/store';
import { addComma } from '../../../../shared/services';
import BenefitItem from './BenefitItem';
import nextGradeStyle from '../../constants/nextGradeStyle';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 30px;
  text-align: center;
`;

const Title = styled.h2`
  padding: 35px 0 0;
  font-weight: 500;
  font-size: 18px;
  line-height: 20px;
  color: ${COLOR.kurlyGray800};
`;

const GradeIcon = styled.div<{ grade: GradeName }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60px;
  height: 60px;
  margin: 22px auto 0;
  border-radius: 3px;
  font-weight: 700;
  line-height: 20px;
  background-color: ${COLOR.kurlyWhite};
  letter-spacing: 0.5px;
  color: ${COLOR.kurlyWhite};
  ${({ grade }) => nextGradeStyle[grade]};
`;

const InfoText = styled.p`
  margin-top: 23px;
  padding: 20px 0;
  border-top: 1px solid ${COLOR.bg};
  font-size: 12px;
  line-height: 18px;
  color: ${COLOR.kurlyGray600};
  text-align: center;
`;

const SubText = styled.span`
  display: block;
  padding-top: 3px;
  font-weight: 600;
`;

export default function GradeTopInfo() {
  const {
    currentMonth: { name: currentGradeName },
    nextMonth: { name: nextGradeName },
    upgradeInfo: { orderPriceSum, paymentPriceSum, usedPointSum },
  } = useAppSelector(({ member }) => ({
    currentMonth: member.gradeInfo.currentMonth,
    nextMonth: member.gradeInfo.nextMonth,
    upgradeInfo: member.gradeInfo.upgradeInfo,
  }));

  const isWelcomeFirstOrder = currentGradeName === GradeName.Welcome && orderPriceSum === 0;

  const isDisplayBenefit = (gradeName: string) => {
    return gradeName !== GradeName.Normal || !isNormalPointExcludeTime;
  };

  return (
    <Container>
      <Title>다음 달 나의 예상 등급</Title>
      <GradeIcon grade={nextGradeName}>{nextGradeName}</GradeIcon>
      {isDisplayBenefit(nextGradeName) && (
        <BenefitItem nextGradeName={nextGradeName} nextGradePoint={GRADE_LIST[nextGradeName].point} />
      )}
      {isWelcomeFirstOrder ? ( // 웰컴 등급 사용자의 구매실적 금액이 0인 경우
        <InfoText>첫 구매하고 컬리러버스 멤버가 되어보세요 !</InfoText>
      ) : (
        <InfoText>
          이번 달 실적 {GRADE_LIST[nextGradeName].text}
          <br />
          <SubText>
            누적 결제액 : {addComma(paymentPriceSum)}원
            <br />
            누적 적립금 사용액 : {addComma(usedPointSum)}원
          </SubText>
        </InfoText>
      )}
    </Container>
  );
}
