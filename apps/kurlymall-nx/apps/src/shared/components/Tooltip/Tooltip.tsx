import { useState, ReactNode, useEffect } from 'react';

import { css, keyframes, SerializedStyles } from '@emotion/react';
import styled from '@emotion/styled';

import { TooltipClose } from '../../images';

const fadeout = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

const Container = styled.div<{
  autoCloseTime: number;
}>`
  position: relative;
  animation: ${fadeout} 0.3s;
  animation-delay: ${(props) => props.autoCloseTime / 1000}s;
`;

const Body = styled.div<{
  top: number;
  right: number;
}>`
  position: absolute;
  top: ${(props) => props.top}px;
  right: ${(props) => props.right}px;
  padding: 12px;
  background-color: #bd76ff;
  color: #fff;
  border-radius: 6px;
`;

enum Direction {
  TOP = 'TOP',
  DOWN = 'DOWN',
  LEFT = 'LEFT',
  RIGHT = 'RIGHT',
}

const ArrowPosition: {
  [key in Direction]: SerializedStyles;
} = {
  TOP: css`
    top: -10px;
    right: 15px;
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    border-bottom: 10px solid #bd76ff;
  `,
  DOWN: css`
    bottom: -10px;
    right: 15px;
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    border-top: 10px solid #bd76ff;
  `,
  LEFT: css`
    top: 10px;
    left: -10px;
    border-top: 8px solid transparent;
    border-bottom: 8px solid transparent;
    border-right: 10px solid #bd76ff;
  `,
  RIGHT: css`
    top: 10px;
    right: -10px;
    border-top: 8px solid transparent;
    border-bottom: 8px solid transparent;
    border-left: 10px solid #bd76ff;
  `,
};

const Arrow = styled.span<{
  direction: Direction;
}>`
  position: absolute;
  ${(props) => ArrowPosition[props.direction]};
  width: 0;
  height: 0;
`;

const Content = styled.div<{
  width?: number;
}>`
  width: ${(props) => (props.width ? `${props.width}px` : 'max-content')};
`;

const CloseButton = styled.button`
  background: url(${TooltipClose}) no-repeat transparent;
  width: 16px;
  height: 16px;
  float: right;
  border: none;
`;

interface Props {
  open: boolean;
  children: ReactNode;
  top?: number;
  right?: number;
  width?: number;
  direction?: Direction;
  autoClose?: boolean;
  autoCloseTime?: number;
  closeButton?: boolean;
}

export default function Tooltip({
  open,
  direction = Direction.TOP,
  top = 55,
  right = 0,
  width,
  autoClose = false,
  autoCloseTime = 3000,
  closeButton = true,
  children,
}: Props) {
  const [visible, setVisible] = useState(open);

  useEffect(() => {
    if (autoClose) {
      setTimeout(() => {
        setVisible(false);
      }, autoCloseTime + 299);
    }
  }, []);

  useEffect(() => {
    setVisible(open);
  }, [open]);

  function handleClickCloseButton() {
    setVisible(false);
  }

  if (!visible) {
    return null;
  }

  return (
    <Container autoCloseTime={autoCloseTime}>
      <Body top={top} right={right}>
        <Arrow direction={direction} />
        {closeButton && <CloseButton onClick={handleClickCloseButton} type="button" aria-label="tooltip close" />}
        <Content width={width}>{children}</Content>
      </Body>
    </Container>
  );
}
