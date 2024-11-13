import { render, screen } from '@testing-library/react';

import ProductDetailImage from './ProductDetailImage';

describe('ProductDetailImage 렌더링', () => {
  const detailImages = [
    'https://img-cf.kurly.com/shop/data/goodsview/20211005/gv00000231492_2.jpg',
    'https://img-cf.kurly.com/shop/data/goodsview/20220303/gv40000285559_2.jpg',
  ];

  it('Property로 받은 이미지 배열의 길이가 2인가', () => {
    expect(detailImages).toHaveLength(2);
  });

  it('render ProductDetailImage', () => {
    render(<ProductDetailImage detailImages={detailImages} />);
  });

  it('renders images', () => {
    render(<ProductDetailImage detailImages={detailImages} />);
    const productDetailImages = screen.getAllByAltText('자세히보기 이미지');

    productDetailImages.forEach((image, i) => {
      expect(image).toHaveAttribute('src', detailImages[i]);
    });
  });
});

describe('ProductDetailImage가 렌더링 되지 않는 경우', () => {
  const detailImages: string[] = [];

  it('detailImages가 없는 경우', () => {
    expect(detailImages).toHaveLength(0);
  });
});
