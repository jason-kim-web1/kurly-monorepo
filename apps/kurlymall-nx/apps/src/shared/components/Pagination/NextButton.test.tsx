import { render, fireEvent } from '@testing-library/react';

import NextButton from './NextButton';

describe('NextButton', () => {
  const handleClick = jest.fn();

  const renderNextButton = () => render(<NextButton disabled={given.disabled} onClick={handleClick} />);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  context('with enabled', () => {
    given('disabled', () => false);

    it('calls onClick handler', () => {
      const { getByRole } = renderNextButton();

      fireEvent.click(getByRole('button'));

      expect(handleClick).toBeCalled();
    });
  });

  context('with disabled', () => {
    given('disabled', () => true);

    it('calls nothing', () => {
      const { getByRole } = renderNextButton();

      fireEvent.click(getByRole('button'));

      expect(handleClick).not.toBeCalled();
    });
  });
});
