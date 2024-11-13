import { useMemo } from 'react';

import styled from '@emotion/styled';

import COLOR from '../../../../shared/constant/colorset';
import {
  CircleCheckIcon1,
  CircleCheckIcon2,
  CircleCheckIcon3,
  CircleCheckIcon4,
  CircleIcon,
} from '../../../../shared/images';

import { GradeName } from '../../../../shared/enums';
import { GRADE_LIST } from '../../constants';
import { useAppSelector } from '../../../../shared/store';
import GradeProgress from './GradeProgress';
import BenefitItem from './BenefitItem';

const Container = styled.div`
  padding: 18px 30px 24px;
  border-top: 10px solid ${COLOR.bg};
  text-align: center;
`;

const UserGrade = styled.div`
  padding-bottom: 20px;
`;

const GradeInfo = styled.div`
  position: relative;
  height: 35px;
`;

const Item = styled.div`
  position: absolute;
  top: 11px;
  width: 20%;
  font-size: 12px;
  line-height: 16px;
  color: ${COLOR.kurlyGray450};
  text-align: left;
  text-indent: -18px;

  &:nth-of-type(1) {
    left: 0;
    text-indent: 0;

    > div {
      left: 0;
    }
  }
  &:nth-of-type(2) {
    left: 20%;
  }
  &:nth-of-type(3) {
    left: 40%;
  }
  &:nth-of-type(4) {
    left: 60%;
  }
  &:nth-of-type(5) {
    left: 80%;
    text-indent: -12px;
  }
  &:nth-of-type(6) {
    width: auto;
    right: 0;
    text-indent: 0;

    > div {
      left: auto;
      right: 0;
    }
  }
  &.current:nth-of-type(-n + 2) > div {
    background-image: url(${CircleCheckIcon1});
  }
  &.current:nth-of-type(3) > div {
    background-image: url(${CircleCheckIcon2});
  }
  &.current:nth-of-type(4) > div {
    background-image: url(${CircleCheckIcon3});
  }
  &.current:nth-of-type(5) > div {
    background-image: url(${CircleCheckIcon4});
  }
  &.current > div,
  > .next {
    display: block;
  }
`;

const Icon = styled.div`
  display: none;
  position: absolute;
  z-index: 1;
  left: -8px;
  top: 19px;
  width: 16px;
  height: 16px;
  background: url(${CircleIcon}) no-repeat 50% 50%;
  background-size: 16px 16px;
`;

const BoxDetail = styled.div`
  padding: 17px 20px 20px;
  border-radius: 6px;
  border: 1px solid ${COLOR.kurlyGray200};
  color: ${COLOR.kurlyGray800};
`;

const Title = styled.h3`
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
`;

const Desc = styled.p`
  padding: 7px 0 14px;
  font-size: 12px;
  line-height: 18px;
  border-bottom: 1px solid ${COLOR.bg};
`;

export default function GradeList() {
  const {
    nextMonth: { name: nextGradeName },
    upgradeInfo: {
      upgradeLevel: { name: upgradeGradeName },
    },
  } = useAppSelector(({ member }) => member.gradeInfo);

  const getGradeList = useMemo(
    () => Object.values(GRADE_LIST).filter((grade) => grade.gradeName !== GradeName.Welcome),
    [],
  );

  return (
    <>
      {nextGradeName !== GradeName.ThePurple && (
        <Container>
          <UserGrade>
            <GradeInfo>
              {getGradeList.map(({ gradeName }) => (
                <Item key={gradeName} className={nextGradeName === gradeName ? 'current' : ''}>
                  {gradeName}
                  <Icon className={upgradeGradeName === gradeName ? 'next' : ''} />
                </Item>
              ))}
            </GradeInfo>
            <GradeProgress />
          </UserGrade>
          <BoxDetail>
            <Title>{upgradeGradeName} 등급 혜택</Title>
            <Desc>전월 실적 {GRADE_LIST[upgradeGradeName].text} 충족시</Desc>
            <BenefitItem nextGradeName={upgradeGradeName} nextGradePoint={GRADE_LIST[upgradeGradeName].point} />
          </BoxDetail>
        </Container>
      )}
    </>
  );
}
