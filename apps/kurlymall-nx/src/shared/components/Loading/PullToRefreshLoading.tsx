import styled from '@emotion/styled';
import Lottie from 'react-lottie-player';

import * as loadingLoversWhite from './loadingLoversWhite.json';

const LoadingWrapper = styled.div<{ width?: number; height?: number }>`
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
  margin: 0 auto;
`;

const Inner = styled.div`
  width: auto;
  height: auto;
`;

const optLottie = {
  loop: true,
  play: true,
  speed: 1.5,
  animationData: loadingLoversWhite,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
};

interface Props {
  width?: number;
  height?: number;
}

export default function PullToRefreshLoading({ width = 24, height = 24 }: Props) {
  return (
    <LoadingWrapper width={width} height={height}>
      <Inner>
        <Lottie {...optLottie} />
      </Inner>
    </LoadingWrapper>
  );
}
