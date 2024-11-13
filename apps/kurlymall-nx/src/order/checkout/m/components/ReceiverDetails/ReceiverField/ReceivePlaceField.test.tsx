import { fireEvent, render } from '@testing-library/react';

import { ReceivePlace } from '../../../../../../shared/enums';

import ReceivePlaceField from './ReceivePlaceField';

describe('ReceivePlaceField 테스트', () => {
  const handleChange = jest.fn();

  given('selectedValue', () => ReceivePlace.DOOR);

  const renderReceivePlaceField = () =>
    render(<ReceivePlaceField onChange={handleChange} selectedValue={given.selectedValue} />);

  context('샛별 지역이면', () => {
    it('문 앞, 기타 장소를 볼 수 있다.', () => {
      const { getByLabelText } = renderReceivePlaceField();

      expect(getByLabelText('문 앞')).toBeInTheDocument();
      expect(getByLabelText('기타 장소')).toBeInTheDocument();
    });
  });

  context('장소를 선택하면', () => {
    it('handleChange 함수가 호출된다.', () => {
      const { getByLabelText } = renderReceivePlaceField();

      fireEvent.click(getByLabelText('기타 장소'));

      expect(handleChange).toBeCalledWith(
        expect.objectContaining({
          name: 'receivePlace',
          value: ReceivePlace.ETC,
        }),
      );
    });
  });
});
