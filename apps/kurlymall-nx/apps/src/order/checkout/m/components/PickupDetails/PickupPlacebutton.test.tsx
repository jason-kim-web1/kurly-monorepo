import { fireEvent, render } from '@testing-library/react';

import PickupPlaceButton from './PickupPlaceButton';

describe('PickupPlaceButton', () => {
  const handleClick = jest.fn();

  const renderPickupPlaceButton = () => render(<PickupPlaceButton onClick={handleClick} />);

  it('픽업매장 선택 문구를 볼 수 있다.', () => {
    const { container } = renderPickupPlaceButton();

    expect(container).toHaveTextContent('픽업매장 선택');
  });

  it('버튼을 누르면 handleClick 이 호출된다.', () => {
    const { getByText } = renderPickupPlaceButton();

    fireEvent.click(getByText('픽업매장 선택'));

    expect(handleClick).toBeCalled();
  });
});
