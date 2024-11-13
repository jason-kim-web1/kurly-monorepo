import { render, fireEvent } from '@testing-library/react';

import Tabs from './Tabs';

describe('Tabs', () => {
  const selectedTab = '휴대폰 인증';
  const tabs = ['휴대폰 인증', '이메일 인증'];

  const handleChange = jest.fn();

  const renderTabs = () => render(<Tabs selectedTab={selectedTab} tabs={tabs} onChange={handleChange} />);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it.each(tabs)('renders Tabs', (menu) => {
    const { container } = renderTabs();

    expect(container).toHaveTextContent(menu);
  });

  describe('Clicking tab', () => {
    it('calls onChange handler with menu name', () => {
      const { getByText } = renderTabs();

      fireEvent.click(getByText('이메일 인증'));

      expect(handleChange).toBeCalledWith('이메일 인증');
    });
  });
});
