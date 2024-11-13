import { screen, render } from '@testing-library/react';

import KurlypayErrorButton from './KurlypayErrorButton';

describe('KurlypayErrorButton', () => {
  it('컬리페이 에러 버튼을 볼 수 있다.', () => {
    const { getByTestId } = render(<KurlypayErrorButton />);

    expect(getByTestId('kurlypay-error-button')).toBeInTheDocument();
  });

  it('혜택 문구를 볼 수 없다.', () => {
    render(<KurlypayErrorButton />);

    expect(screen.queryByText('혜택')).not.toBeInTheDocument();
  });
});
