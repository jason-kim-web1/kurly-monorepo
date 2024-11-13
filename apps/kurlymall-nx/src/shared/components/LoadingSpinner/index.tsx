import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import type { SVGAttributes } from 'react';

import COLOR from '../../constant/colorset';

const keyFrameRotate = keyframes`
  100% {
    transform: rotate(360deg);
  }
`;

const keyFrameDash = keyframes`
  0% {
    stroke-dasharray: 1, 150;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -35;
  }
  100% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -124;
  }
`;

const Wrap = styled.svg`
  animation: ${keyFrameRotate} 1s linear infinite;
  > .path {
    animation: ${keyFrameDash} 0.75s ease-in-out infinite;
  }
`;

type Props = Pick<SVGAttributes<SVGElement>, 'width' | 'height' | 'stroke' | 'strokeWidth'>;

export const LoadingSpinner = ({ width = 50, height = 50, stroke = COLOR.kurlyWhite, strokeWidth = 7 }: Props) => {
  return (
    <Wrap viewBox="0 0 50 50" width={width} height={height}>
      <circle
        className="path"
        cx="25"
        cy="25"
        r="20"
        fill="none"
        stroke={stroke}
        strokeLinecap="round"
        strokeWidth={strokeWidth}
      />
    </Wrap>
  );
};
