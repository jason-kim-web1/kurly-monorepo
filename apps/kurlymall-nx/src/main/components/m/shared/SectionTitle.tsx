import styled from '@emotion/styled';

import COLOR from '../../../../shared/constant/colorset';
import { multiMaxLineText } from '../../../../shared/utils';
import { ButtonMore } from './MoreButton';
import { MobileLink } from '../../../../shared/components/Link/MobileLink';

const Titles = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const TextEllipsis = styled.span`
  display: block;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;

const Title = styled(TextEllipsis)`
  width: calc(100% - 70px);
  color: ${COLOR.benefitGray};
  font-size: 18px;
  line-height: normal;
  font-weight: 600;
  letter-spacing: 0.2px;
`;

const SubTitle = styled(TextEllipsis)`
  font-size: 14px;
  color: ${COLOR.benefitTextGray};
  font-weight: 400;
  letter-spacing: normal;
  line-height: 1.29;
  margin-top: 4px;
`;

const Container = styled.a`
  padding: 16px;
  display: flex;
  justify-content: space-between;

  &.tit_carousel {
    ${Title} {
      width: 100%;
      ${multiMaxLineText(2)};
    }

    ${SubTitle} {
      ${multiMaxLineText(2)};
    }
  }
`;

const MainTitleWrapper = styled.div`
  position: relative;
  > span:last-of-type {
    position: absolute;
    right: 0;
    top: 2px;
  }
`;

interface Props {
  title: string;
  subtitle?: string;
  landingUrl?: string;
  className?: string;
  selectTitle?(): void;
}

export default function SectionTitle({ title, subtitle, landingUrl, className, selectTitle }: Props) {
  if (landingUrl) {
    return (
      <MobileLink url={landingUrl} passHref>
        <Container href={landingUrl} className={className} onClick={selectTitle}>
          <Titles>
            <MainTitleWrapper>
              <Title>{title}</Title>
              <ButtonMore />
            </MainTitleWrapper>
            {subtitle && <SubTitle>{subtitle}</SubTitle>}
          </Titles>
        </Container>
      </MobileLink>
    );
  }

  return (
    <Container className={className}>
      <Titles>
        <Title>{title}</Title>
        {subtitle && <SubTitle>{subtitle}</SubTitle>}
      </Titles>
    </Container>
  );
}
