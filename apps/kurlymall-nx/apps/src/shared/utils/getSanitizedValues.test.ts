import type { GetSanitizedValues } from './getSanitizedValues';
import {
  getSanitizedBooleanValue,
  getSanitizedMainSite,
  getSanitizedNumberValue,
  getSanitizedValue,
} from './getSanitizedValues';

describe('getSanitizedValue 함수', () => {
  // 가상의 fn 함수
  const mockFn = jest.fn((value: string, defaultValue: string) => {
    return value.toUpperCase() + defaultValue.toUpperCase();
  });

  context('value가 정의되지 않은 경우', () => {
    it('defaultValue를 반환해야 합니다.', () => {
      const testCase: GetSanitizedValues<string> = {
        value: undefined,
        defaultValue: 'default',
        fn: mockFn,
      };

      const result = getSanitizedValue<string>(testCase);
      expect(result).toEqual('default');
    });
  });

  context('value가 정의된 경우', () => {
    it('fn 함수 결과를 반환해야 합니다..', () => {
      const testCase: GetSanitizedValues<string> = {
        value: 'hello',
        defaultValue: 'world',
        fn: mockFn,
      };

      const result = getSanitizedValue<string>(testCase);
      expect(result).toEqual('HELLOWORLD');
    });
  });
});

describe('getSanitizedMainSite', () => {
  const defaultSite = 'MARKET';
  context('site 값이 MARKET인 경우', () => {
    it('MARKET을 반환해야 합니다.', () => {
      const site = 'MARKET';
      const expected = 'MARKET';
      const result = getSanitizedMainSite(site, defaultSite);

      expect(result).toBe(expected);
    });
  });

  context('site 값이 BEAUTY인 경우', () => {
    it('BEAUTY을 반환해야 합니다.', () => {
      const site = 'BEAUTY';

      const expected = 'BEAUTY';
      const result = getSanitizedMainSite(site, defaultSite);

      expect(result).toBe(expected);
    });
  });

  context('site 값이 market인 경우', () => {
    it('market을 반환해야 합니다.', () => {
      const site = 'market';

      const expected = 'MARKET';
      const result = getSanitizedMainSite(site, defaultSite);

      expect(result).toBe(expected);
    });
  });

  context('site 값이 beauty인 경우', () => {
    it('beauty을 반환해야 합니다.', () => {
      const site = 'beauty';

      const expected = 'BEAUTY';
      const result = getSanitizedMainSite(site, defaultSite);

      expect(result).toBe(expected);
    });
  });

  context('주어진 사이트가 유효하지 않을 경우', () => {
    it('기본 MainSite 값을 반환해야 합니다.', () => {
      const site = 'invalid-site';
      const expected = 'MARKET';

      const result = getSanitizedMainSite(site, defaultSite);

      expect(result).toBe(expected);
    });
  });
});

describe('getSanitizedBooleanValue', () => {
  context('주어진 값이 "TRUE"일 경우', () => {
    it('true를 반환해야 합니다.', () => {
      const value = 'TRUE';
      const defaultValue = true;
      const expected = true;
      const result = getSanitizedBooleanValue(value, defaultValue);

      expect(result).toBe(expected);
    });
  });

  context('주어진 값이 "FALSE"일 경우', () => {
    it('false를 반환해야 합니다.', () => {
      const value = 'FALSE';
      const defaultValue = false;
      const expected = false;
      const result = getSanitizedBooleanValue(value, defaultValue);

      expect(result).toBe(expected);
    });
  });

  context('주어진 값이 "true"일 경우', () => {
    it('true를 반환해야 합니다.', () => {
      const value = 'true';
      const defaultValue = true;
      const expected = true;
      const result = getSanitizedBooleanValue(value, defaultValue);

      expect(result).toBe(expected);
    });
  });

  context('주어진 값이 "false"일 경우', () => {
    it('false를 반환해야 합니다.', () => {
      const value = 'false';
      const defaultValue = false;
      const expected = false;
      const result = getSanitizedBooleanValue(value, defaultValue);

      expect(result).toBe(expected);
    });
  });

  context('주어진 값이 "true" 또는 "false"가 아닐 경우', () => {
    it('기본 defaultValue를 반환해야 합니다.', () => {
      const value = 'invalid-value';
      const defaultValue = true;
      const expected = true;

      const result = getSanitizedBooleanValue(value, defaultValue);

      expect(result).toBe(expected);
    });
  });
});

describe('getSanitizedNumberValue', () => {
  context('주어진 값이 유효한 숫자일 경우', () => {
    it('해당 숫자 값을 반환해야 합니다.', () => {
      const value = '42';
      const defaultValue = 0;
      const expected = 42;

      const result = getSanitizedNumberValue(value, defaultValue);

      expect(result).toBe(expected);
    });
  });

  context('주어진 값이 숫자로 변환될 수 없을 경우', () => {
    it('기본 defaultValue를 반환해야 합니다.', () => {
      const value = 'invalid-value';
      const defaultValue = 10;
      const expected = 10;

      const result = getSanitizedNumberValue(value, defaultValue);

      expect(result).toBe(expected);
    });
  });

  context('주어진 값이 16진수로 표현된 경우', () => {
    it('해당 숫자 값을 반환해야 합니다.', () => {
      const value = '0xA';
      const defaultValue = 0;
      const expected = 10;

      const result = getSanitizedNumberValue(value, defaultValue);

      expect(result).toBe(expected);
    });
  });

  context("주어진 값이 빈문자열('')인 경우", () => {
    it('기본 defaultValue를 반환해야 합니다.', () => {
      const value = '';
      const defaultValue = 10;
      const expected = 10;

      const result = getSanitizedNumberValue(value, defaultValue);

      expect(result).toBe(expected);
    });
  });
});
