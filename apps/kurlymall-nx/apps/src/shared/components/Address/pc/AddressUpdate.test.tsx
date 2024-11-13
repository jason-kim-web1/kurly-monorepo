import { fireEvent, render } from '@testing-library/react';

import { useRouter } from 'next/router';

import {
  ADDRESS_DETAIL_PLACEHOLDER_TEXT,
  ADDRESS_MOBILE_PLACEHOLDER_TEXT,
  NAME_PLACEHOLDER_TEXT,
} from '../../../constant';

import AddressUpdate from './AddressUpdate';
import Loading from '../../Loading/Loading';

const handleChange = jest.fn();
const handleClickSave = jest.fn();
const handleClickDelete = jest.fn();
const mock = {
  no: 3303127,
  type: 'default',
  baseAddressType: 'jibun',
  name: '김컬리',
  mobile: '010-1234-1235',
  zipcode: '143-112',
  address: '지번 주소',
  addressDetail: '스타빌라 202호',
  roadZoneCode: '01238',
  roadAddress: '도로명 주소',
  deliveryPolicy: 'direct',
  deliveryType: 'direct',
  regionCode: 'AA',
};

jest.mock('../../Loading/Loading');
jest.mock('next/router');

describe('AddressUpdate', () => {
  given('loading', () => false);
  given('selectedAddress', () => mock);

  const renderAddressUpdate = () =>
    render(
      <AddressUpdate
        loading={given.loading}
        selectedAddress={given.selectedAddress}
        onChange={handleChange}
        onClickSave={handleClickSave}
        onClickDelete={handleClickDelete}
      />,
    );

  beforeEach(() => {
    (Loading as jest.Mock).mockImplementation(() => <div data-testid="loading" />);
    (useRouter as jest.Mock).mockImplementation(() => ({
      query: {
        addressNo: 3303127,
        isMypage: '',
      },
    }));
  });

  it('나머지 주소를 입력할 수 있는 인풋을 볼 수 있다.', () => {
    const { getByPlaceholderText } = renderAddressUpdate();

    expect(getByPlaceholderText(ADDRESS_DETAIL_PLACEHOLDER_TEXT)).toBeInTheDocument();
  });

  it('받으실 분을 입력할 수 있는 인풋을 볼 수 있다.', () => {
    const { getByPlaceholderText } = renderAddressUpdate();

    expect(getByPlaceholderText(NAME_PLACEHOLDER_TEXT)).toBeInTheDocument();
  });

  it('휴대폰을 입력할 수 있는 인풋을 볼 수 있다.', () => {
    const { getByPlaceholderText } = renderAddressUpdate();

    expect(getByPlaceholderText(ADDRESS_MOBILE_PLACEHOLDER_TEXT)).toBeInTheDocument();
  });

  it('저장 버튼을 볼 수 있다.', () => {
    const { container } = renderAddressUpdate();

    expect(container).toHaveTextContent('저장');
  });

  context('로딩 중이면', () => {
    given('loading', () => true);

    it('로딩 컴포넌트를 볼 수 있다', () => {
      const { getByTestId } = renderAddressUpdate();

      expect(getByTestId('loading')).toBeInTheDocument();
    });
  });

  context('주소지 타입이 지번이면', () => {
    given('selectedAddress', () => ({
      ...mock,
      baseAddressType: 'jibun',
    }));

    it('지번 주소를 볼 수 있다.', () => {
      const { container } = renderAddressUpdate();

      expect(container).toHaveTextContent('지번 주소');
    });
  });

  context('주소지 타입이 도로명이면', () => {
    given('selectedAddress', () => ({
      ...mock,
      baseAddressType: 'road',
    }));

    it('도로명 주소를 볼 수 있다.', () => {
      const { container } = renderAddressUpdate();

      expect(container).toHaveTextContent('도로명 주소');
    });
  });

  context('기존 주소지를 확인 후 변경하고 싶으면', () => {
    it('나머지 주소를 변경할 수 있다.', () => {
      const { getByPlaceholderText } = renderAddressUpdate();

      fireEvent.change(getByPlaceholderText(ADDRESS_DETAIL_PLACEHOLDER_TEXT), {
        target: { name: 'addressDetail', value: '나머지 주소' },
      });

      expect(handleChange).toBeCalledWith({
        name: 'addressDetail',
        value: '나머지 주소',
      });
    });

    it('받으실 분 이름을 변경할 수 있다.', () => {
      const { getByPlaceholderText } = renderAddressUpdate();

      fireEvent.change(getByPlaceholderText(NAME_PLACEHOLDER_TEXT), {
        target: { name: 'name', value: '이름 변경' },
      });

      expect(handleChange).toBeCalled();
    });

    it('휴대폰 번호를 변경할 수 있다.', () => {
      const { getByPlaceholderText } = renderAddressUpdate();

      fireEvent.change(getByPlaceholderText(ADDRESS_MOBILE_PLACEHOLDER_TEXT), {
        target: { name: 'mobile', value: '01012345678' },
      });

      expect(handleChange).toBeCalled();
    });

    it('저장 버튼을 클릭할 수 있다.', () => {
      const { getByText } = renderAddressUpdate();

      fireEvent.click(getByText('저장'));

      expect(handleClickSave).toBeCalled();
    });
  });

  context('선택한 주소지가 기본 주소지면', () => {
    given('selectedAddress', () => ({
      ...mock,
      type: 'default',
    }));

    it('기본 배송지로 저장 체크박스를 볼 수 없다.', () => {
      const { container } = renderAddressUpdate();

      expect(container).not.toHaveTextContent('기본 배송지로 저장');
    });

    it('삭제 버튼을 볼 수 없다.', () => {
      const { container } = renderAddressUpdate();

      expect(container).not.toHaveTextContent('삭제');
    });
  });

  context('선택한 주소지가 기본 주소지가 아니면', () => {
    given('selectedAddress', () => ({
      ...mock,
      type: 'recent',
    }));

    it('기본 배송지로 저장 체크박스를 볼 수 있다.', () => {
      const { container } = renderAddressUpdate();

      expect(container).toHaveTextContent('기본 배송지로 저장');
    });

    it('삭제 버튼을 클릭할 수 있다.', () => {
      const { getByText } = renderAddressUpdate();

      fireEvent.click(getByText('삭제'));

      expect(handleClickDelete).toBeCalledWith(3303127, '');
    });
  });
});
