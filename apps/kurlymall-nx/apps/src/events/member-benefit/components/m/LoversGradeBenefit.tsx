import styled from '@emotion/styled';

import { useState } from 'react';

import { css } from '@emotion/react';

import COLOR from '../../../../shared/constant/colorset';
import { NEXT_GRADE_BENEFIT_INFO } from '../../constants';
import { GradeName } from '../../../../shared/enums';
import nextGradeStyle from '../../../../mypage/next-grade/constants/nextGradeStyle';
import LoversWon from '../../../../shared/icons/LoversWon';
import LoversDouble from '../../../../shared/icons/LoversDouble';
import LoversGift from '../../../../shared/icons/LoversGift';
import LoversCoupon from '../../../../shared/icons/LoversCoupon';
import BenefitBanner from '../shared/BenefitBanner';
import useLoversGradeInfo from '../../hooks/useLoversGradeInfo';
import { GradeBenefitList } from '../../../../shared/api/events/member/benefit.api';
import LoversPartnership from '../../../../shared/icons/LoversPartnership';

type Props = {
  gradeBenefit: GradeBenefitList[];
  gradeBenefitTerms: string[];
};

const Container = styled.div`
  padding-bottom: 80px;
`;

const GradeButtonWrap = styled.div<{ gradeName: GradeName }>`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  max-width: 375px;
  margin: 0 auto;
  padding: 0 17px;

  &::after {
    position: absolute;
    left: 20px;
    right: 20px;
    bottom: 0;
    height: 2px;
    background-color: ${({ gradeName }) => nextGradeStyle[gradeName].backgroundColor};
    content: '';
  }
`;

const GradeButton = styled.button<{ gradeName: GradeName; isActive: boolean }>`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 96px;
  margin: auto 3px 0;
  padding: 10px 0 6px;
  border-radius: 5px 0 0 0;
  border: ${({ gradeName }) => nextGradeStyle[gradeName].border};
  color: ${({ gradeName }) => nextGradeStyle[gradeName].backgroundColor};

  ${({ isActive, gradeName }) =>
    isActive &&
    css`
      color: ${COLOR.kurlyWhite};
      background-color: ${nextGradeStyle[gradeName]};
      transition: background-color 0.3s ease-in-out;
      svg {
        opacity: 0.5;
      }
    `}

  &:nth-of-type(2) {
    height: 88px;
  }
  &:nth-of-type(3) {
    height: 80px;
  }
  &:nth-of-type(4) {
    height: 72px;
  }
  &:nth-of-type(5) {
    height: 64px;
  }
`;

const GradepointRate = styled.span`
  font-size: 12px;
`;

const PointNumber = styled.span`
  font-weight: 500;
  font-size: 18px;
`;

const GradeBenefitContent = styled.div`
  display: flex;
  align-items: flex-start;
  min-height: 240px;
  padding: 25px 30px 0;
`;

const GradeText = styled.div`
  min-width: 30%;
  line-height: 1.3;
  letter-spacing: -0.4px;
`;

const NameText = styled.strong<{ gradeName: GradeName }>`
  margin-bottom: 8px;
  font-weight: 500;
  font-size: 18px;
  color: ${({ gradeName }) => nextGradeStyle[gradeName].backgroundColor};
`;

const InfoText = styled.p`
  padding-top: 8px;
  font-weight: 300;
  font-size: 12px;
  color: ${COLOR.kurlyGray600};
`;

const GradeBenefit = styled.div`
  font-size: 14px;
  line-height: 22px;
  letter-spacing: -0.6px;
  color: ${COLOR.kurlyGray800};
`;

const BenefitInfoItem = styled.div`
  display: flex;
  padding-bottom: 12px;

  > svg {
    margin-top: -5px;
  }
`;

const OuterBenefitList = styled.div`
  display: flex;
  flex-direction: column;
`;

const OuterBenefitListItem = styled.div`
  padding-left: 20px;
`;

const OuterBenefitText = styled.p`
  position: relative;
  white-space: pre-wrap;
  padding-left: 10px;
  &::after {
    position: absolute;
    top: 0;
    left: 0;
    content: '-';
  }
`;

const BenefitText = styled.p`
  padding-left: 20px;
  white-space: pre-wrap;
`;

const EmphNumber = styled.strong`
  font-weight: 500;
  font-size: 20px;
  letter-spacing: -0.5px;
`;

const TotalBenefitInfo = styled.div`
  padding-left: 45px;
  font-weight: 500;
  line-height: 1.5;
`;

const ExText = styled.p`
  font-weight: 300;
  font-size: 12px;
  color: ${COLOR.kurlyGray450};
`;

const GradeInfoText = styled.p`
  padding: 10px 30px 13px;
  line-height: 21px;
  color: ${COLOR.kurlyPurple};
  letter-spacing: -0.4px;
`;

const GradeBenefitNotice = styled.ul`
  margin: 0 20px;
  padding: 14px 4px 30px;
  border-top: 1px solid ${COLOR.kurlyGray200};
  font-size: 12px;
  line-height: 1.7;
  color: ${COLOR.kurlyGray450};
`;

const NoticeItem = styled.li`
  position: relative;
  padding-left: 7px;

  &::before {
    position: absolute;
    top: 9px;
    left: 0;
    width: 2px;
    height: 2px;
    border-radius: 100%;
    background-color: ${COLOR.kurlyGray450};
    content: '';
  }
`;

const BannerWrap = styled.div`
  padding: 0 20px;
`;

export default function LoversGradeBenefit({ gradeBenefit, gradeBenefitTerms }: Props) {
  const [gradeActive, setGradeActive] = useState(GradeName.ThePurple);

  const { isPartnershipBenefit, gradeBenefitPrice } = useLoversGradeInfo();

  const gradeBenefitContent = gradeBenefit.filter(({ id }) => id === gradeActive);

  const handleClickGrade = (gradeName: GradeName) => {
    setGradeActive(gradeName);
  };

  return (
    <Container>
      <GradeButtonWrap gradeName={gradeActive}>
        {gradeBenefit.map(({ id, pointRate }) => (
          <GradeButton
            key={`${id}-button`}
            onClick={() => handleClickGrade(id)}
            gradeName={id}
            isActive={id === gradeActive}
          >
            {id}
            <GradepointRate>
              <PointNumber>{pointRate}</PointNumber>%
            </GradepointRate>
          </GradeButton>
        ))}
      </GradeButtonWrap>
      {gradeBenefitContent.map(
        ({ id, orderPriceSum, reviewPoint, pointRate, gift, benefitPrice, benefitPriceSum, outerBenefitMW }) => (
          <GradeBenefitContent key={`${id}-content`}>
            <GradeText>
              <NameText gradeName={gradeActive}>{id}</NameText>
              <InfoText>
                전월 실적
                <br />
                {`${orderPriceSum}만원 이상`}
              </InfoText>
            </GradeText>
            <GradeBenefit>
              <BenefitInfoItem>
                <LoversWon stroke={nextGradeStyle[id].backgroundColor} />
                <BenefitText>
                  적립 <EmphNumber>{pointRate}</EmphNumber>%
                </BenefitText>
              </BenefitInfoItem>
              {reviewPoint && (
                <BenefitInfoItem>
                  <LoversDouble stroke={nextGradeStyle[id].backgroundColor} />
                  <BenefitText>{reviewPoint}</BenefitText>
                </BenefitInfoItem>
              )}
              {gift && (
                <BenefitInfoItem>
                  <LoversGift stroke={nextGradeStyle[id].backgroundColor} />
                  <BenefitText>{gift}</BenefitText>
                </BenefitInfoItem>
              )}
              <BenefitInfoItem>
                <LoversCoupon stroke={nextGradeStyle[id].backgroundColor} />
                <BenefitText>
                  최대 <EmphNumber>{benefitPrice}</EmphNumber>
                  {gradeBenefitPrice(id)} 추가 혜택
                  <br />
                  (깜짝 쿠폰, 적립 이벤트 등)
                </BenefitText>
              </BenefitInfoItem>
              {isPartnershipBenefit(id) && outerBenefitMW && (
                <BenefitInfoItem>
                  <LoversPartnership fill={nextGradeStyle[id].backgroundColor} />
                  <OuterBenefitList>
                    <BenefitText>외부 제휴 혜택</BenefitText>
                    <OuterBenefitListItem>
                      {outerBenefitMW.map((benefit) => {
                        return <OuterBenefitText key={benefit}>{benefit}</OuterBenefitText>;
                      })}
                    </OuterBenefitListItem>
                  </OuterBenefitList>
                </BenefitInfoItem>
              )}
              <TotalBenefitInfo>
                총 적립 금액 {benefitPriceSum}
                <ExText>※ {id} 등급 연간 유지 시</ExText>
              </TotalBenefitInfo>
            </GradeBenefit>
          </GradeBenefitContent>
        ),
      )}
      <GradeInfoText>전월 실적은 전월 결제액과 적립금 사용액의 합계입니다.</GradeInfoText>
      <GradeBenefitNotice>
        {gradeBenefitTerms.map((list, index) => (
          <NoticeItem key={`notice-${index}`}>{list}</NoticeItem>
        ))}
      </GradeBenefitNotice>
      <BannerWrap>
        <BenefitBanner info={NEXT_GRADE_BENEFIT_INFO} />
      </BannerWrap>
    </Container>
  );
}
