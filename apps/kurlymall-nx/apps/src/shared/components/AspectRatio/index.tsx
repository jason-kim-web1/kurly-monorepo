import type { PropsWithChildren } from 'react';
import styled from '@emotion/styled';

const Root = styled.div`
  position: relative;
  width: 100%;
`;

const Content = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

interface AspectRatioProps {
  ratio: number;
  className?: string;
}

export const AspectRatio = ({ ratio, className, children }: PropsWithChildren<AspectRatioProps>) => {
  const paddingBottom = `${100 / ratio}%`;
  return (
    <Root style={{ paddingBottom }} className={className}>
      <Content>{children}</Content>
    </Root>
  );
};
