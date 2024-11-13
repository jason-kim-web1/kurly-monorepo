import { isDefined } from './lodash-extends';

describe('isDefined', () => {
  context('값이 undefined이면', () => {
    it('false를 반환하라', () => {
      expect(isDefined(undefined)).toBeFalsy();
    });
  });

  context.each(['', 'abc', 123, {}, [], new Error(), new Date(), /x/, true, false])(
    '값이 undefined가 아닌 경우',
    (value) => {
      it(`true를 반환하라. 값(${value})`, () => {
        expect(isDefined(value)).toBeTruthy();
      });
    },
  );
});
