import { render } from '@testing-library/react';

import ImageWithBase64Src from '.';

describe('ImageWithBase64Src', () => {
  given('src', () => 'some src data');
  given('format', () => 'some format data');
  given('alt', () => 'some alt data');

  const renderImageWithBase64Src = () =>
    render(<ImageWithBase64Src src={given.src} format={given.format} alt={given.alt} />);

  context('src 값이 없으면', () => {
    given('src', () => '');

    it('아무것도 보여지지 않는다.', () => {
      const { container } = renderImageWithBase64Src();

      expect(container).toBeEmptyDOMElement();
    });
  });

  context('format 값이 없으면', () => {
    given('format', () => '');

    it('아무것도 보여지지 않는다.', () => {
      const { container } = renderImageWithBase64Src();

      expect(container).toBeEmptyDOMElement();
    });
  });

  context('alt 값이 없으면', () => {
    given('alt', () => '');

    it('아무것도 보여지지 않는다.', () => {
      const { container } = renderImageWithBase64Src();

      expect(container).toBeEmptyDOMElement();
    });
  });

  context('모든 값이 있으면', () => {
    it('컴포넌트가 보여진다.', () => {
      const { container } = renderImageWithBase64Src();

      expect(container).not.toBeEmptyDOMElement();
    });
  });
});
