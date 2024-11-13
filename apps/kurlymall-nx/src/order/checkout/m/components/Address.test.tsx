import { render } from '@testing-library/react';

import Address from './Address';

describe('Address', () => {
  given('receiverForm', () => undefined);

  const renderAddress = () => render(<Address receiverForm={given.receiverForm} />);

  context('배송지가 있으면', () => {
    given('receiverForm', () => ({
      address: '강남구',
      addressDetail: '컬리',
      deliveryType: 'direct',
      policies: null,
    }));

    it('주소를 볼 수 있다.', () => {
      const { container } = renderAddress();

      const { address, addressDetail } = given.receiverForm;
      expect(container).toHaveTextContent(`${address} ${addressDetail}`);
    });
  });

  context('배송지가 기본 배송지이면', () => {
    given('receiverForm', () => ({
      address: '강남구',
      isDefaultAddress: true,
      deliveryType: 'direct',
      policies: null,
    }));

    it('기본배송지를 볼 수 있다.', () => {
      const { container } = renderAddress();

      expect(container).toHaveTextContent('기본배송지');
    });
  });
});
