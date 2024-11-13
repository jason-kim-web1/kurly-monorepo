import styled from '@emotion/styled';

import COLOR from '../../../../shared/constant/colorset';
import { ArrowPurple, GiftIconWhite, WonIconWhite, WriteIconWhite } from '../../../../shared/images';

import { GradeName } from '../../../../shared/enums';

const Container = styled.div`
  display: inline-block;
  margin: 0 auto;
  padding-top: 6px;
`;

const BenefitInfo = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-top: 12px;
  font-weight: 600;
  font-size: 16px;
  line-height: 32px;
`;

const Link = styled.a`
  padding-right: 15px;
  color: ${COLOR.kurlyPurple};
  background: url(${ArrowPurple}) no-repeat 100% 50%;
  background-size: 10px 10px;
`;

const Img = styled.img`
  display: block;
  width: 32px;
  height: 32px;
  margin-right: 12px;
`;

interface Props {
  nextGradeName: GradeName;
  nextGradePoint: string;
}

export default function BenefitItem({ nextGradeName, nextGradePoint }: Props) {
  return (
    <Container>
      <BenefitInfo>
        <Img src={WonIconWhite} alt="" />
        {nextGradePoint}
      </BenefitInfo>

      {(nextGradeName === GradeName.Purple || nextGradeName === GradeName.ThePurple) && (
        <BenefitInfo>
          <Img src={WriteIconWhite} alt="" />
          더블 후기 적립금
        </BenefitInfo>
      )}

      {nextGradeName === GradeName.ThePurple && (
        <BenefitInfo>
          <Img src={GiftIconWhite} alt="" />
          <Link href="https://www.kurly.com/m2/event/lovers/lovers.php">월별 기프트</Link>
        </BenefitInfo>
      )}
    </Container>
  );
}
