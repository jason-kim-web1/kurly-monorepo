import styled from '@emotion/styled';

import { M_PURPLE_BOX_URL } from '../../shared/constants/imageUrl';
import GuidelineAlternativeText from '../../shared/components/GuidelineAlternativeText';
import NextImage from '../../../../shared/components/NextImage';

const Wrapper = styled.div`
  position: relative;
  height: 239vw;
`;

export default function Guideline() {
  return (
    <Wrapper>
      <NextImage src={`${M_PURPLE_BOX_URL}img_purplebox_09.jpg`} alt="이용 안내" layout="fill" objectFit="cover" />
      <GuidelineAlternativeText />
    </Wrapper>
  );
}
