import styled from '@emotion/styled';

import COLOR from '../../../../shared/constant/colorset';
import { multiMaxLineText } from '../../../../shared/utils';
import SectionHeaderTitle from './SectionHeaderTitle';

const Title = styled.span`
  color: ${COLOR.kurlyGray800};
  font-size: 28px;
  line-height: 1.15;
  letter-spacing: -0.26px;
  font-weight: 500;
`;

const SubTitle = styled.p`
  font-size: 16px;
  font-weight: normal;
  line-height: 1.45;
  letter-spacing: -0.2px;
  text-align: center;
  color: ${COLOR.kurlyGray450};
  margin-top: 2px;
`;

const Container = styled.div`
  margin-bottom: 27px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  &.tit_carousel {
    padding-top: 12px;

    ${Title} {
      ${multiMaxLineText(1)};
    }

    ${SubTitle} {
      ${multiMaxLineText(1)};
    }
  }
`;

interface Props {
  title: string;
  subtitle?: string;
  landingUrl?: string;
  className?: string;
  selectTitle?(): void;
}

export default function SectionHeader({ title, subtitle, landingUrl, className, selectTitle }: Props) {
  return (
    <Container className={`SectionTitle ${className}`}>
      <SectionHeaderTitle landingUrl={landingUrl} handleSelectTitle={selectTitle}>
        <Title>{title}</Title>
      </SectionHeaderTitle>
      {subtitle && <SubTitle>{subtitle}</SubTitle>}
    </Container>
  );
}
