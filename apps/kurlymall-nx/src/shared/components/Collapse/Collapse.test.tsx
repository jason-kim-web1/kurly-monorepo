import { render } from '@testing-library/react';

import Collapse from './Collapse';

describe('Collapse', () => {
  const handleClick = jest.fn();

  const renderCollapse = () =>
    render(
      <Collapse title="제목" summary={null} opened={given.opened} onClick={handleClick}>
        안녕하세요
      </Collapse>,
    );

  given('opened', () => true);

  it('renders collapse head', () => {
    const { container } = renderCollapse();

    expect(container).toHaveTextContent('제목');
  });

  context('when opened', () => {
    it('shows children component', () => {
      const { container } = renderCollapse();

      expect(container).toHaveTextContent('안녕하세요');
    });
  });

  context('when not opened', () => {
    given('opened', () => false);

    it('shows children component', () => {
      const { container } = renderCollapse();

      expect(container).not.toHaveTextContent('안녕하세요');
    });
  });
});
