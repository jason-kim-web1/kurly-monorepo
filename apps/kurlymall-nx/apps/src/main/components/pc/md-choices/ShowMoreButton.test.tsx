import { render, screen } from '@testing-library/react';

import ShowMoreButton from './ShowMoreButton';
import { MdChoicesOption } from '../../../interfaces/MainSection.interface';

const selectedOption: MdChoicesOption = {
  code: '780027',
  name: '옵션형3(대표 콘텐츠 노출)',
  link: '/shop/goods/goods_list.php?category=780027',
  selected: true,
  products: [],
  loading: false,
};

describe('ShowMoreButton', () => {
  const renderComponent = () =>
    render(<ShowMoreButton site="MARKET" selectedOption={selectedOption} selectMore={() => {}} />);

  it('render text', () => {
    renderComponent();

    const text = screen.getByText(`${selectedOption.name} 전체보기`);

    expect(text).toBeInTheDocument();
  });
});
