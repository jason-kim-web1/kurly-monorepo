import { useEffect, useMemo, useState } from 'react';
import { differenceInSeconds, intervalToDuration, subSeconds } from 'date-fns';

interface Props {
  endDate: Date;
  onEnd?(): void;
}

export default function useCountDownTimer({ endDate, onEnd }: Props) {
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDate((current) => subSeconds(current, -1));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const diff = useMemo(() => {
    if (currentDate > endDate) {
      return 0;
    }

    return differenceInSeconds(endDate, currentDate);
  }, [currentDate, endDate]);

  useEffect(() => {
    if (!onEnd || diff > 0) {
      return;
    }
    onEnd();
  }, [diff, onEnd]);

  const result = intervalToDuration({ start: 0, end: diff * 1000 });
  const days = result.days || 0;
  const hours = result.hours || 0;

  return {
    hours: hours + days * 24,
    minutes: result.minutes,
    seconds: result.seconds,
  };
}
