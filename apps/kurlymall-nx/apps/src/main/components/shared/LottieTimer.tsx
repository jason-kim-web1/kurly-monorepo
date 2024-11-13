import { memo } from 'react';

import Lottie from 'react-lottie-player';

import * as animationData from './LottieTimer.json';

interface Props {
  play: boolean;
  className?: string;
}

function LottieTimer({ play, className }: Props) {
  const optLottie = {
    loop: true,
    play,
    animationData,
  };

  return <Lottie className={className} {...optLottie} />;
}

export default memo(LottieTimer);
