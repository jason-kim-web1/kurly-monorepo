import { buildProductStorageText } from './productStorageUtil';

describe('productStorageUtil', () => {
  describe('buildProductStorageText', () => {
    const getTest = () => buildProductStorageText(given.types);

    context('when storage type is AMBIENT_TEMPERATURE', () => {
      given('types', () => ['AMBIENT_TEMPERATURE']);
      it('상온 텍스트를 반환한다', () => {
        expect(getTest()).toBe('상온');
      });
    });

    context('when storage types are AMBIENT_TEMPERATURE and ROOM_TEMPERATURE', () => {
      given('types', () => ['AMBIENT_TEMPERATURE', 'ROOM_TEMPERATURE']);
      it('상온/실온 텍스트를 반환한다', () => {
        expect(getTest()).toBe('상온/실온');
      });
    });

    context('보관 타입이 온도 높은 순으로 정렬이 되어있지 않으면 ', () => {
      given('types', () => ['ETC', 'FROZEN', 'AMBIENT_TEMPERATURE', 'ROOM_TEMPERATURE']);
      it('온도 높은 순으로 정렬된 텍스트를 반환한다', () => {
        expect(getTest()).toBe('상온/실온/냉동/기타');
      });
    });
  });
});
