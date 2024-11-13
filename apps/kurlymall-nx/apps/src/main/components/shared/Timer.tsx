import styled from '@emotion/styled';

import { useState } from 'react';

import useCountDownTimer from '../../hooks/useCountDownTimer';
import COLOR from '../../../shared/constant/colorset';
import LottieTimer from './LottieTimer';

const Container = styled.div`
  display: flex;
`;

const TimeUnits = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 136px;
  font-size: 32px;
  font-weight: 700;
  color: ${COLOR.kurlyGray800};
`;

const formatTime = (time?: number): string => {
  if (time === undefined) {
    return '00';
  }
  return time > 9 ? time.toString() : `0${time.toString()}`;
};

interface Props {
  isTimerOpen: boolean; // true/false. 첫번째 상품의 isDisplayTime 를 가져옴(api에서 true인경우 가장 앞으로 이동됨. 품절상품은 뒤로 보내는 정책에 따름)
  isSoldOut: boolean; // 위와 같음
  endDate: Date; // 종료시간
  dealEnded: boolean; // true/false. api에서 가져옴
  className?: string;
  onDealEnds(): void; // dealEnds 값을 false -> true 로 바꿔주는 함수
}

export default function Timer({ isTimerOpen, isSoldOut, endDate, dealEnded, className, onDealEnds }: Props) {
  const [lottiePlay, setLottiePlay] = useState(true);

  const handleEndTimer = () => {
    onDealEnds();
    setLottiePlay(false);
  };

  const { hours, minutes, seconds } = useCountDownTimer({
    endDate,
    onEnd: handleEndTimer,
  });

  if (!isTimerOpen || isSoldOut) {
    return null;
  }

  return (
    <Container className={className}>
      <LottieTimer className="lottie-timer" play={lottiePlay} />
      <TimeUnits className="time-units">
        {dealEnded ? (
          <span>TIME OUT</span>
        ) : (
          <>
            <span>{formatTime(hours)}</span>
            <span>{formatTime(minutes)}</span>
            <span>{formatTime(seconds)}</span>
          </>
        )}
      </TimeUnits>
    </Container>
  );
}
