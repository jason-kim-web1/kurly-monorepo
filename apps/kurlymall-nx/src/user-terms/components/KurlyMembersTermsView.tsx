import styled from '@emotion/styled';

import COLOR from '../../shared/constant/colorset';
import RawHTML from '../../shared/components/layouts/RawHTML';

const MobileContainer = styled.div`
  counter-reset: section;
  font-size: 14px;
  color: ${COLOR.kurlyGray800};
  line-height: 1.5;
  letter-spacing: 0;
  padding-top: 10px;

  & > div {
    background-color: ${COLOR.kurlyWhite};
  }

  h1 {
    display: none;
  }

  .wrapper {
    padding: 10px 20px;
    color: ${COLOR.kurlyGray800};
  }
`;

const PcContainer = styled.div`
  counter-reset: section;
  width: 1050px;
  margin: 0 auto;
  font-weight: 400;
  font-size: 14px;
  letter-spacing: 0;
  padding-top: 10px;

  & > div {
    background-color: ${COLOR.kurlyWhite};
  }

  h1 {
    display: none;
  }

  .wrapper {
    padding: 34px 10px;
    color: ${COLOR.kurlyGray800};
  }
`;

interface Props {
  html: string;
  isMobile?: boolean;
}

export default function KurlyMembersTermsView({ isMobile = false, html }: Props) {
  const Container = isMobile ? MobileContainer : PcContainer;

  return (
    <Container>
      <RawHTML html={html} />
    </Container>
  );
}
