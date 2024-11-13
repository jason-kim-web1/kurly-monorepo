import { render, fireEvent } from '@testing-library/react';

import Pagination from './Pagination';

describe('Pagination', () => {
  const handleClickPrevious = jest.fn();
  const handleClickNext = jest.fn();

  const renderPagination = ({ previousEnable, nextEnable }: { previousEnable: boolean; nextEnable: boolean }) =>
    render(
      <Pagination
        previousEnable={previousEnable}
        nextEnable={nextEnable}
        onClickPrevious={handleClickPrevious}
        onClickNext={handleClickNext}
      />,
    );

  beforeEach(() => {
    jest.clearAllMocks();
  });

  context('when enabled', () => {
    it('calls handler', () => {
      const { getAllByRole } = renderPagination({
        previousEnable: true,
        nextEnable: true,
      });

      const [previousButton, nextButton] = getAllByRole('button');

      fireEvent.click(previousButton);
      fireEvent.click(nextButton);

      expect(handleClickPrevious).toBeCalled();
      expect(handleClickNext).toBeCalled();
    });
  });

  context('when disabled', () => {
    it('calls nothing', () => {
      const { getAllByRole } = renderPagination({
        previousEnable: false,
        nextEnable: false,
      });

      const [previousButton, nextButton] = getAllByRole('button');

      fireEvent.click(previousButton);
      fireEvent.click(nextButton);

      expect(handleClickPrevious).not.toBeCalled();
      expect(handleClickNext).not.toBeCalled();
    });
  });
});
