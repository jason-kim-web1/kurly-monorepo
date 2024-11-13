import { render } from '@testing-library/react';

import OrderEndMessage from './OrderEndMessage';

describe('OrderEndMessage', () => {
  const renderOrderEndMessage = () =>
    render(<OrderEndMessage name={given.userName} displayMessages={given.displayMessages} />);

  context('유저가 주문을 완료하면', () => {
    given('userName', () => 'purpleuser');

    it('주문 완료 문구를 볼 수 있다.', () => {
      const { container } = renderOrderEndMessage();

      expect(container).toHaveTextContent(`${given.userName}님의 주문이 완료되었습니다.`);
    });
  });

  context.each([
    [{ text: '곧 만나요!' }],
    [{ text: '내일 만나요!' }],
    [{ text: '내일 아침에 만나요!' }],
    [{ text: '모레 아침에 만나요!' }],
    [{ text: '주문 폭주로 인하여 모레 아침까지 배송될 예정..' }],
  ])('배송 도착 안내 예정 문구에 따라서', ({ text }) => {
    given('displayMessages', () => [
      {
        deliveryNotice: {
          text,
          basicStyle: {},
          replaceStyles: [],
        },
      },
    ]);

    it(`"${text}" 문구를 볼 수 있다.`, () => {
      const { container } = renderOrderEndMessage();

      expect(container).toHaveTextContent(text);
    });
  });
});
