import { render } from '@testing-library/react';

import { MainQuickMenuCard } from './MainQuickMenuCard';

describe('MainQuickMenuCard', () => {
  given('title', () => '');
  given('imageUrl', () => '');
  given('lottieUrl', () => '');
  given('lottieLoop', () => null);
  given('isNew', () => false);

  const renderMainQuickMenuCard = () =>
    render(
      <MainQuickMenuCard
        title={given.title}
        imageUrl={given.imageUrl}
        lottieUrl={given.lottieUrl}
        lottieLoop={given.lottieLoop}
        isNew={given.isNew}
      />,
    );

  context('title이 있으면', () => {
    given('title', () => '테스트 제목');
    it('title이 노출되어야 한다.', () => {
      const { getByText } = renderMainQuickMenuCard();
      expect(getByText('테스트 제목')).toBeInTheDocument();
    });
  });

  context('isNew가 참이면', () => {
    given('isNew', () => true);
    it('N뱃지가 노출되어야 한다.', () => {
      const { getByTestId } = renderMainQuickMenuCard();
      expect(getByTestId('new-badge-circle')).toBeInTheDocument();
    });
  });
});
