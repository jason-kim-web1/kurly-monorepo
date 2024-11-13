import { removeHyphen, appendHyphenToPhoneNumber, convertToKoreanNumber, convertNumberToKRW } from '.';

describe('appendHyphenToPhoneNumber', () => {
  context('with only numbers', () => {
    it('returns appended phone number', () => {
      expect(appendHyphenToPhoneNumber('01012345678')).toBe('010-1234-5678');
      expect(appendHyphenToPhoneNumber('0101235678')).toBe('010-123-5678');
    });
  });

  context('when has hyphen', () => {
    it('returns received value', () => {
      expect(appendHyphenToPhoneNumber('010-1234-5678')).toBe('010-1234-5678');
    });
  });
});

test('convertToKoreanNumber', () => {
  expect(convertToKoreanNumber(1000)).toBe('1,000원');
  expect(convertToKoreanNumber(1000)).toBe('1,000원');
  expect(convertToKoreanNumber(3000)).toBe('3천원');
  expect(convertToKoreanNumber(30000)).toBe('3만원');
});

test('removeHyphen', () => {
  expect(removeHyphen('010-1234-5678')).toBe('01012345678');
});

describe('convertNumberToKRW', () => {
  it('0원 이하는 0원으로 return 한다.', () => {
    expect(convertNumberToKRW(0)).toBe('0원');
    expect(convertNumberToKRW(-10)).toBe('0원');
  });

  it('백원단위가 없으면 금액을 한글 단위로 표기한다.', () => {
    expect(convertNumberToKRW(1000)).toBe('1천원');
    expect(convertNumberToKRW(2000)).toBe('2천원');

    expect(convertNumberToKRW(10000)).toBe('1만원');
    expect(convertNumberToKRW(20000)).toBe('2만원');
    expect(convertNumberToKRW(25000)).toBe('2만 5천원');

    expect(convertNumberToKRW(100000)).toBe('10만원');
  });

  it('숫자가 백원단위로 떨어질 경우 comma 가 붙은 숫자로 return 한다.', () => {
    expect(convertNumberToKRW(1)).toBe('1원');
    expect(convertNumberToKRW(10)).toBe('10원');
    expect(convertNumberToKRW(100)).toBe('100원');

    expect(convertNumberToKRW(2500)).toBe('2,500원');
    expect(convertNumberToKRW(9900)).toBe('9,900원');
    expect(convertNumberToKRW(25600)).toBe('25,600원');

    expect(convertNumberToKRW(104300)).toBe('104,300원');
    expect(convertNumberToKRW(10644300)).toBe('10,644,300원');
  });
});
