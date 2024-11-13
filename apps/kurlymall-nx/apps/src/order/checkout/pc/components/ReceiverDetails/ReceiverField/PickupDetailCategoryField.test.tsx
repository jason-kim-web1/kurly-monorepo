import { fireEvent, render } from '@testing-library/react';

import PickupDetailCategoryField from './PickupDetailCategoryField';
import { PickupDetailCategory } from '../../../../../../shared/enums';
import { PickupDetailCategoryTextMap } from '../../../../../../shared/constant';

describe('PickupDetailCategoryField', () => {
  const handleChange = jest.fn();

  given('pickupDetailCategory', () => PickupDetailCategory.ETC);
  given('pickupDetail', () => '');

  const renderPickupDetailCategoryField = () =>
    render(
      <PickupDetailCategoryField
        onChange={handleChange}
        pickupDetailCategory={given.pickupDetailCategory}
        pickupDetail={given.pickupDetail}
      />,
    );

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('기타장소 세부사항을 선택할 수 있는 버튼을 볼 수 있다', () => {
    const { getByLabelText } = renderPickupDetailCategoryField();

    expect(getByLabelText(PickupDetailCategoryTextMap.ETC)).toBeInTheDocument();
    expect(getByLabelText(PickupDetailCategoryTextMap.PICKUP_BOX)).toBeInTheDocument();
    expect(getByLabelText(PickupDetailCategoryTextMap.FRONT_OF_ENTRANCE)).toBeInTheDocument();
  });

  context('"기타" 를 선택 했을 때', () => {
    given('pickupDetailCategory', () => PickupDetailCategory.ETC);

    it('기타 정보를 입력할 수 있는 입력창을 볼 수 있다.', () => {
      const { getByLabelText, getByPlaceholderText } = renderPickupDetailCategoryField();

      fireEvent.click(getByLabelText(PickupDetailCategoryTextMap.ETC));

      expect(getByPlaceholderText(/예 : 계단 밑, 주택단지 앞 경비초소를 지나 A동 출입구/)).toBeInTheDocument();
    });

    it('입력 요소에 글자를 입력하면 handleChange 함수가 실행된다', () => {
      const { getByPlaceholderText } = renderPickupDetailCategoryField();

      fireEvent.change(getByPlaceholderText(/예 : 계단 밑, 주택단지 앞 경비초소를 지나 A동 출입구/), {
        target: { value: '1234' },
      });

      expect(handleChange).toBeCalledWith(
        expect.objectContaining({
          name: 'pickupDetail',
          value: '1234',
        }),
      );
    });

    context('pickupDetail 값이 있다면', () => {
      given('pickupDetail', () => '1234');

      it('해당 값이 입력되어 있다', () => {
        const { getByPlaceholderText } = renderPickupDetailCategoryField();

        const input = getByPlaceholderText(/예 : 계단 밑, 주택단지 앞 경비초소를 지나 A동 출입구/);

        expect(input).toHaveValue('1234');
      });
    });
  });

  context('"택배 수령실" 를 선택 했을 때', () => {
    given('pickupDetailCategory', () => PickupDetailCategory.PICKUP_BOX);

    it('택배 수령 장소를 입력할 수 있는 입력창을 볼 수 있다.', () => {
      const { getByLabelText, getByPlaceholderText } = renderPickupDetailCategoryField();

      fireEvent.click(getByLabelText(PickupDetailCategoryTextMap.PICKUP_BOX));

      expect(getByPlaceholderText(/예 : 1층 출입구 오른쪽 택배수령실에 배송해주세요./)).toBeInTheDocument();
    });

    it('입력 요소에 글자를 입력하면 handleChange 함수가 실행된다', () => {
      const { getByPlaceholderText } = renderPickupDetailCategoryField();

      fireEvent.change(getByPlaceholderText(/예 : 1층 출입구 오른쪽 택배수령실에 배송해주세요./), {
        target: { value: '1234' },
      });

      expect(handleChange).toBeCalledWith(
        expect.objectContaining({
          name: 'pickupDetail',
          value: '1234',
        }),
      );
    });

    context('pickupDetail 값이 있다면', () => {
      given('pickupDetail', () => '1234');

      it('해당 값이 입력되어 있다', () => {
        const { getByPlaceholderText } = renderPickupDetailCategoryField();

        const input = getByPlaceholderText(/예 : 1층 출입구 오른쪽 택배수령실에 배송해주세요./);

        expect(input).toHaveValue('1234');
      });
    });
  });
});
