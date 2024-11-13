import styled from '@emotion/styled';

import Lottie from 'react-lottie-player';

import * as animationDataGray from '../Loading/loadingLottie.json';
import * as animationDataWhite from '../Loading/loadingLottieWhite.json';

const Container = styled.div``;

const getLottieOptions = (theme: string) => ({
  loop: true,
  play: true,
  animationData: theme === 'gray' ? animationDataGray : animationDataWhite,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
});

interface Props {
  theme: string;
  width: number;
}

const CircularProgress = ({ theme, width }: Props) => {
  const lottieOptions = getLottieOptions(theme);
  const containerWidth = `${width * 4}px`;

  return (
    <Container style={{ width: containerWidth, height: containerWidth }}>
      <Lottie {...lottieOptions} />
    </Container>
  );
};

export default CircularProgress;
