import styled from '@emotion/styled';

import { PC_PURPLE_BOX_URL } from '../../shared/constants/imageUrl';
import GuidelineAlternativeText from '../../shared/components/GuidelineAlternativeText';
import NextImage from '../../../../shared/components/NextImage';

const Wrapper = styled.div`
  background: #3c214c;
`;

export default function Guideline() {
  return (
    <Wrapper>
      <NextImage src={`${PC_PURPLE_BOX_URL}img_purplebox_09.jpg`} alt="이용 안내" width={1899} height={1143} />
      <GuidelineAlternativeText />
    </Wrapper>
  );
}
