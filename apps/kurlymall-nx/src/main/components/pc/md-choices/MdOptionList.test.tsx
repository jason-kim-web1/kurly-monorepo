import { fireEvent, render, screen } from '@testing-library/react';

import MdOptionList from './MdOptionList';
import { MdChoicesOption } from '../../../interfaces/MainSection.interface';

const clickEvent = jest.fn();

const options: MdChoicesOption[] = [
  {
    code: '780024',
    name: '옵션형2(모든 콘텐츠 노출)',
    link: '/shop/goods/goods_list.php?category=780024',
    selected: true,
    products: [],
    loading: false,
  },
  {
    code: '780027',
    name: '옵션형3(대표 콘텐츠 노출)',
    link: '/shop/goods/goods_list.php?category=780027',
    selected: true,
    products: [],
    loading: false,
  },
];

const selectedOption = options[0];

describe('MdOptionList', () => {
  const renderComponent = () =>
    render(<MdOptionList options={options} selectedOption={selectedOption} onClickOption={clickEvent} />);

  it('옵션 리스트가 순서대로 있는지 검증한다', () => {
    renderComponent();

    const list = screen.getAllByRole('listitem');
    const texts = list.map((item) => item.textContent);
    const expected = options.map(({ name }) => name);

    expect(texts).toEqual(expected);
  });

  it('click 이벤트 검증', () => {
    renderComponent();

    const item = screen.getByText('옵션형2(모든 콘텐츠 노출)');

    fireEvent.click(item);

    expect(clickEvent).toBeCalledTimes(1);
  });

  it('선택된 옵션은 selected class name 을 갖는다', () => {
    renderComponent();

    const button = screen.getByRole('button', { name: selectedOption.name });
    expect(button).toHaveClass('selected');
  });
});
