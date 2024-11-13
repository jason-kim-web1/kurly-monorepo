import { render } from '@testing-library/react';

import AddressBox from './AddressBox';

describe('Address', () => {
  const address = '서울 강남구 테헤란로 133 (한국타이어빌딩) 마켓컬리';

  const renderAddress = () => render(<AddressBox address={address} />);

  it('renders Address', () => {
    const { getByText } = renderAddress();

    expect(getByText('주소')).toBeInTheDocument();
    expect(getByText('서울 강남구 테헤란로 133 (한국타이어빌딩) 마켓컬리')).toBeInTheDocument();
  });
});
