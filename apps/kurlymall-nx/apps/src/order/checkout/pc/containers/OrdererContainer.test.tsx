import { render } from '@testing-library/react';

import OrdererContainer from './OrdererContainer';
import useCheckoutOrderer from '../../shared/hooks/useCheckoutOrderer';

jest.mock('../../shared/hooks/useCheckoutOrderer');

describe('OrdererContainer', () => {
  given('useCheckoutOrdererResponse', () => ({
    isLoading: false,
    receiverInfo: {
      name: '',
      email: '',
      phone: '',
    },
  }));

  const renderOrdererContainer = () => render(<OrdererContainer />);

  beforeEach(() => {
    (useCheckoutOrderer as jest.Mock).mockImplementation(() => given.useCheckoutOrdererResponse);
  });

  context('로딩 중 이면', () => {
    given('useCheckoutOrdererResponse', () => ({
      isLoading: true,
      data: undefined,
    }));

    it('주문자 정보 내용을 볼 수 없다.', () => {
      const { container } = renderOrdererContainer();

      expect(container).not.toHaveTextContent('보내는 분');
      expect(container).not.toHaveTextContent('휴대폰');
      expect(container).not.toHaveTextContent('이메일');
    });
  });

  context('로딩이 끝났고, receiverInfo 정보가 있으면', () => {
    given('useCheckoutOrdererResponse', () => ({
      isLoading: false,
      data: {
        name: '이름',
        phone: '010-1234-5678',
        email: 'member@kurlycorp.com',
      },
    }));

    it('주문자 정보를 볼 수 있다.', () => {
      const { container } = renderOrdererContainer();
      const { name, phone, email } = given.useCheckoutOrdererResponse.data;

      expect(container).toHaveTextContent('보내는 분');
      expect(container).toHaveTextContent(name);
      expect(container).toHaveTextContent('휴대폰');
      expect(container).toHaveTextContent(phone);
      expect(container).toHaveTextContent('이메일');
      expect(container).toHaveTextContent(email);
    });
  });
});
