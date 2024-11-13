import styled from '@emotion/styled';

import COLOR from '../../../../shared/constant/colorset';
import { GUIDE_TOP_INFO } from '../../constants';

const Container = styled.div`
  padding: 20px 20px 42px;
  border-top: 1px solid ${COLOR.lightGray};
`;

const GuideTitle = styled.h2`
  font-weight: 600;
  font-size: 20px;
  line-height: 28px;
`;

const GuideText = styled.p`
  padding-top: 4px;
  line-height: 20px;
  color: ${COLOR.kurlyGray600};
`;

export default function UnavailableGuide() {
  return (
    <Container>
      <GuideTitle>{GUIDE_TOP_INFO.title}</GuideTitle>
      <GuideText>{GUIDE_TOP_INFO.text}</GuideText>
    </Container>
  );
}
