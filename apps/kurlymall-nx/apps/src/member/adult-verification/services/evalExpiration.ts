import { isAfter } from 'date-fns';

const currentDateTime = new Date();

export default function evalExpiration(expiredAt: Date | null, comparedTo = currentDateTime) {
  if (expiredAt === null) {
    return false;
  }
  return isAfter(comparedTo, expiredAt);
}
