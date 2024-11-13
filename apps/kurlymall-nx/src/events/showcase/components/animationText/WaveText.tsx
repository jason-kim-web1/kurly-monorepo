import { css } from '@emotion/react';
import { useInView } from 'react-intersection-observer';

import COLOR from '../../../../shared/constant/colorset';

const wrapperStyle = css`
  position: relative;
  overflow: hidden;
`;

const charStyle = css`
  position: relative;
  bottom: -1em;
  opacity: 0;
  will-change: bottom, opacity;
  animation: 'move-text' 0.35s forwards;

  @keyframes move-text {
    0% {
      bottom: -0.2em;
      opacity: 1;
    }

    50% {
      bottom: 0.2em;
    }

    100% {
      bottom: 0;
      opacity: 1;
    }
  }
`;

const bottomLineDefaultStyle = css`
  position: absolute;
  left: 0;
  bottom: 0;
  display: block;
  width: 100%;
  border: 2px solid ${COLOR.kurlyWhite};
  opacity: 1;
  transition: all 3s 0.3s;
`;

const liningStyle = css`
  opacity: 0;
`;

interface Props {
  className?: string;
  elementIndex: number;
  text: string;
  isOuterLine: boolean;
}

const WaveText = ({ className, elementIndex, text, isOuterLine }: Props) => {
  const { ref, inView } = useInView({ rootMargin: '200px 0px 0px 0px' });
  const charList = text.split('');

  const renderWaveText = () =>
    charList.map((char, charIndex) => {
      const delayStyle = { animationDelay: (elementIndex + 1) / 6 + 0.5 + charIndex / 10 + 's' };
      return (
        <span aria-hidden="true" key={charIndex} className={className} css={inView && [charStyle, delayStyle]}>
          {char}
        </span>
      );
    });

  return (
    <span ref={ref} css={wrapperStyle} aria-label={text}>
      {renderWaveText()}
      {isOuterLine ? null : <span css={[bottomLineDefaultStyle, inView && liningStyle]} />}
    </span>
  );
};

export { WaveText };
