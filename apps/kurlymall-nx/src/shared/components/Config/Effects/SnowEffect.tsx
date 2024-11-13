import styled from '@emotion/styled';

import { times } from 'lodash';

import { css } from '@emotion/react';

import { zIndex } from '../../../styles';
import { isPC } from '../../../../../util/window/getDevice';
import COLOR from '../../../constant/colorset';
import { MW_COUNT_OF_SNOW, PC_COUNT_OF_SNOW } from '../../../constant/kurlyMallEffects';
import { fallSnow } from '../../../styles/motions/common/common';
import { useEventConfigQuery } from '../../../hooks/useEventConfigQuery';

const SnowFlake = styled.div`
  position: absolute;
  top: -5vh;
  --size: ${isPC ? 15 : 10}px;
  width: var(--size);
  height: var(--size);
  background: ${COLOR.kurlyWhite};
  border-radius: 50%;
`;

const Wrapper = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  z-index: ${zIndex.snowEffect};
  pointer-events: none;

  ${!isPC &&
  css`
    @supports (height: constant(safe-area-inset-bottom)) {
      height: calc(100vh - constant(safe-area-inset-bottom));
    }
    @supports (height: env(safe-area-inset-bottom)) {
      height: calc(100vh - env(safe-area-inset-bottom));
    }
  `}

  .snowflake:nth-of-type(1) {
    --size: ${isPC ? 9 : 6}px;
    --left-ini: 2vw;
    --left-end: -2vw;
    left: 11vw;
    animation: ${fallSnow} ${isPC ? 18 : 24}s linear infinite;
    animation-delay: -9s;
  }

  .snowflake:nth-of-type(2) {
    --size: ${isPC ? 9 : 6}px;
    --left-ini: 1vw;
    --left-end: 0vw;
    left: 94vw;
    animation: ${fallSnow} ${isPC ? 18 : 24}s linear infinite;
    animation-delay: -3s;
  }

  .snowflake:nth-of-type(3) {
    --size: ${isPC ? 12 : 8}px;
    --left-ini: -5vw;
    --left-end: 8vw;
    left: 81vw;
    animation: ${fallSnow} ${isPC ? 22.5 : 30}s linear infinite;
    animation-delay: -10s;
  }

  .snowflake:nth-of-type(4) {
    --size: ${isPC ? 6 : 4}px;
    --left-ini: -6vw;
    --left-end: 8vw;
    left: 21vw;
    animation: ${fallSnow} ${isPC ? 16.5 : 22}s linear infinite;
    animation-delay: -6s;
  }

  .snowflake:nth-of-type(5) {
    --size: ${isPC ? 12 : 8}px;
    --left-ini: 2vw;
    --left-end: -5vw;
    left: 44vw;
    animation: ${fallSnow} ${isPC ? 15 : 20}s linear infinite;
    animation-delay: -9s;
  }

  .snowflake:nth-of-type(6) {
    --size: ${isPC ? 6 : 4}px;
    --left-ini: -2vw;
    --left-end: -8vw;
    left: 63vw;
    animation: ${fallSnow} ${isPC ? 10.5 : 14}s linear infinite;
    animation-delay: -7s;
  }

  .snowflake:nth-of-type(7) {
    --size: ${isPC ? 9 : 6}px;
    --left-ini: 5vw;
    --left-end: -5vw;
    left: 16vw;
    animation: ${fallSnow} ${isPC ? 12 : 16}s linear infinite;
    animation-delay: -7s;
  }

  .snowflake:nth-of-type(8) {
    --size: ${isPC ? 12 : 8}px;
    --left-ini: 5vw;
    --left-end: -6vw;
    left: 68vw;
    animation: ${fallSnow} ${isPC ? 19.5 : 26}s linear infinite;
    animation-delay: -6s;
  }

  .snowflake:nth-of-type(9) {
    --size: ${isPC ? 15 : 10}px;
    --left-ini: 4vw;
    --left-end: 8vw;
    left: 50vw;
    animation: ${fallSnow} ${isPC ? 12 : 16}s linear infinite;
    animation-delay: -3s;
  }

  .snowflake:nth-of-type(10) {
    --size: ${isPC ? 6 : 4}px;
    --left-ini: 2vw;
    --left-end: -6vw;
    left: 53vw;
    animation: ${fallSnow} ${isPC ? 19.5 : 26}s linear infinite;
    animation-delay: -8s;
  }

  .snowflake:nth-of-type(11) {
    --size: ${isPC ? 12 : 8}px;
    --left-ini: -7vw;
    --left-end: -1vw;
    left: 87vw;
    animation: ${fallSnow} ${isPC ? 9 : 12}s linear infinite;
    animation-delay: -10s;
  }

  .snowflake:nth-of-type(12) {
    --size: ${isPC ? 6 : 4}px;
    --left-ini: -6vw;
    --left-end: -1vw;
    left: 3vw;
    animation: ${fallSnow} ${isPC ? 10.5 : 14}s linear infinite;
    animation-delay: -1s;
  }

  .snowflake:nth-of-type(13) {
    --size: ${isPC ? 12 : 8}px;
    --left-ini: -7vw;
    --left-end: -3vw;
    left: 34vw;
    animation: ${fallSnow} ${isPC ? 19.5 : 26}s linear infinite;
    animation-delay: -6s;
  }

  .snowflake:nth-of-type(14) {
    --size: ${isPC ? 12 : 8}px;
    --left-ini: -6vw;
    --left-end: 9vw;
    left: 88vw;
    animation: ${fallSnow} ${isPC ? 13.5 : 18}s linear infinite;
    animation-delay: -10s;
  }

  .snowflake:nth-of-type(15) {
    --size: ${isPC ? 12 : 8}px;
    --left-ini: -1vw;
    --left-end: 9vw;
    left: 36vw;
    animation: ${fallSnow} ${isPC ? 12 : 16}s linear infinite;
    animation-delay: -1s;
  }

  .snowflake:nth-of-type(16) {
    --size: ${isPC ? 15 : 10}px;
    --left-ini: -1vw;
    --left-end: -5vw;
    left: 13vw;
    animation: ${fallSnow} ${isPC ? 22.5 : 30}s linear infinite;
    animation-delay: -4s;
  }

  .snowflake:nth-of-type(17) {
    --size: ${isPC ? 9 : 6}px;
    --left-ini: 3vw;
    --left-end: 4vw;
    left: 94vw;
    animation: ${fallSnow} ${isPC ? 16.5 : 22}s linear infinite;
    animation-delay: -10s;
  }

  .snowflake:nth-of-type(18) {
    --size: ${isPC ? 9 : 6}px;
    --left-ini: 3vw;
    --left-end: 10vw;
    left: 92vw;
    animation: ${fallSnow} ${isPC ? 21 : 28}s linear infinite;
    animation-delay: -5s;
  }

  .snowflake:nth-of-type(19) {
    --size: ${isPC ? 15 : 10}px;
    --left-ini: 6vw;
    --left-end: 3vw;
    left: 32vw;
    animation: ${fallSnow} ${isPC ? 13.5 : 18}s linear infinite;
    animation-delay: -9s;
  }

  .snowflake:nth-of-type(20) {
    --size: ${isPC ? 15 : 10}px;
    --left-ini: 1vw;
    --left-end: -4vw;
    left: 70vw;
    animation: ${fallSnow} ${isPC ? 10.5 : 14}s linear infinite;
    animation-delay: -8s;
  }

  .snowflake:nth-of-type(21) {
    --size: ${isPC ? 12 : 8}px;
    --left-ini: 6vw;
    --left-end: -8vw;
    left: 98vw;
    animation: ${fallSnow} ${isPC ? 15 : 20}s linear infinite;
    animation-delay: -7s;
  }

  .snowflake:nth-of-type(22) {
    --size: ${isPC ? 12 : 8}px;
    --left-ini: -9vw;
    --left-end: 1vw;
    left: 63vw;
    animation: ${fallSnow} ${isPC ? 10.5 : 14}s linear infinite;
    animation-delay: -1s;
  }

  .snowflake:nth-of-type(23) {
    --size: ${isPC ? 15 : 10}px;
    --left-ini: 6vw;
    --left-end: 10vw;
    left: 89vw;
    animation: ${fallSnow} ${isPC ? 16.5 : 22}s linear infinite;
    animation-delay: -9s;
  }

  .snowflake:nth-of-type(24) {
    --size: ${isPC ? 6 : 4}px;
    --left-ini: -4vw;
    --left-end: -5vw;
    left: 5vw;
    animation: ${fallSnow} ${isPC ? 13.5 : 18}s linear infinite;
    animation-delay: -3s;
  }

  .snowflake:nth-of-type(25) {
    --size: ${isPC ? 9 : 6}px;
    --left-ini: -9vw;
    --left-end: -3vw;
    left: 28vw;
    animation: ${fallSnow} ${isPC ? 18 : 24}s linear infinite;
    animation-delay: -2s;
  }

  .snowflake:nth-of-type(26) {
    --size: ${isPC ? 15 : 10}px;
    --left-ini: -2vw;
    --left-end: -9vw;
    left: 89vw;
    animation: ${fallSnow} ${isPC ? 19.5 : 26}s linear infinite;
    animation-delay: -8s;
  }

  .snowflake:nth-of-type(27) {
    --size: ${isPC ? 15 : 10}px;
    --left-ini: -8vw;
    --left-end: -1vw;
    left: 27vw;
    animation: ${fallSnow} ${isPC ? 10.5 : 14}s linear infinite;
    animation-delay: -9s;
  }

  .snowflake:nth-of-type(28) {
    --size: ${isPC ? 9 : 6}px;
    --left-ini: -2vw;
    --left-end: -2vw;
    left: 63vw;
    animation: ${fallSnow} ${isPC ? 21 : 28}s linear infinite;
    animation-delay: -7s;
  }

  .snowflake:nth-of-type(29) {
    --size: ${isPC ? 6 : 4}px;
    --left-ini: -6vw;
    --left-end: -3vw;
    left: 99vw;
    animation: ${fallSnow} ${isPC ? 12 : 16}s linear infinite;
    animation-delay: -4s;
  }

  .snowflake:nth-of-type(30) {
    --size: ${isPC ? 3 : 2}px;
    --left-ini: 4vw;
    --left-end: 10vw;
    left: 31vw;
    animation: ${fallSnow} ${isPC ? 21 : 28}s linear infinite;
    animation-delay: -2s;
  }

  .snowflake:nth-of-type(31) {
    --size: ${isPC ? 9 : 6}px;
    --left-ini: -6vw;
    --left-end: 3vw;
    left: 64vw;
    animation: ${fallSnow} ${isPC ? 13.5 : 18}s linear infinite;
    animation-delay: -4s;
  }

  .snowflake:nth-of-type(32) {
    --size: ${isPC ? 9 : 6}px;
    --left-ini: 4vw;
    --left-end: -8vw;
    left: 59vw;
    animation: ${fallSnow} ${isPC ? 19.5 : 26}s linear infinite;
    animation-delay: -10s;
  }

  .snowflake:nth-of-type(33) {
    --size: ${isPC ? 6 : 4}px;
    --left-ini: -1vw;
    --left-end: 9vw;
    left: 62vw;
    animation: ${fallSnow} ${isPC ? 13.5 : 18}s linear infinite;
    animation-delay: -2s;
  }

  .snowflake:nth-of-type(34) {
    --size: ${isPC ? 15 : 10}px;
    --left-ini: 8vw;
    --left-end: 6vw;
    left: 73vw;
    animation: ${fallSnow} ${isPC ? 10.5 : 14}s linear infinite;
    animation-delay: -2s;
  }

  .snowflake:nth-of-type(35) {
    --size: ${isPC ? 15 : 10}px;
    --left-ini: 10vw;
    --left-end: -6vw;
    left: 47vw;
    animation: ${fallSnow} ${isPC ? 19.5 : 26}s linear infinite;
    animation-delay: -6s;
  }

  .snowflake:nth-of-type(36) {
    --size: ${isPC ? 9 : 6}px;
    --left-ini: 6vw;
    --left-end: -5vw;
    left: 85vw;
    animation: ${fallSnow} ${isPC ? 10.5 : 14}s linear infinite;
    animation-delay: -2s;
  }

  .snowflake:nth-of-type(37) {
    --size: ${isPC ? 6 : 4}px;
    --left-ini: 1vw;
    --left-end: -1vw;
    left: 12vw;
    animation: ${fallSnow} ${isPC ? 10.5 : 14}s linear infinite;
    animation-delay: -5s;
  }

  .snowflake:nth-of-type(38) {
    --size: ${isPC ? 9 : 6}px;
    --left-ini: 6vw;
    --left-end: -9vw;
    left: 50vw;
    animation: ${fallSnow} ${isPC ? 21 : 28}s linear infinite;
    animation-delay: -5s;
  }

  .snowflake:nth-of-type(39) {
    --size: ${isPC ? 12 : 8}px;
    --left-ini: 7vw;
    --left-end: -3vw;
    left: 59vw;
    animation: ${fallSnow} ${isPC ? 21 : 28}s linear infinite;
    animation-delay: -9s;
  }

  .snowflake:nth-of-type(40) {
    --size: ${isPC ? 3 : 2}px;
    --left-ini: -9vw;
    --left-end: 0vw;
    left: 55vw;
    animation: ${fallSnow} ${isPC ? 9 : 12}s linear infinite;
    animation-delay: -8s;
  }

  .snowflake:nth-of-type(41) {
    --size: ${isPC ? 15 : 10}px;
    --left-ini: 8vw;
    --left-end: -4vw;
    left: 63vw;
    animation: ${fallSnow} ${isPC ? 19.5 : 26}s linear infinite;
    animation-delay: -7s;
  }

  .snowflake:nth-of-type(42) {
    --size: ${isPC ? 3 : 2}px;
    --left-ini: -3vw;
    --left-end: -6vw;
    left: 4vw;
    animation: ${fallSnow} ${isPC ? 15 : 20}s linear infinite;
    animation-delay: -4s;
  }

  .snowflake:nth-of-type(43) {
    --size: ${isPC ? 9 : 6}px;
    --left-ini: -4vw;
    --left-end: 7vw;
    left: 59vw;
    animation: ${fallSnow} ${isPC ? 13.5 : 18}s linear infinite;
    animation-delay: -6s;
  }

  .snowflake:nth-of-type(44) {
    --size: ${isPC ? 9 : 6}px;
    --left-ini: 9vw;
    --left-end: -5vw;
    left: 93vw;
    animation: ${fallSnow} ${isPC ? 9 : 12}s linear infinite;
    animation-delay: -1s;
  }

  .snowflake:nth-of-type(45) {
    --size: ${isPC ? 12 : 8}px;
    --left-ini: 6vw;
    --left-end: 7vw;
    left: 89vw;
    animation: ${fallSnow} ${isPC ? 18 : 24}s linear infinite;
    animation-delay: -9s;
  }

  .snowflake:nth-of-type(46) {
    --size: ${isPC ? 3 : 2}px;
    --left-ini: 7vw;
    --left-end: 1vw;
    left: 71vw;
    animation: ${fallSnow} ${isPC ? 10.5 : 14}s linear infinite;
    animation-delay: -3s;
  }

  .snowflake:nth-of-type(47) {
    --size: ${isPC ? 3 : 2}px;
    --left-ini: 0vw;
    --left-end: 5vw;
    left: 77vw;
    animation: ${fallSnow} ${isPC ? 10 : 13}s linear infinite;
    animation-delay: -1s;
  }

  .snowflake:nth-of-type(48) {
    --size: ${isPC ? 3 : 2}px;
    --left-ini: -9vw;
    --left-end: 7vw;
    left: 98vw;
    animation: ${fallSnow} ${isPC ? 18 : 24}s linear infinite;
    animation-delay: -5s;
  }

  .snowflake:nth-of-type(49) {
    --size: ${isPC ? 6 : 4}px;
    --left-ini: -6vw;
    --left-end: 6vw;
    left: 42vw;
    animation: ${fallSnow} ${isPC ? 15 : 20}s linear infinite;
    animation-delay: -3s;
  }

  .snowflake:nth-of-type(50) {
    --size: ${isPC ? 3 : 2}px;
    --left-ini: -3vw;
    --left-end: 6vw;
    left: 14vw;
    animation: ${fallSnow} ${isPC ? 15 : 20}s linear infinite;
    animation-delay: -9s;
  }

  .snowflake:nth-of-type(6n) {
    ${isPC &&
    css`
      filter: blur(1px);
    `}
  }

  .snowflake:nth-of-type(3n) {
    opacity: 0.5;
  }
`;

export default function SnowEffect() {
  const { data: config } = useEventConfigQuery();
  const isSnow = (config?.seasonalActivatedEvents || []).includes('seasonal_effect');
  const countOfSnow = isPC ? PC_COUNT_OF_SNOW : MW_COUNT_OF_SNOW;

  if (!isSnow) {
    return <></>;
  }

  return (
    <Wrapper>
      {times(countOfSnow, (number) => (
        <SnowFlake key={`snowflake-${number}`} className="snowflake" />
      ))}
    </Wrapper>
  );
}
