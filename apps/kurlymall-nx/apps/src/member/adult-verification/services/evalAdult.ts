import { differenceInYears, parse } from 'date-fns';

const ADULT_AGE = 19;

export default function evalAdult(dateOfBirth: string, currentDate = new Date()): boolean {
  const date = parse(dateOfBirth, 'yyyyMMdd', new Date());
  const age = differenceInYears(currentDate, date);
  return age >= ADULT_AGE;
}
