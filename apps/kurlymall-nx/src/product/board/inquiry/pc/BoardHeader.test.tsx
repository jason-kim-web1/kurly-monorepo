import { render } from '@testing-library/react';

import BoardHeader from './BoardHeader';

describe('BoardHeader', () => {
  const renderBoardHeader = () => render(<BoardHeader />);

  it('render title', () => {
    const { container } = renderBoardHeader();

    expect(container).toHaveTextContent('상품 문의');
  });
});
