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
import { ArrowRight } from '../../../../shared/icons';
import BenefitBanner from '../shared/BenefitBanner';
import LoversPartnership from '../../../../shared/icons/LoversPartnership';
import { GradeBenefitList } from '../../../../shared/api/events/member/benefit.api';
import useLoversGradeInfo from '../../hooks/useLoversGradeInfo';

type Props = {
  gradeBenefit: GradeBenefitList[];
  gradeBenefitTerms: string[];
};

const Container = styled.div`
  width: 780px;
  margin: 0 auto;
  padding-bottom: 65px;
  border-bottom: 1px solid ${COLOR.kurlyGray200};
`;

const GradeButtonWrap = styled.div<{ gradeName: GradeName }>`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;

  &::after {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 2px;
    background-color: ${({ gradeName }) => nextGradeStyle[gradeName].backgroundColor};
    content: '';
  }
`;

const GradeButton = styled.button<{ gradeName: GradeName; isActive: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  width: 146px;
  height: 90px;
  padding: 0 2px 12px 9px;
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
    height: 80px;
  }
  &:nth-of-type(3) {
    height: 70px;
  }
  &:nth-of-type(4) {
    height: 60px;
  }
  &:nth-of-type(5) {
    height: 50px;
  }
`;

const GradeNameText = styled.span`
  font-size: 16px;
`;

const GradepointRate = styled.span`
  display: flex;
  align-items: flex-end;
`;

const PointRate = styled.span`
  font-size: 12px;
`;

const PointNumber = styled.span`
  font-weight: 500;
  font-size: 18px;
`;

const buttonArrowStyle = css`
  margin: 2px 0 0 -4px;
`;

const GradeBenefitContent = styled.div`
  display: flex;
  align-items: flex-start;
  min-height: 240px;
  padding: 45px 13px 0;
  border-bottom: 1px solid ${COLOR.kurlyGray200};
`;

const GradeText = styled.div`
  width: 250px;
  letter-spacing: -0.4px;
  line-height: 1.5;
`;

const NameText = styled.strong<{ gradeName: GradeName }>`
  margin-bottom: 8px;
  font-weight: 500;
  font-size: 22px;
  color: ${({ gradeName }) => nextGradeStyle[gradeName].backgroundColor};
`;

const InfoText = styled.p`
  padding-top: 8px;
  font-weight: 300;
  font-size: 13px;
`;

const GradeBenefit = styled.div`
  display: flex;
  align-items: center;
`;

const BenefitInfo = styled.div`
  width: 300px;
`;

const BenefitInfoItem = styled.div`
  display: flex;
  padding-bottom: 13px;
  font-size: 14px;
  line-height: 22px;
  color: ${COLOR.kurlyGray800};
  letter-spacing: -0.6px;

  > svg {
    margin-top: -5px;
  }
`;

const OuterBenefitText = styled.div`
  display: flex;
  flex-direction: column;
`;

const BenefitText = styled.p`
  padding-left: 25px;
`;

const EmphNumber = styled.strong`
  font-weight: 500;
  font-size: 20px;
  letter-spacing: -0.5px;
`;

const TotalBenefitInfo = styled.div`
  line-height: 22px;
`;

const ExText = styled.p`
  font-size: 12px;
  color: ${COLOR.kurlyGray450};
`;

const GradeBenefitNotice = styled.ul`
  padding: 25px 15px 40px;
  color: ${COLOR.kurlyGray450};
  font-weight: 300;
  font-size: 13px;
  line-height: 23px;
`;

const NoticeItem = styled.li`
  position: relative;
  padding-left: 7px;

  &::before {
    position: absolute;
    top: 10px;
    left: 0;
    width: 3px;
    height: 3px;
    border-radius: 100%;
    background-color: ${COLOR.kurlyGray450};
    content: '';
  }
`;

const BannerWrap = styled.div`
  width: 700px;
  margin: 0 auto;
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
            <GradeNameText>{id}</GradeNameText>
            <GradepointRate>
              <PointRate>
                <PointNumber>{pointRate}</PointNumber>%
              </PointRate>
              <ArrowRight
                css={buttonArrowStyle}
                width={20}
                height={20}
                stroke={id === gradeActive ? COLOR.kurlyWhite : nextGradeStyle[id].backgroundColor}
              />
            </GradepointRate>
          </GradeButton>
        ))}
      </GradeButtonWrap>
      {gradeBenefitContent.map(
        ({ id, orderPriceSum, reviewPoint, pointRate, gift, benefitPrice, benefitPriceSum, outerBenefitPC }) => (
          <GradeBenefitContent key={`${id}-content`}>
            <GradeText>
              <NameText gradeName={gradeActive}>{id}</NameText>
              <InfoText>
                전월 실적 {orderPriceSum}만원 이상
                <br />
                (결제 금액+적립금 사용액)
              </InfoText>
            </GradeText>
            <GradeBenefit>
              <BenefitInfo>
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
                {isPartnershipBenefit(id) && outerBenefitPC && (
                  <BenefitInfoItem>
                    <LoversPartnership fill={nextGradeStyle[id].backgroundColor} />
                    <OuterBenefitText>
                      <BenefitText>외부 제휴 혜택</BenefitText>
                      {outerBenefitPC.map((benefit) => {
                        return <BenefitText key={benefit}>- {benefit}</BenefitText>;
                      })}
                    </OuterBenefitText>
                  </BenefitInfoItem>
                )}
              </BenefitInfo>
              <TotalBenefitInfo>
                총 적립 금액 {benefitPriceSum}
                <ExText>※ {id} 등급 연간 유지 시</ExText>
              </TotalBenefitInfo>
            </GradeBenefit>
          </GradeBenefitContent>
        ),
      )}
      <GradeBenefitNotice>
        {gradeBenefitTerms.map((list, index) => (
          <NoticeItem key={`notice-${index}`}>{list}</NoticeItem>
        ))}
      </GradeBenefitNotice>
      <BannerWrap>
        <BenefitBanner
          info={NEXT_GRADE_BENEFIT_INFO}
          iconMarginRight={30}
          padding={'15px 20px 15px 25px'}
          lineHeight={18}
        />
      </BannerWrap>
    </Container>
  );
}
