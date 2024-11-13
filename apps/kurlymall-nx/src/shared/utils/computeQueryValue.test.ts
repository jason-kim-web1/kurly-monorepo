import { computeQueryValue } from './computeQueryValue';

describe('computeQueryValue', () => {
  given('query', () => {});
  given('key', () => 'key');
  given('defaultValue', () => 'defaultValue');

  context('query 객체에 key 값의 데이터가 없으면', () => {
    it('defaultValue를 반환하라.', () => {
      expect(computeQueryValue(given.query)(given.key, given.defaultValue)).toBe('defaultValue');
    });
  });

  context('query 객체에 값이 들어오고', () => {
    context('값이 배열이 아니면', () => {
      given('query', () => ({
        key: 'value',
      }));
      it('해당 값을 반환한다.', () => {
        expect(computeQueryValue(given.query)(given.key, given.deafultValue)).toBe('value');
      });
    });

    context('값이 배열이면', () => {
      given('query', () => ({
        key: ['value1', 'value2'],
      }));
      it('배열의 첫번째 값을 반환한다.', () => {
        expect(computeQueryValue(given.query)(given.key, given.deafultValue)).toBe('value1');
      });
    });
  });
});
