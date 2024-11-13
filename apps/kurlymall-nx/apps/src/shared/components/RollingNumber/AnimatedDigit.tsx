import styled from '@emotion/styled';

import { css } from '@emotion/react';

import React, { useEffect, useState } from 'react';

import { getDelay, nextDigit, prevDigit, Rolling, ROLLING_ANIMATION_DURATION } from '../../utils/rollingNumber';

const Wrapper = styled.div<{ delay: number; playRolling: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  overflow: hidden;
  line-height: 1;
  height: 1em;

  span {
    ${({ playRolling, delay }) =>
      playRolling &&
      css`
        animation: ${Rolling} ${ROLLING_ANIMATION_DURATION}ms ${delay}ms ease-out;
      `}
  }
`;

interface AnimatedDigitProps {
  numberLength: number;
  index: number;
  digit: string;
  number: number;
  stop?: boolean;
}

export default function AnimatedDigit({ numberLength, index, digit, number, stop }: AnimatedDigitProps) {
  const [playRolling, setPlayRolling] = useState(false);
  const [currentDigit, setCurrentDigit] = useState(digit);
  const { animationDelay, changeDigitDelay, finishDelay } = getDelay({ numberLength, index });

  useEffect(() => {
    if (!animationDelay || stop) {
      return;
    }

    setPlayRolling(true);
    const changeDigit = setTimeout(() => setCurrentDigit(digit), changeDigitDelay);
    const finishAnimation = setTimeout(() => setPlayRolling(false), finishDelay);

    return () => {
      clearTimeout(changeDigit);
      clearTimeout(finishAnimation);
    };
  }, [number, animationDelay, stop, digit, changeDigitDelay, finishDelay]);

  return (
    <Wrapper delay={animationDelay} playRolling={playRolling}>
      <span>{prevDigit(currentDigit)}</span>
      <span>{currentDigit}</span>
      <span>{nextDigit(currentDigit)}</span>
    </Wrapper>
  );
}
