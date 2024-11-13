import { useEffect, useState } from 'react';

export const useDebouncedValue = <T>(value: T, delayTime: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delayTime);

    return () => {
      clearTimeout(timer);
    };
  }, [value]);

  return debouncedValue;
};
