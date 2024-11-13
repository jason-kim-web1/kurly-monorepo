import {
  checkIsExternalLink,
  checkValidURL,
  createInternalUrlPath,
  createQueryString,
  createUrlPath,
  mergeOptionListToQueryString,
  optionListToQueryString,
} from './url';

describe('url test', () => {
  const CURRENT_HOST = 'www.kurly.com';
  const invalidUrlList = [
    'invalid_url',
    'kurly.com',
    'https://',
    'https://kurly.com:abc',
    'https//kurly.com/?query=test',
    '/detail',
  ];
  const externalUrlList = [
    'https://www.kurly.com/shop/event/kurlyEvent.php?htmid=event/delivery_search/delivery_search',
    'https://www.naver.com',
    'https://www.stg.kurly.com',
  ];
  const validQuery = {
    test: 1,
    test2: 'two',
    test3: true,
  };
  const invalidQueryList = [1, 'test', true];

  context('쿼리스트링으로 만들고 싶은 객체가 있을 경우', () => {
    it('해당 객체를 토대로 쿼리스트링을 만들어 반환한다', () => {
      expect(createQueryString(validQuery)).toBe('test=1&test2=two&test3=true');
    });
  });

  context('url 경로를 만들고 싶은 경우', () => {
    const pathname = '/testPath';

    context('쿼리스트링으로 만들고 싶은 객체가 있을 경우', () => {
      it('pathname과 쿼리 객체를 받아 생성한 경로를 반환한다', () => {
        expect(createUrlPath(pathname, validQuery)).toBe('/testPath?test=1&test2=two&test3=true');
      });
    });

    context('쿼리스트링으로 만들고 싶은 객체가 없을 경우', () => {
      it('pathname을 반환한다', () => {
        expect(createUrlPath(pathname, undefined)).toBe('/testPath');
      });
    });

    context.each(invalidQueryList)('쿼리스트링으로 만들고 싶은 객체가 아닐 경우', (query) => {
      it(`pathname을 반환한다. 쿼리(${query})`, () => {
        expect(createUrlPath(pathname, query)).toBe('/testPath');
      });
    });
  });

  context('옵션 리스트들로 쿼리스트링을 만들고 싶을 경우', () => {
    const keyName = 'testKey';

    context('옵션 리스트들이 존재할 경우', () => {
      const optionList = ['option1', 'option2', 'option3'];

      it('해당 옵션 리스트 기반으로 쿼리 스트링을 반환한다', () => {
        expect(optionListToQueryString(keyName, optionList)).toBe('testKey:option1,option2,option3');
      });
    });

    context('옵션 리스트들이 존재하지 않을 경우', () => {
      it('빈 스트링을 반환한다', () => {
        expect(optionListToQueryString(keyName, [])).toBe('');
      });
    });
  });

  context('옵션 리스트 객체들을 합쳐서 쿼리스트링을 만들고 싶을 경우', () => {
    const optionList = [
      { keyName: 'key1', value: ['option1', 'option2', 'option3'] },
      { keyName: 'key2', value: ['option4', 'option5', 'option6'] },
      { keyName: 'key3', value: [] },
    ];

    it('빈 옵션 리스트를 제외한 쿼리스트링을 만들어 반환한다', () => {
      expect(mergeOptionListToQueryString(optionList)).toBe(
        'key1:option1,option2,option3|key2:option4,option5,option6',
      );
    });
  });

  context.each(invalidUrlList)('url이 유효하지 않은 경우', (url) => {
    it(`false를 반환한다. 값(${url})`, () => {
      expect(checkValidURL(url)).toBeFalsy();
    });
  });

  context('url이 유효한 경우', () => {
    it('전체 url 중 host를 제외한 경로로 정제해야 한다.', () => {
      expect(
        createInternalUrlPath(
          'https://www.kurly.com/search?sword=%EC%82%AC%EA%B3%BC&page=1&per_page=12&sorted_type=5&filters=category%3A913007%7Cbrand%3A9yumej',
        ),
      ).toBe(
        '/search?sword=%EC%82%AC%EA%B3%BC&page=1&per_page=12&sorted_type=5&filters=category%3A913007%7Cbrand%3A9yumej',
      );
    });
  });

  context.each(externalUrlList)('전달된 링크가 외부링크일때 true를 반환한다.', (url) => {
    expect(checkIsExternalLink(url, CURRENT_HOST)).toBeTruthy();
  });
});

describe('checkIsExternalLink', () => {
  context('www.kurly.com 으로 서비스 중인 경우', () => {
    const INTERNAL_HOST = 'www.kurly.com';
    it('호스트가 다른 경우, 외부 주소로 판단한다.', () => {
      expect(checkIsExternalLink('https://www.naver.com', INTERNAL_HOST)).toBeTruthy();
      expect(checkIsExternalLink('https://www.google.com', INTERNAL_HOST)).toBeTruthy();
      expect(checkIsExternalLink('https://www.kurlypay.co.kr', INTERNAL_HOST)).toBeTruthy();
    });
    it('호스트가 같은 경우, 내부 주소로 판단한다.', () => {
      expect(checkIsExternalLink('https://www.kurly.com', INTERNAL_HOST)).toBeFalsy();
      expect(checkIsExternalLink('https://www.kurly.com/search', INTERNAL_HOST)).toBeFalsy();
      expect(checkIsExternalLink('https://www.kurly.com/goods/12345', INTERNAL_HOST)).toBeFalsy();
      expect(checkIsExternalLink('https://www.kurly.com/mypage/review', INTERNAL_HOST)).toBeFalsy();
    });
  });
});
