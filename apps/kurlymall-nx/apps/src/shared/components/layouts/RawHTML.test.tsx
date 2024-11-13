import { render } from '@testing-library/react';

import RawHTML from './RawHTML';

describe('RawHTML', () => {
  const html = `
  <div>
    안녕하세요
  </div>
  `;

  const renderRawHTML = () => render(<RawHTML html={html} />);

  it('renders RawHTML', () => {
    const { container } = renderRawHTML();

    expect(container).toHaveTextContent('안녕하세요');
    expect(container).not.toHaveTextContent('div');
  });
});
