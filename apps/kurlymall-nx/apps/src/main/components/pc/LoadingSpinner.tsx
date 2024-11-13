import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import { times } from 'lodash';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 50px 0;
`;

const Bars = styled.div`
  position: relative;
  width: 20px;
  height: 20px;
  transform: scale(1.5);
  transform-origin: 50%;
`;

const iSpinner = keyframes`
  0% {
    opacity: 0.85; }
  50% {
    opacity: 0.25; }
  100% {
    opacity: 0.25; }
`;

const Bar = styled.div<{ nth: number; length: number }>`
  position: absolute;
  top: 37%;
  left: 44.5%;
  width: 10%;
  height: 25%;
  background-color: #8e8e93;
  border-radius: 50%/20%;
  animation: ${iSpinner} 1s linear infinite;
  will-change: opacity;
  &:nth-of-type(${(props) => props.nth}) {
    transform: rotate(${(props) => (360 / props.length) * props.nth}deg) translate(0, -150%);
    animation-delay: ${(props) => (1 / props.length) * props.nth - 21}s;
  }
`;

const numberOfBars = 12;

export default function LoadingSpinner() {
  const bars = times(numberOfBars);

  return (
    <Container className="IosSpinner">
      <Bars>
        {bars.map((i) => (
          <Bar key={i} nth={i + 1} length={numberOfBars} />
        ))}
      </Bars>
    </Container>
  );
}
