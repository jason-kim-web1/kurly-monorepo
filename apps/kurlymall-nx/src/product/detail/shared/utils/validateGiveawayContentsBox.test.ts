import { validateGiveawayContentsBox } from './validateGiveawayContentsBox';

describe('validateGiveawayContentsBox', () => {
  context('giveawayContentsBox가 null, undefined인 경우', () => {
    it.each([null, undefined])('false를 반환한다.', (value) => {
      given('giveawayContentsBox', () => value);
      const result = validateGiveawayContentsBox(given.giveawayContentsBox);

      expect(result).toBe(false);
    });
  });

  context('giveawayContentsBox의 필수 값이 없는 경우', () => {
    it.each([
      {
        bannerImage: {
          imageUrl: undefined,
          productContentsBoxBannerUrl: undefined,
          text: '',
        },
        contents: '내용',
        mainImage: {
          imageUrl: '',
          productContentsBoxMainUrl: '',
          text: 'test',
        },
        term: '기간',
        attention: '유의 사항',
      },
      {
        bannerImage: {
          imageUrl: '',
          productContentsBoxBannerUrl: '',
          text: undefined,
        },
        contents: '내용',
        mainImage: {
          imageUrl: '',
          productContentsBoxMainUrl: '',
          text: 'test',
        },
        term: '기간',
        attention: '유의 사항',
      },
      {
        bannerImage: {
          imageUrl: '',
          productContentsBoxBannerUrl: '',
          text: 'test',
        },
        contents: '내용',
        mainImage: {
          imageUrl: undefined,
          productContentsBoxMainUrl: undefined,
          text: 'test',
        },
        term: '기간',
        attention: '유의 사항',
      },
      {
        bannerImage: {
          imageUrl: '',
          productContentsBoxBannerUrl: '',
          text: 'test',
        },
        contents: '내용',
        mainImage: {
          imageUrl: '',
          productContentsBoxMainUrl: '',
          text: 'test',
        },
        term: undefined,
        attention: '유의 사항',
      },
      {
        bannerImage: {
          imageUrl: '',
          productContentsBoxBannerUrl: '',
          text: '',
        },
        contents: '내용',
        mainImage: {
          imageUrl: '',
          productContentsBoxMainUrl: '',
          text: 'test',
        },
        term: '기간',
        attention: undefined,
      },
    ])('false를 반환한다.', (giveawayContentsBox) => {
      given('giveawayContentsBox', () => giveawayContentsBox);
      const result = validateGiveawayContentsBox(given.giveawayContentsBox);

      expect(result).toBe(false);
    });
  });

  context('giveawayContentsBox가 정상인 경우', () => {
    given('giveawayContentsBox', () => {
      return {
        bannerImage: {
          imageUrl: 'banner_image_url',
          productContentsBoxBannerUrl: 'banner_image_url',
          text: '배너 이미지 텍스트',
        },
        contents: '내용',
        mainImage: {
          imageUrl: 'main_image_url',
          productContentsBoxMainUrl: 'main_image_url',
          text: 'test',
        },
        term: '기간',
        attention: '유의 사항',
      };
    });
    it('true를 반환한다.', () => {
      const result = validateGiveawayContentsBox(given.giveawayContentsBox);

      expect(result).toBe(true);
    });
  });
});
