import { render } from '@testing-library/react';

import CollapseHead from './CollapseHead';

describe('CollapseHead', () => {
  const handleClick = jest.fn();

  const renderCollapseHead = () =>
    render(<CollapseHead title="제목" summary={<div>요약</div>} opened={given.opened} onClick={handleClick} />);

  given('opened', () => true);

  it('renders title', () => {
    const { container } = renderCollapseHead();

    expect(container).toHaveTextContent('제목');
  });

  context('when opened', () => {
    it('does not show summary', () => {
      const { container } = renderCollapseHead();

      expect(container).not.toHaveTextContent('요약');
    });
  });

  context('when not opened', () => {
    given('opened', () => false);

    it('shows children component', () => {
      const { container } = renderCollapseHead();

      expect(container).toHaveTextContent('요약');
    });
  });
});
