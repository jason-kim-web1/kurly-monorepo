import { fireEvent, render } from '@testing-library/react';

import Information from './Information';

describe('Information 테스트', () => {
  const onClick = jest.fn();

  const renderInformation = () => render(<Information onClick={onClick} />);

  it('컬리패스 구매하기 버튼을 클릭할 수 있다.', () => {
    const { getByText } = renderInformation();

    fireEvent.click(getByText('컬리패스 구매하기'));

    expect(onClick).toBeCalled();
  });
});
