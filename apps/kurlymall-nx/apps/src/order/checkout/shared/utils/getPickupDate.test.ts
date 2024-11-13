import getPickupDate from './getPickupDate';

describe('Create Pickup Date object', () => {
  context('undefined 가 입력되면', () => {
    it('빈 문자열이 담긴 object 를 return 한다.', () => {
      const result = getPickupDate(undefined);

      expect(result).toStrictEqual({
        startYear: '',
        startMonth: '',
        startDay: '',
        endYear: '',
        endMonth: '',
        endDay: '',
      });
    });
  });

  context('string type 의 날짜를 입력하면', () => {
    it('year, month, day 구조의 object 를 return 한다.', () => {
      const result = getPickupDate({
        startDate: '2023-11-20',
        endDate: '2023-11-23',
      });

      expect(result).toStrictEqual({
        startYear: '2023',
        startMonth: '11',
        startDay: '20',
        endYear: '2023',
        endMonth: '11',
        endDay: '23',
      });
    });
  });
});
