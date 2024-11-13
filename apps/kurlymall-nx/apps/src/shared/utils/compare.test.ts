import { equalsIgnoreCase } from './compare';

test('convert to camel keys', () => {
  const lowerCaseStr = 'low';
  expect(equalsIgnoreCase(lowerCaseStr, lowerCaseStr)).toBeTruthy();
  expect(equalsIgnoreCase(lowerCaseStr, lowerCaseStr.toUpperCase())).toBeTruthy();
  expect(equalsIgnoreCase(lowerCaseStr, 'foo')).toBeFalsy();
});
