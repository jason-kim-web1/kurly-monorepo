import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Stepper from './Stepper';

const handleChangeQuantity = jest.fn();

describe('Stepper', () => {
  afterEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });

  context('- 아이콘을 클릭하면', () => {
    it('(현재수량 - 판매단위) 인자로 onClick 이벤트를 호출한다.', () => {
      const quantity = 5;
      const unit = 2;

      render(<Stepper quantity={quantity} unit={unit} onChangeQuantity={handleChangeQuantity} />);

      const minusIcon = screen.getByTestId('stepper-button-minus');

      userEvent.click(minusIcon);

      expect(handleChangeQuantity).toBeCalledWith(quantity - unit);
    });
  });

  context('minusDisabled 가 true 면', () => {
    it('- 아이콘을 클릭해도 onClick 이벤트가 호출되지 않는다.', () => {
      const quantity = 1;
      const unit = 1;
      const minQuantity = 1;

      render(
        <Stepper
          quantity={quantity}
          unit={unit}
          onChangeQuantity={handleChangeQuantity}
          minusDisabled={quantity <= minQuantity}
        />,
      );

      const minusIcon = screen.getByTestId('stepper-button-minus');

      userEvent.click(minusIcon);

      expect(handleChangeQuantity).not.toBeCalled();
    });
  });

  context('+ 아이콘을 클릭하면', () => {
    it('(현재수량 + 판매단위) 인자로 onClick 이벤트를 호출한다.', () => {
      const quantity = 5;
      const unit = 2;

      render(<Stepper quantity={quantity} unit={unit} onChangeQuantity={handleChangeQuantity} />);

      const plusIcon = screen.getByTestId('stepper-button-plus');

      userEvent.click(plusIcon);

      expect(handleChangeQuantity).toBeCalledWith(quantity + unit);
    });
  });

  context('plusDisabled 가 true 면', () => {
    it('+ 아이콘을 클릭해도 onClick 이벤트가 호출되지 않는다.', () => {
      const quantity = 1;
      const unit = 1;

      render(<Stepper quantity={quantity} unit={unit} onChangeQuantity={handleChangeQuantity} plusDisabled={true} />);

      const plusIcon = screen.getByTestId('stepper-button-plus');

      userEvent.click(plusIcon);

      expect(handleChangeQuantity).not.toBeCalled();
    });
  });
});
