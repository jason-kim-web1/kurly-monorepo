import styled from '@emotion/styled';

import Skeleton from 'react-loading-skeleton';

const Wrapper = styled.div<{ width?: number; height?: number; radius?: number; alignCenter?: boolean }>`
  width: ${({ width }) => (width ? `${width}px` : '100%')};
  height: ${({ height }) => (height ? `${height}px` : '100%')};
  ${({ alignCenter }) => alignCenter && 'margin: 0 auto;'};
  > span {
    position: relative;
    display: block;
    ${({ height }) => height && 'height: 100%'};
    span {
      border-radius: ${({ radius }) => (Number(radius) > -1 ? `${Number(radius)}px` : '3px')};
      height: 100%;
      align-items: center;
    }
  }
`;

interface Props {
  testId?: string;
  width?: number;
  height?: number;
  radius?: number;
  alignCenter?: boolean;
}

export default function SkeletonLoading({ testId, width, height, radius = 3, alignCenter }: Props) {
  return (
    <Wrapper data-testid={testId} radius={radius} width={width} height={height} alignCenter={alignCenter}>
      <Skeleton />
    </Wrapper>
  );
}
