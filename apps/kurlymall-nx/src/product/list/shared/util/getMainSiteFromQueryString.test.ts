import { getMainSiteFromQueryString } from './getMainSiteFromQueryString';

describe('getMainSiteFromQueryString', () => {
  context('site 값이 market이면', () => {
    it('"Market을" 반환하라', () => {
      expect(getMainSiteFromQueryString('market')).toBe('MARKET');
    });
  });

  context('site 값이 beauty이면', () => {
    it('"BEAUTY" 반환하라', () => {
      expect(getMainSiteFromQueryString('beauty')).toBe('BEAUTY');
    });
  });

  context.each(['', 'wrongSite', undefined])('값이 market, beauty가 아닌 경우', (value) => {
    it(`true를 반환하라. 값(${value})`, () => {
      expect(getMainSiteFromQueryString(value)).toBe('MARKET');
    });
  });
});
