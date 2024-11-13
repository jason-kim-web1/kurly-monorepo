import styled from '@emotion/styled';

import InterestFreeGuideLines from './InterestFreeGuideLines';
import InterestFreePlans from './InterestFreePlans';
import { isPC } from '../../../../../util/window/getDevice';

const Wrapper = styled.div`
  text-align: left;
  max-height: ${isPC ? '420px' : '58vh'};
  overflow-y: auto;
  font-weight: 400;
`;

export default function InterestFreeList() {
  return (
    <Wrapper>
      <InterestFreePlans />
      <InterestFreeGuideLines />
    </Wrapper>
  );
}
