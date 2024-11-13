import { keyframes } from '@emotion/react';

const FIRST_DIGIT = 0;
const LAST_DIGIT = 9;

const PREV_OFFSET = 1;
const NEXT_OFFSET = 1;

export const prevDigit = (digit: string) => {
  const currentDigit = Number(digit);

  if (currentDigit === FIRST_DIGIT) {
    return LAST_DIGIT;
  }

  return currentDigit - PREV_OFFSET;
};

export const nextDigit = (digit: string) => {
  const currentDigit = Number(digit);

  if (currentDigit === LAST_DIGIT) {
    return FIRST_DIGIT;
  }

  return currentDigit + NEXT_OFFSET;
};

export const ROLLING_ANIMATION_DURATION = 500;

export const getDelay = ({ numberLength, index }: { numberLength: number; index: number }) => {
  //각 자릿수의 애니메이션 시작 시간은 0.125초씩 차이가 나도록 한다.
  const animationDelay = (numberLength - index) * 0.125 * 1000;

  //애니메이션이 50% 진행되면 숫자를 변경한다.
  const changeDigitDelay = ROLLING_ANIMATION_DURATION / 2;

  //애니메이션이 종료되면 해제 처리한다.
  const finishDelay = ROLLING_ANIMATION_DURATION + animationDelay;

  return { animationDelay, changeDigitDelay, finishDelay };
};

export const getChangeNumberDelay = (numberLength: number) => {
  //숫자의 자릿수 변경은 애니메이션 시작 후 0.25초 뒤에 변경되도록 한다.
  return (numberLength / 2) * 0.25 * 1000;
};

export const getDigitArray = ({ number, currentNumber }: { number: number; currentNumber: number }) => {
  const adjustedNumber = number < 0 ? 0 : currentNumber;
  const digitArray = String(adjustedNumber).split('');
  const numberLength = digitArray.length;

  return { digitArray, numberLength };
};

export const getComma = ({
  showComma,
  numberLength,
  index,
}: {
  showComma?: boolean;
  numberLength: number;
  index: number;
}) => {
  if (!showComma || index === 0) {
    return;
  }

  if ((numberLength - index) % 3 === 0) {
    return ',';
  }
};

export const Rolling = keyframes`
  0%, 25%, 60%, 100% {
    transform: translateY(0);
  }
  10%, 30%, 70% {
    transform: translateY(13px);
  }
  11%, 31%, 71% {
    transform: translateY(-13px);
  }
`;
