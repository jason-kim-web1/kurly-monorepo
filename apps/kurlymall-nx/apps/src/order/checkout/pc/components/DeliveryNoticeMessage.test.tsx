import { render } from '@testing-library/react';

import DeliveryNoticeMessage from './DeliveryNoticeMessage';

describe('DeliveryNoticeMessage component', () => {
  context('배송 안내 메세지가 있으면', () => {
    it('배송 안내 메세지를 볼 수 있다.', () => {
      const { container } = render(<DeliveryNoticeMessage message="test" />);

      expect(container).toHaveTextContent('test');
    });
  });

  context('배송 안내 메세지가 없으면', () => {
    it('아무것도 보이지 않는다.', () => {
      const { container } = render(<DeliveryNoticeMessage message="" />);

      expect(container).toBeEmptyDOMElement();
    });
  });
});
