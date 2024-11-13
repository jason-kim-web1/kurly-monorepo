import styled from '@emotion/styled';

import React, { Fragment, useEffect, useState } from 'react';

import { getChangeNumberDelay, getComma, getDigitArray } from '../../utils/rollingNumber';
import AnimatedDigit from './AnimatedDigit';

const Wrapper = styled.div`
  display: inline-flex;
  align-items: center;
`;

interface RollingNumberProps {
  number: number;
  showComma?: boolean;
  stopRolling?: boolean;
}

export default function RollingNumber({ number, showComma, stopRolling }: RollingNumberProps) {
  const [currentNumber, setCurrentNumber] = useState(number);

  const { digitArray, numberLength } = getDigitArray({ number, currentNumber });
  const delay = getChangeNumberDelay(numberLength);

  useEffect(() => {
    const changeNumber = setTimeout(() => setCurrentNumber(number), delay);

    return () => {
      clearTimeout(changeNumber);
    };
  }, [delay, number]);

  return (
    <Wrapper>
      {digitArray.map((digit, index) => (
        <Fragment key={`number-key-${index}`}>
          {getComma({ showComma, numberLength, index })}
          <AnimatedDigit numberLength={numberLength} index={index} digit={digit} number={number} stop={stopRolling} />
        </Fragment>
      ))}
    </Wrapper>
  );
}
