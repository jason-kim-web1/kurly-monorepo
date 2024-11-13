import { fireEvent, render } from '@testing-library/react';
import configureStore, { MockStoreEnhanced } from 'redux-mock-store';
import { useSelector } from 'react-redux';
import { getDefaultMiddleware } from '@reduxjs/toolkit';

import Address from './Address';

const handleClick = jest.fn();
jest.mock('react-redux');

const mockStore = configureStore(getDefaultMiddleware());
describe('Address', () => {
  let store: MockStoreEnhanced<unknown>;

  given('receiverForm', () => undefined);
  given('isDirectCheckout', () => false);

  beforeEach(() => {
    store = mockStore(() => ({
      checkout: {
        isDirectCheckout: given.isDirectCheckout,
      },
    }));
    (useSelector as jest.Mock).mockImplementation((selector) => selector(store.getState()));
  });

  const renderAddress = () => render(<Address receiverForm={given.receiverForm} onClick={handleClick} />);

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

  context('상세주소가 없으면', () => {
    given('receiverForm', () => ({
      address: '강남구',
      addressDetail: '',
      deliveryType: 'direct',
      policies: null,
    }));

    it('상세주소를 입력해주세요 를 볼 수 있다.', () => {
      const { container } = renderAddress();

      expect(container).toHaveTextContent('상세주소를 입력해주세요');
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

  context('바로구매 상품이라면', () => {
    given('receiverForm', () => ({
      address: '강남구',
      addressDetail: '15층',
      isDefaultAddress: true,
      deliveryType: 'direct',
      policies: null,
    }));
    given('isDirectCheckout', () => true);

    it('주소지 변경 버튼을 볼 수 없다', () => {
      const { container } = renderAddress();

      expect(container).not.toHaveTextContent('변경');
    });
  });

  context('바로구매 상품이 아니라면', () => {
    given('receiverForm', () => ({
      address: '강남구',
      addressDetail: '15층',
      isDefaultAddress: true,
      deliveryType: 'direct',
      policies: null,
    }));
    given('isDirectCheckout', () => false);

    it('주소지 변경 버튼을 볼 수 있다', () => {
      const { container } = renderAddress();

      expect(container).toHaveTextContent('변경');
    });
  });

  context('주소지 변경 버튼을 클릭하면', () => {
    given('receiverForm', () => ({
      address: '강남구',
      addressDetail: '15층',
      isDefaultAddress: true,
      deliveryType: 'direct',
      policies: null,
    }));
    given('isDirectCheckout', () => false);

    it('onClick 핸들러가 호출된다.', () => {
      const { getByText } = renderAddress();

      const button = getByText('변경');
      fireEvent.click(button);

      expect(handleClick).toBeCalled();
    });
  });
});
