import Lottie from 'react-lottie-player';

import * as animationData from './LottieKurlyPLCC.json';

interface LottieProps {
  play: boolean;
  className?: string;
  onClick?(): void;
}

export default function LottieKurlypayPLCCButton({ play, className, onClick }: LottieProps) {
  const optLottie = {
    loop: true,
    play,
    animationData,
  };

  return (
    <button onClick={onClick}>
      <Lottie className={className} {...optLottie} />
    </button>
  );
}
