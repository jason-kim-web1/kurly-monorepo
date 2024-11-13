import { render } from '@testing-library/react';

import PointMessage from './PointMessage';

describe('PointMessage 테스트', () => {
  given('message', () => '메세지');

  const renderPointMessage = () => render(<PointMessage message={given.message} />);

  it('메세지를 볼 수 있다', () => {
    const { container } = renderPointMessage();

    expect(container).toHaveTextContent(given.message);
  });
});
