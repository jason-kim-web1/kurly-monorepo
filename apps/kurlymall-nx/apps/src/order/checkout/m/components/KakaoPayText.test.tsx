import { render } from '@testing-library/react';

import KakaoPayText from './KakaoPayText';

describe('KakaoPayText', () => {
  given('hasEvent', () => false);

  const renderKakaoPayText = () => render(<KakaoPayText hasEvent={given.hasEvent} />);

  it('renders KakaoPayText', () => {
    const { container } = renderKakaoPayText();

    expect(container).toHaveTextContent('카카오페이');
    expect(container).toHaveTextContent('카카오페이 전용 쿠폰 사용 시, 카카오페이 결제만 가능합니다.');
  });

  context('when has event', () => {
    given('hasEvent', () => true);

    it('returns benefit text', () => {
      const { container } = renderKakaoPayText();

      expect(container).toHaveTextContent('혜택');
    });
  });
});
