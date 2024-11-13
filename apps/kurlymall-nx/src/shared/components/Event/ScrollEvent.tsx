import styled from '@emotion/styled';
import { ReactNode, TouchEvent, useState, WheelEvent } from 'react';
import { throttle } from 'lodash';

const Container = styled.div`
  overflow-x: auto;
`;

interface Props {
  children: ReactNode;
  onWheel(pageY: number, isUp: boolean): void;
}

const THROTTLE_DELAY = 100;

export default function ScrollEvent({ children, onWheel }: Props) {
  const [startY, setStartY] = useState<number>(0);

  const handleOnWheel = (event: WheelEvent<HTMLDivElement>) => {
    onWheel(event.pageY, true);
  };

  const handleTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    const changedTouch = event.changedTouches[0];
    setStartY(changedTouch.clientY);
  };

  const handleTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    const changedTouch = event.changedTouches[0];
    const { pageY, clientY } = changedTouch;
    onWheel(pageY, clientY > startY);
  };

  return (
    <Container
      onWheel={throttle(handleOnWheel, THROTTLE_DELAY)}
      onTouchStart={throttle(handleTouchStart, THROTTLE_DELAY)}
      onTouchEnd={throttle(handleTouchEnd, THROTTLE_DELAY)}
    >
      {children}
    </Container>
  );
}
