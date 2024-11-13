import { formatMobileNumber, phoneValidate } from './phone-valiator';

test('phone validator', () => {
  expect(phoneValidate('01012345678')).toBe(true);
  expect(phoneValidate('0110009999')).toBe(true);
  expect(phoneValidate('0190009999')).toBe(true);

  expect(phoneValidate('010123456789')).toBe(false);
  expect(phoneValidate('015123456789')).toBe(false);
  expect(phoneValidate('12345678910')).toBe(false);
});

test('phone formatting', () => {
  expect(formatMobileNumber('01012345678')).toBe('010-1234-5678');
  expect(formatMobileNumber('0110009999')).toBe('011-000-9999');
});
