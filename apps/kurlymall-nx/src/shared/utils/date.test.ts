import { getTimeFromDate } from './date';

test('getTimeFromDate', () => {
  expect(getTimeFromDate(2022, 2, 21, 11, 0)).toBe(1645408800000);
  expect(getTimeFromDate(2022, 2, 21, 11)).toBe(1645408800000);
  expect(getTimeFromDate(2022, 2, 21)).toBe(1645369200000);
});
