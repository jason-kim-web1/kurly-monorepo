import { getReplaceUrl } from './getDevice';

describe('getReplaceUrl test', () => {
  context.each([
    { url: '/m/main', result: '/main' },
    { url: '/mypage/order', result: '/mypage/order' },
    { url: '/m2/error.php', result: '/m2/error.php' },
    { url: '/m2/board/list.php?&id=recipe', result: '/m2/board/list.php?&id=recipe' },
  ])('m2 가 붙으면 그대로 반환하고 앞에 /m 이 있으면 없애라.', ({ url, result }) => {
    it('변경된 url 을 반환한다.', () => {
      expect(getReplaceUrl(url)).toBe(result);
    });
  });
});
