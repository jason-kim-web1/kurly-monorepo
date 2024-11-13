import { render } from '@testing-library/react';

import UserGuideItem from './UserGuideItem';
import { memberIcon } from '../../shared/images';

describe('이용안내 사용자 가이드(UserGuideItem) 렌더링을 테스트합니다.', () => {
  given('title', () => '회원 / 혜택');
  given('iconSrc', () => memberIcon);
  given('iconAltText', () => '회원 아이콘 이미지');
  given('content', () => '컬리에 회원가입을 하시면');
  given('description', () => '');

  const renderUserGuideItems = () =>
    render(
      <UserGuideItem
        title={given.title}
        iconSrc={given.iconSrc}
        iconAltText={given.iconAltText}
        content={given.content}
        description={given.description}
      />,
    );

  it('제목을 보여줍니다.', () => {
    const { container, getByText } = renderUserGuideItems();
    const content = getByText(given.content);

    expect(content).toBeInTheDocument();
    expect(container).toHaveTextContent('회원 / 혜택');
  });

  context('아이콘이 있다면,', () => {
    it('아이콘을 보여줍니다.', () => {
      const { getByAltText } = renderUserGuideItems();
      const icon = getByAltText(given.iconAltText);

      expect(icon).toHaveAttribute('src', given.iconSrc);
      expect(icon).toHaveAttribute('alt', given.iconAltText);
    });
  });

  it('내용을 보여줍니다.', () => {
    const { container, getByText } = renderUserGuideItems();
    const content = getByText(given.content);

    expect(content).toBeInTheDocument();
    expect(container).toHaveTextContent(given.content);
  });

  context('추가 설명이 있다면,', () => {
    given('description', () => '비회원 주문인 경우');

    it('추가 설명을 보여줍니다.', () => {
      const { container } = renderUserGuideItems();
      expect(container).toHaveTextContent(given.description);
    });
  });
});
