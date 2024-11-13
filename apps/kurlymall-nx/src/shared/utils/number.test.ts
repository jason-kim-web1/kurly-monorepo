import { padZero } from './number';

test('padZero', () => {
  expect(padZero(1)).toBe('01');
  expect(padZero('1')).toBe('01');
  expect(padZero('10')).toBe('10');
  expect(padZero('0')).toBe('00');
});
