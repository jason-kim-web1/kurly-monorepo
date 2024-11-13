import { fireEvent, render } from '@testing-library/react';

import { ADDRESS_DETAIL_PLACEHOLDER_TEXT } from '../../../constant';

import AdditionalAddress from './AdditionalAddress';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const useRouter = jest.spyOn(require('next/router'), 'useRouter');

const handleChange = jest.fn();
const handleClick = jest.fn();
const push = jest.fn();
const back = jest.fn();

describe('AdditionalAddress', () => {
  useRouter.mockImplementation(() => ({
    push,
    back,
    query: '',
    asPath: '',
    route: '/',
  }));

  given('address', () => null);

  const renderAdditionalAddress = () =>
    render(
      <AdditionalAddress
        address={given.address}
        addressDetail={given.addressDetail}
        onChange={handleChange}
        onClick={handleClick}
      />,
    );

  context('주소지가 있으면', () => {
    given('address', () => '강남구');

    it('주소지를 볼 수 있다', () => {
      const { container } = renderAdditionalAddress();

      expect(container).toHaveTextContent('강남구');
    });
  });

  context('상세 주소지가 있으면', () => {
    given('address', () => '강남구');
    given('addressDetail', () => '서브 주소지');

    it('상세 주소지를 볼 수 있다', () => {
      const { getByPlaceholderText } = renderAdditionalAddress();

      expect(getByPlaceholderText(ADDRESS_DETAIL_PLACEHOLDER_TEXT)).toHaveValue('서브 주소지');
    });
  });

  context('재검색 버튼을 누르면', () => {
    given('address', () => '강남구');
    given('addressDetail', () => '서브 주소지');

    it('onClick 이 실행 된다', () => {
      const { getByText } = renderAdditionalAddress();

      fireEvent.click(getByText('재검색'));

      expect(handleClick).toHaveBeenCalled();
    });
  });

  context('나머지 주소를 입력하면', () => {
    given('address', () => '강남구');
    given('addressDetail', () => '서브 주소지');

    it('입력된 주소로 업데이트 한다', () => {
      const { getByPlaceholderText } = renderAdditionalAddress();

      fireEvent.change(getByPlaceholderText(ADDRESS_DETAIL_PLACEHOLDER_TEXT), {
        target: { name: 'addressDetail', value: '나머지 주소 변경' },
      });

      expect(handleChange).toBeCalledWith(
        expect.objectContaining({
          name: 'addressDetail',
          value: '나머지 주소 변경',
        }),
      );
    });
  });
});
