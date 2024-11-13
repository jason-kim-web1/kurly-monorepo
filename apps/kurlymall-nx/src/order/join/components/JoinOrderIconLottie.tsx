import styled from '@emotion/styled';
import Lottie from 'react-lottie-player';

import * as joinOrderIcon from '../jsons/JoinOrderIcon.json';

const Wrapper = styled.div`
  margin-bottom: 30px;
  > div {
    height: 40px;
  }
`;

const lottieOptions = {
  loop: false,
  play: true,
  animationData: joinOrderIcon,
};

export default function JoinOrderIconLottie() {
  return (
    <Wrapper>
      <Lottie {...lottieOptions} />
    </Wrapper>
  );
}
