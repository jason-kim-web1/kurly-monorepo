import { getDefaultPerPage } from './getDefaultPerPage';

jest.mock('../../../../../util/window/getDevice');

const mockGetDevice = jest.requireMock('../../../../../util/window/getDevice');

describe('get default per page', () => {
  given('section', () => '');

  context('PC 환경', () => {
    mockGetDevice.isMobileWeb = false;
    mockGetDevice.isPC = true;
    mockGetDevice.isMobileDevice = false;

    context('카테고리 페이지인 경우', () => {
      given('section', () => 'categories');

      it('96을 리턴한다.', () => {
        const defaultPage = getDefaultPerPage(given.section);
        expect(defaultPage).toBe(96);
      });
    });

    context('컬렉션 페이지인 경우', () => {
      given('section', () => 'collections');

      it('96을 리턴한다.', () => {
        const defaultPage = getDefaultPerPage(given.section);
        expect(defaultPage).toBe(96);
      });
    });

    context('검색 페이지인 경우', () => {
      given('section', () => 'search');

      it('96을 리턴한다.', () => {
        const defaultPage = getDefaultPerPage(given.section);
        expect(defaultPage).toBe(96);
      });
    });
  });

  context('MW 환경', () => {
    beforeEach(() => {
      mockGetDevice.isPC = false;
    });

    context('카테고리 페이지인 경우', () => {
      given('section', () => 'categories');

      it('20을 리턴한다.', () => {
        const defaultPage = getDefaultPerPage(given.section);
        expect(defaultPage).toBe(20);
      });
    });

    context('컬렉션 페이지인 경우', () => {
      given('section', () => 'collections');

      it('20을 리턴한다.', () => {
        const defaultPage = getDefaultPerPage(given.section);
        expect(defaultPage).toBe(20);
      });
    });

    context('검색 페이지인 경우', () => {
      given('section', () => 'search');

      it('10을 리턴한다.', () => {
        const defaultPage = getDefaultPerPage(given.section);
        expect(defaultPage).toBe(10);
      });
    });
  });
});
