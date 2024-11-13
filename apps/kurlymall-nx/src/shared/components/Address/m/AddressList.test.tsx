import { render } from '@testing-library/react';

import AddressList from './AddressList';
import Loading from '../../Loading/Loading';

const handleChecked = jest.fn();
const handleUpdate = jest.fn();

jest.mock('../../Loading/Loading');

describe('AddressListMobile', () => {
  const renderAddressList = () =>
    render(
      <AddressList
        loading={given.loading}
        list={given.list}
        handleChecked={handleChecked}
        handleUpdate={handleUpdate}
      />,
    );

  beforeEach(() => {
    (Loading as jest.Mock).mockImplementation(() => <div data-testid="loading" />);
  });

  context('로딩 중이면', () => {
    given('loading', () => true);
    it('로딩 컴포넌트를 볼 수 있다', () => {
      const { getByTestId } = renderAddressList();

      expect(getByTestId('loading')).toBeInTheDocument();
    });
  });

  context('주소지 리스트가 없으면', () => {
    given('loading', () => false);
    given('list', () => []);

    it('"상품 구매를 위한 배송지를 설정해주세요"를 볼 수 있다.', () => {
      const { container } = renderAddressList();

      expect(container).toHaveTextContent('상품 구매를 위한 배송지를 설정해주세요');
    });
  });

  context('주소지 리스트가 있으면', () => {
    given('list', () => [
      {
        name: '이름',
        mobile: '01012345678',
        address: '강남구',
        addressDetail: '컬리',
        deliveryType: 'direct',
        baseAddressType: 'jibun',
      },
    ]);
    it('주소지를 볼 수 있다.', () => {
      const { container } = renderAddressList();

      expect(container).toHaveTextContent('강남구 컬리');
    });
  });
});
