import { render, fireEvent } from '@testing-library/react';

import PreviousButton from './PreviousButton';

describe('PreviousButton', () => {
  const handleClick = jest.fn();

  const renderPreviousButton = () => render(<PreviousButton disabled={given.disabled} onClick={handleClick} />);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  context('with enabled', () => {
    given('disabled', () => false);

    it('calls onClick handler', () => {
      const { getByRole } = renderPreviousButton();

      fireEvent.click(getByRole('button'));

      expect(handleClick).toBeCalled();
    });
  });

  context('with disabled', () => {
    given('disabled', () => true);

    it('calls nothing', () => {
      const { getByRole } = renderPreviousButton();

      fireEvent.click(getByRole('button'));

      expect(handleClick).not.toBeCalled();
    });
  });
});
