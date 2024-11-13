import { fireEvent, render } from '@testing-library/react';

import InquiryFunctions from './InquiryFunctions';

describe('InquiryFunctions', () => {
  const handleClickUpdate = jest.fn();
  const handleClickDelete = jest.fn();

  const renderInquiryFunctions = () =>
    render(<InquiryFunctions onClickUpdate={handleClickUpdate} onClickDelete={handleClickDelete} />);

  describe('Clicking buttons', () => {
    it('calls handler', () => {
      const { getByText } = renderInquiryFunctions();

      fireEvent.click(getByText('수정'));
      fireEvent.click(getByText('삭제'));

      expect(handleClickUpdate).toBeCalled();
      expect(handleClickDelete).toBeCalled();
    });
  });
});
