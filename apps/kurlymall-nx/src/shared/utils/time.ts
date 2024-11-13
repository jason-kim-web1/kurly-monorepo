const millisecond = 1000;

export const getSecond = (sec: number): number => sec * millisecond;

export const getMinutes = (minutes: number): number => minutes * getSecond(60);

export const millisecondToSec = (mSec: number) => mSec / millisecond;
