import { render } from '@testing-library/react';

import Information from './Information';

describe('Information 테스트', () => {
  const renderInformation = () => render(<Information message={given.message} />);

  given('message', () => undefined);

  context('메세지가 있으면', () => {
    given('message', () => undefined);

    it('내용을 볼 수 없다.', () => {
      const { container } = renderInformation();

      expect(container).not.toHaveTextContent(given.message);
    });
  });

  context('메세지가 있으면', () => {
    given('message', () => '메세지메세지');

    it('내용을 보여준다.', () => {
      const { container } = renderInformation();

      expect(container).toHaveTextContent(given.message);
    });
  });
});
