import { render } from '@testing-library/react';

import Terms from './Terms';

describe('Terms', () => {
  const renderTerms = () => render(<Terms />);

  it('renders', () => {
    const { container } = renderTerms();

    expect(container).toHaveTextContent('개인정보 수집∙이용 및 처리 동의');
  });
});
