import { render, screen } from '@testing-library/react';

import Payment from './Payment';

describe.skip('Payment component', () => {
  it('"결제수단" title 을 볼 수 있다.', () => {
    render(<Payment />);

    expect(screen.queryByText('결제수단')).toBeInTheDocument();
    expect(screen.queryByText('신용카드')).toBeInTheDocument();
  });
});
