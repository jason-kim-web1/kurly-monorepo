import { fireEvent, render } from '@testing-library/react';

import Pagination from './Pagination';

describe('Pagination (old type) 테스트', () => {
  given('page', () => 1);
  given('lastPage', () => 10);
  const handleChangePage = jest.fn();

  const renderPagination = () =>
    render(<Pagination page={given.page} lastPage={given.lastPage} onChangePage={handleChangePage} />);

  context('페이지네이션이 랜더링 될때', () => {
    it('이전 페이지로 가는 버튼을 보여준다', () => {
      const { container } = renderPagination();

      expect(container).toHaveTextContent('이전');
    });
    it('첫 페이지로 가는 버튼을 보여준다', () => {
      const { container } = renderPagination();

      expect(container).toHaveTextContent('처음');
    });
    it('다음 페이지로 가는 버튼을 보여준다', () => {
      const { container } = renderPagination();

      expect(container).toHaveTextContent('다음');
    });
    it('마지막 페이지로 가는 버튼을 보여준다', () => {
      const { container } = renderPagination();

      expect(container).toHaveTextContent('마지막');
    });
  });

  context('보여줄 페이지 수가 존재 한다면', () => {
    it('마지막 페이지 수 까지 버튼을 보여준다', () => {
      const { getByText } = renderPagination();
      expect(getByText(given.lastPage)).toBeInTheDocument();
    });
    it('현재 페이지를 강조 해준다', () => {
      const { queryByText } = renderPagination();
      const element = queryByText(given.page);

      expect(element).toBeInTheDocument();
      expect(element).toHaveClass('active');
    });
    it('특정 페이지를 선택하여 이동한다', () => {
      const { queryByText } = renderPagination();
      const element = queryByText(Math.floor(Math.random() * (11 - 1) + 1));

      if (!element) {
        fail('이동할 버튼을 찾을수 없습니다.');
      }

      fireEvent.click(element);
      expect(handleChangePage).toBeCalled();
    });
  });
});
