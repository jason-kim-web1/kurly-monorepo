import { useMemo } from 'react';

import styled from '@emotion/styled';

import COLOR from '../../../../shared/constant/colorset';

import { GradeName } from '../../../../shared/enums';
import { GRADE_LIST, isNormalPointExcludeTime } from '../../constants';
import { useAppSelector } from '../../../../shared/store';
import nextGradeStyle from '../../constants/nextGradeStyle';
import { ArrowPurple, GiftIcon, WonIcon, WriteIcon } from '../../../../shared/images';

const List = styled.ul`
  display: flex;
  justify-content: center;
  text-align: center;
`;

const Item = styled.li<{ grade: GradeName }>`
  width: 167px;
  height: 507px;
  padding: 0 10px;
  border: 1px solid ${COLOR.kurlyGray300};
  border-right: 0 none;

  &:last-of-type {
    border-right: 1px solid ${COLOR.kurlyGray300};
  }

  &.active {
    position: relative;

    &::after {
      position: absolute;
      top: -1px;
      left: -1px;
      right: -1px;
      bottom: -1px;
      ${({ grade }) => nextGradeStyle[grade]};
      border-width: 2px;
      background: none;
      content: '';
    }
  }
`;

const GradeInfo = styled.div`
  padding: 39px 0 23px;
  border-bottom: 1px solid ${COLOR.kurlyGray300};
  font-size: 12px;
  line-height: 18px;
`;

const GradeIcon = styled.div<{ grade: GradeName }>`
  width: 48px;
  height: 48px;
  padding-top: 13px;
  margin: 0 auto 7px;
  border-radius: 3px;
  border: 1px solid ${COLOR.kurlyPurple};
  font-size: 14px;
  color: ${COLOR.kurlyWhite};
  ${({ grade }) => nextGradeStyle[grade]};
`;

const PointInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 148px;
  padding-bottom: 8px;
`;

const Bar = styled.div`
  width: 20px;
  height: 1px;
  background-color: ${COLOR.kurlyGray600};
`;

const GiftInfo = styled.div`
  padding-top: 49px;
`;

const Img = styled.img`
  display: block;
  width: 32px;
  height: 32px;
  margin: 0 auto 9px;
`;

const Text = styled.span`
  padding-top: 9px;
  font-size: 16px;
  color: ${COLOR.kurlyBlack};
`;

const Link = styled.a`
  position: relative;
  z-index: 20;
  padding-right: 8px;
  font-size: 16px;
  color: ${COLOR.kurlyPurple};
  background: url(${ArrowPurple}) no-repeat 100% 50%;
  background-size: 6px 9px;
`;

export default function GradeList() {
  const {
    nextMonth: { name: nextGradeName },
  } = useAppSelector(({ member }) => member.gradeInfo);

  const getGradeList = useMemo(
    () => Object.values(GRADE_LIST).filter((grade) => grade.gradeName !== GradeName.Welcome),
    [],
  );

  const isPointRateNone = (gradeName: string) => {
    return gradeName === GradeName.Normal && isNormalPointExcludeTime;
  };

  return (
    <List>
      {getGradeList.map(({ gradeName, text, point, review, gift, link }) => (
        <Item key={gradeName} grade={gradeName} className={nextGradeName === gradeName ? 'active' : ''}>
          <GradeInfo>
            <GradeIcon grade={gradeName}>{gradeName}</GradeIcon>
            전월 실적
            <br />
            {text}
          </GradeInfo>

          <PointInfo>
            {isPointRateNone(gradeName) ? (
              <Bar />
            ) : (
              <>
                <Img src={WonIcon} alt="" />
                <Text>{point}</Text>
              </>
            )}
          </PointInfo>

          {review && (
            <div>
              <Img src={WriteIcon} alt="" />
              <Text>{review}</Text>
            </div>
          )}

          {gift && (
            <GiftInfo>
              <Img src={GiftIcon} alt="" />
              <Link href={link}>{gift}</Link>
            </GiftInfo>
          )}
        </Item>
      ))}
    </List>
  );
}
