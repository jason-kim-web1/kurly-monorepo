import { fireEvent, render } from '@testing-library/react';

import AddressResult from './AddressResult';
import Loading from '../../Loading/Loading';

const handleChangeAddress = jest.fn();
const handleClickAddress = jest.fn();
const handleClick = jest.fn();

const mock = {
  address: '강남구',
  addressDetail: '',
  deliveryType: 'direct',
};

jest.mock('../../Loading/Loading');

describe('AddressResult', () => {
  given('loading', () => false);
  given('isGuest', () => false);
  given('searchAddressResult', () => null);
  given('isEmptyAddress', () => false);

  const renderAddressResult = () =>
    render(
      <AddressResult
        loading={given.loading}
        isGuest={given.isGuest}
        isEmptyAddress={given.isEmptyAddress}
        searchAddressResult={given.searchAddressResult}
        onChangeAddress={handleChangeAddress}
        onClickAddress={handleClickAddress}
        onClick={handleClick}
      />,
    );

  beforeEach(() => {
    (Loading as jest.Mock).mockImplementation(() => <div data-testid="loading" />);
  });

  context('로딩 중이면', () => {
    given('loading', () => true);

    it('로딩 컴포넌트를 볼 수 있다', () => {
      const { getByTestId } = renderAddressResult();

      expect(getByTestId('loading')).toBeInTheDocument();
    });
  });

  context('비회원이면', () => {
    given('isGuest', () => true);
    given('searchAddressResult', () => mock);

    it('비로그인 배송지 문구를 볼 수 있다.', () => {
      const { container } = renderAddressResult();

      expect(container).toHaveTextContent(
        '※ 저장된 배송지는 최대 7일 간 임시 저장 후 자동 삭제됩니다.로그인 할 경우, 회원님의 배송지 목록에 추가됩니다.',
      );
    });
  });

  context('회원이면', () => {
    given('isGuest', () => false);
    given('searchAddressResult', () => mock);
    given('isEmptyAddress', () => false);

    it('기본 배송지로 저장 체크박스를 볼 수 있다.', () => {
      const { getByLabelText } = renderAddressResult();

      expect(getByLabelText('기본 배송지로 저장')).toBeInTheDocument();
    });

    it('기본 배송지로 저장 체크박스를 클릭할 수 있다.', async () => {
      const { getByRole } = renderAddressResult();

      expect(getByRole('checkbox')).not.toBeChecked();

      fireEvent.click(getByRole('checkbox'));

      expect(getByRole('checkbox')).toBeChecked();
    });

    it('재검색 버튼을 클릭할 수 있다.', () => {
      const { getByRole } = renderAddressResult();

      fireEvent.click(getByRole('button', { name: '재검색' }));
      expect(handleClickAddress).toBeCalled();
    });

    it('저장 버튼을 클릭할 수 있다.', () => {
      const { getByRole } = renderAddressResult();

      fireEvent.click(getByRole('button', { name: '저장' }));
      expect(handleClick).toBeCalled();
    });
  });

  context('샛별 배송이면', () => {
    given('isGuest', () => false);
    given('searchAddressResult', () => mock);

    it('샛별 배송 불가 지역을 볼 수 있다.', () => {
      const { container } = renderAddressResult();

      expect(container).toHaveTextContent('샛별배송 지역입니다');
    });
  });

  context('샛별 배송 지역이 아니면', () => {
    given('isGuest', () => false);
    given('searchAddressResult', () => ({
      address: '대전',
      addressDetail: '',
      deliveryType: 'indirect',
    }));

    it('샛별 배송 불가 지역을 볼 수 없다.', () => {
      const { container } = renderAddressResult();

      expect(container).not.toHaveTextContent('샛별배송 지역입니다');
    });
  });

  context('처음 배송지를 등록하는 회원이면', () => {
    given('isGuest', () => false);
    given('searchAddressResult', () => mock);
    given('isEmptyAddress', () => true);

    it('기본 배송지로 저장 체크박스를 볼 수 없다.', () => {
      const { container } = renderAddressResult();

      expect(container).not.toHaveTextContent('기본 배송지로 저장');
    });
  });

  context('처음 배송지를 등록하는 회원이 아니면', () => {
    given('isGuest', () => false);
    given('searchAddressResult', () => mock);
    given('isEmptyAddress', () => false);

    it('기본 배송지로 저장 체크박스를 볼 수 있다.', () => {
      const { getByLabelText } = renderAddressResult();

      expect(getByLabelText('기본 배송지로 저장')).toBeInTheDocument();
    });
  });
});
