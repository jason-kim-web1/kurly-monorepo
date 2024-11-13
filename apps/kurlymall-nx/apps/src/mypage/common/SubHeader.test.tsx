import { render } from '@testing-library/react';

import SubHeader from './SubHeader';

describe('Mypage SubHeader 테스트', () => {
  given('subTitle', () => '');
  given('summary', () => '');
  given('linkDescription', () => '');

  const renderSubHeader = () =>
    render(<SubHeader subTitle={given.subTitle} summary={given.summary} linkDescription={given.linkDescription} />);

  context('subTitle이 존재하는 경우', () => {
    given('subTitle', () => '서브타이틀');

    it('서브타이틀을 볼 수 있다.', () => {
      const { getByRole } = renderSubHeader();
      const subTitle = getByRole('heading', { level: 3 });

      expect(subTitle).toHaveTextContent(given.subTitle);
    });
  });
});
