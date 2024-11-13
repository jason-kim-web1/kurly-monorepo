import { parseFilterData } from './parseFilterData';

describe('parse Filter Data', () => {
  given('filterStr', () => '');

  context.each([
    {
      filterStr: '',
      expectedResult: {},
    },
    {
      filterStr: 'category:249',
      expectedResult: {
        category: ['249'],
      },
    },
    {
      filterStr: 'category:249,910',
      expectedResult: {
        category: ['249', '910'],
      },
    },
    {
      filterStr: 'category:249,910|brand:brand3',
      expectedResult: {
        category: ['249', '910'],
        brand: ['brand3'],
      },
    },
    {
      filterStr: 'category:249,910|brand:brand3|benefit:discount',
      expectedResult: {
        category: ['249', '910'],
        brand: ['brand3'],
        benefit: ['discount'],
      },
    },
    {
      filterStr: 'category:249,910|brand:brand3|benefit:discount|type:kurly_only',
      expectedResult: {
        category: ['249', '910'],
        brand: ['brand3'],
        benefit: ['discount'],
        type: ['kurly_only'],
      },
    },
    {
      filterStr: 'category%3A249%2C910%7Cbrand%3Abrand3%7Cbenefit%3Adiscount%7Ctype%3Akurly_only%7Cprice%3A9000-10000',
      expectedResult: {
        category: ['249', '910'],
        brand: ['brand3'],
        benefit: ['discount'],
        type: ['kurly_only'],
        price: ['9000-10000'],
      },
    },
  ])('정상적인 filterStr가 내려온다면', ({ filterStr, expectedResult }) => {
    given('filterStr', () => filterStr);

    it('key, value로 나눠진 object가 생성된다.', () => {
      const parsedFilterData = parseFilterData(decodeURIComponent(given.filterStr));

      expect(parsedFilterData).toStrictEqual(expectedResult);
    });
  });

  context.each([
    {
      filterStr: ':249,910|brand:brand3',
      expectedResult: {
        brand: ['brand3'],
      },
    },
    {
      filterStr: 'category:249,910|:brand3',
      expectedResult: {
        category: ['249', '910'],
      },
    },
  ])('사용자가 url을 변경해서 key가 없는 값을 포함한 filterStr가 내려온다면', ({ filterStr, expectedResult }) => {
    given('filterStr', () => filterStr);

    it('해당 값이 제거된 object가 생성된다.', () => {
      const parsedFilterData = parseFilterData(decodeURIComponent(given.filterStr));

      expect(parsedFilterData).toStrictEqual(expectedResult);
    });
  });

  context.each([
    {
      filterStr: 'category3A249%2C910%7Cbrand%3Abrand3',
      expectedResult: {
        'category3A249,910': [''],
        brand: ['brand3'],
      },
    },
    {
      filterStr: 'category%3249%2C910%7Cbrand%3Abrand3',
      expectedResult: {
        'category249,910': [''],
        brand: ['brand3'],
      },
    },
  ])('사용자가 url을 변경해서 :가 없는 값을 포함한 filterStr가 내려온다면', ({ filterStr, expectedResult }) => {
    given('filterStr', () => filterStr);

    it('해당 값이 key이고 빈 문자열 배열을 값으로 가지는 object가 생성된다.', () => {
      const parsedFilterData = parseFilterData(decodeURIComponent(given.filterStr));

      expect(parsedFilterData).toStrictEqual(expectedResult);
    });
  });

  context.each([
    {
      filterStr: 'category%3A2492C910%7Cbrand%3Abrand3',
      expectedResult: {
        category: ['2492C910'],
        brand: ['brand3'],
      },
    },
    {
      filterStr: 'category%3A249%2910%7Cbrand%3Abrand3',
      expectedResult: {
        category: ['249)10'],
        brand: ['brand3'],
      },
    },
  ])('사용자가 url을 변경해서 ,가 없는 값을 포함한 filterStr가 내려온다면', ({ filterStr, expectedResult }) => {
    given('filterStr', () => filterStr);

    it('필터 값이 합쳐져서 저장된 object가 생성된다.', () => {
      const parsedFilterData = parseFilterData(decodeURIComponent(given.filterStr));

      expect(parsedFilterData).toStrictEqual(expectedResult);
    });
  });

  context.each([
    {
      filterStr: 'category%3A249%2C9107Cbrand%3Abrand3',
      expectedResult: {
        category: ['249', '9107Cbrand'],
      },
    },
    {
      filterStr: 'category%3A249%2C910%7brand%3Abrand3',
      expectedResult: {
        category: ['249', '910{rand'],
      },
    },
  ])('사용자가 url을 변경해서 |가 없는 값을 포함한 filterStr가 내려온다면', ({ filterStr, expectedResult }) => {
    given('filterStr', () => filterStr);

    it('필터 키가 이전 필터 값에 합쳐져서 저장된 object가 생성된다.', () => {
      const parsedFilterData = parseFilterData(decodeURIComponent(given.filterStr));

      expect(parsedFilterData).toStrictEqual(expectedResult);
    });
  });
});
