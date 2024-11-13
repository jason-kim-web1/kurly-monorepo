import { render } from '@testing-library/react';

import UserGuide from './UserGuide';

const UserGuideSample = {
  title: ['회원 / 혜택', '주문 / 결제', '배송', '취소 / 교환 / 환불'],
};

describe('이용안내(UserGuide) 페이지에서 하위 컴포넌트들이 렌더링되는지 테스트합니다.', () => {
  const renderUserGuide = () => render(<UserGuide />);

  it('UserGuideItem 4개를 보여줍니다.', () => {
    const { getByText } = renderUserGuide();

    UserGuideSample.title.forEach((title) => {
      const sample = getByText(title);
      expect(sample).toBeInTheDocument();
    });
  });
});
