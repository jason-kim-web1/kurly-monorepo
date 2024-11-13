import { add, format, startOfDay } from 'date-fns';

import evalAdult from './evalAdult';

describe('evalAdult', () => {
  const today = startOfDay(new Date());

  context('성인이면', () => {
    it('true를 반환한다', () => {
      expect(evalAdult(format(add(today, { years: -19 }), 'yyyyMMdd'), today)).toBeTruthy();

      expect(evalAdult(format(add(today, { years: -19, days: +1, seconds: -1 }), 'yyyyMMdd'), today)).toBeTruthy();

      expect(evalAdult(format(add(today, { years: -25 }), 'yyyyMMdd'), today)).toBeTruthy();
    });
  });

  context('성인이 아니면', () => {
    const dateOfBirth = add(today, { years: -19, days: +1 });

    it('false를 반환한다', () => {
      expect(evalAdult(format(dateOfBirth, 'yyyyMMdd'), today)).toBeFalsy();
    });
  });
});
