import styled from '@emotion/styled';
import { ReactNode } from 'react';

import COLOR from '../../constant/colorset';
import { NoImage } from '../../images';

const Img = styled.span<{ width: number; height: number }>`
  display: inline-block;
  width: ${({ width }) => width && `${width}px`};
  height: ${({ height }) => height && `${height}px`};
  background: ${COLOR.kurlyGray150} url('${NoImage}') 50% 50% no-repeat;
  background-size: contain;
  vertical-align: top;
`;

interface Props {
  width: number;
  height: number;
  children?: ReactNode;
  className?: string;
}

export default function NoImageIcon({ width, height, children, className }: Props) {
  return (
    <Img width={width} height={height} className={className}>
      {children}
    </Img>
  );
}
