import { fireEvent, render } from '@testing-library/react';

import COLOR from '../../../../shared/constant/colorset';

import PaymentMethodCategoryButton from './PaymentMethodCategoryButton';

describe('PaymentMethodCategoryButton', () => {
  const handleClick = jest.fn();

  given('active', () => false);
  given('color', () => undefined);
  given('hasEvent', () => false);

  const renderPaymentMethodCategoryButton = () =>
    render(
      <PaymentMethodCategoryButton
        testId="test-id"
        active={given.active}
        color={given.color}
        hasEvent={given.hasEvent}
        onClick={handleClick}
      />,
    );

  context('기본 상태는', () => {
    it('배경 색이 없다.', () => {
      const { getByTestId } = renderPaymentMethodCategoryButton();

      const button = getByTestId('test-id');

      expect(button).not.toHaveStyle(`background-color: ${COLOR.kakaoBg};`);
    });
  });

  context('활성화 되면', () => {
    given('active', () => true);
    given('color', () => COLOR.kakaoBg);

    it('배경색이 바뀐다.', () => {
      const { getByTestId } = renderPaymentMethodCategoryButton();

      const button = getByTestId('test-id');

      expect(button).toHaveStyle(`background-color: ${COLOR.kakaoBg};`);
    });
  });

  context('이벤트가 있으면', () => {
    given('hasEvent', () => true);

    it('혜택 아이콘을 볼 수 있다.', () => {
      const { container } = renderPaymentMethodCategoryButton();

      expect(container).toHaveTextContent('혜택');
    });
  });

  context('클릭하면', () => {
    it('handleClick 을 호출한다.', () => {
      const { getByTestId } = renderPaymentMethodCategoryButton();

      const button = getByTestId('test-id');

      fireEvent.click(button);

      expect(handleClick).toBeCalled();
    });
  });
});
