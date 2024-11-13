import styled from '@emotion/styled';
import Lottie from 'react-lottie-player';

import * as animationDataGray from './loadingLottie.json';
import * as animationDataWhite from './loadingLottieWhite.json';
import { zIndex } from '../../styles';

const LoadingWrapper = styled.div<{
  width?: number;
  height?: number;
  isMain?: boolean;
  isAbsolute: boolean;
}>`
  position: ${({ isAbsolute }) => (isAbsolute ? 'absolute' : 'fixed')};
  top: 0;
  left: 0;
  width: ${({ width }) => (width ? `${width}px` : '100%')};
  height: ${({ height }) => (height ? `${height}px` : '100%')};
  z-index: ${({ isMain }) => (isMain ? zIndex.mainSectionLoading : zIndex.loading)};
`;

const Inner = styled.div`
  overflow: hidden;
  position: absolute;
  top: 50%;
  left: 50%;
  width: 134px;
  height: 134px;
  transform: translate(-50%, -50%);
`;

const styles = {
  lottie: {
    width: '100%',
    height: '100%',
  },
};

export default function Loading({
  testId,
  width,
  height,
  isAbsolute = false,
  theme = 'gray',
  isMain = false,
}: {
  testId?: string;
  width?: number;
  height?: number;
  isAbsolute?: boolean;
  isMain?: boolean;
  theme?: 'gray' | 'white';
}) {
  const optLottie = {
    loop: true,
    play: true,
    animationData: theme === 'gray' ? animationDataGray : animationDataWhite,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return (
    <LoadingWrapper data-testid={testId} width={width} height={height} isAbsolute={isAbsolute} isMain={isMain}>
      <Inner className="loading-spinner-inner">
        <span>
          <Lottie {...optLottie} style={styles.lottie} />
        </span>
      </Inner>
    </LoadingWrapper>
  );
}
