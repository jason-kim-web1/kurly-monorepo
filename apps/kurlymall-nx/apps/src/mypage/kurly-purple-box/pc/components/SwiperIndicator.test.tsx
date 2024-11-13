import { render } from '@testing-library/react';

import SwiperIndicator from './SwiperIndicator';

describe('KurlyPurpleSwiperIndicator', () => {
  const currentIndex = 5;
  const totalLength = 10;

  const renderSwiperIndicator = () => render(<SwiperIndicator currentIndex={currentIndex} totalLength={totalLength} />);

  it('이미지의 총 갯수와 현재 스와이퍼의 위치가 노출된다', () => {
    const { container } = renderSwiperIndicator();

    expect(container).toHaveTextContent(`${currentIndex + 1}/${totalLength}`);
  });
});
