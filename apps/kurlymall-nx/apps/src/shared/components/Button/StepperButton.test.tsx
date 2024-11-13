import { render, fireEvent } from '@testing-library/react';

import StepperButton from './StepperButton';

describe('StepperButton', () => {
  const handleChange = jest.fn();

  given('count', () => 1);
  given('unit', () => 1);
  given('max', () => 999);

  const renderStepperButton = () =>
    render(
      <StepperButton
        count={given.count}
        unit={given.unit}
        minusDisabled={given.minusDisabled}
        plusDisabled={given.plusDisabled}
        onChange={handleChange}
      />,
    );

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders StepperButton', () => {
    const { container } = renderStepperButton();

    expect(container).toHaveTextContent(given.count);
  });

  describe('Clicking minus button', () => {
    context('when count is greater than unit', () => {
      given('count', () => 2);

      it('calls onClickMinus handler with value', () => {
        const { getByLabelText } = renderStepperButton();

        fireEvent.click(getByLabelText('수량내리기'));

        expect(handleChange).toBeCalledWith(given.count - given.unit);
      });
    });

    context('when minus button is disabled', () => {
      given('minusDisabled', () => true);

      it('nothings happen', () => {
        const { getByLabelText } = renderStepperButton();

        fireEvent.click(getByLabelText('수량내리기'));

        expect(handleChange).not.toBeCalled();
      });
    });
  });

  describe('Clicking plus button', () => {
    context('when count is lower than max', () => {
      given('count', () => given.max - 1);

      it('calls onClickPlus handler with value', () => {
        const { getByLabelText } = renderStepperButton();

        fireEvent.click(getByLabelText('수량올리기'));

        expect(handleChange).toBeCalledWith(given.count + given.unit);
      });
    });

    context('when plus button is disabled', () => {
      given('plusDisabled', () => true);

      it('nothings happen', () => {
        const { getByLabelText } = renderStepperButton();

        fireEvent.click(getByLabelText('수량올리기'));

        expect(handleChange).not.toBeCalled();
      });
    });
  });
});
