import { render, fireEvent } from '@testing-library/react';

import PcTabs from './PcTabs';

describe('PcTabs', () => {
  const selectedTab = '휴대폰 인증';
  const tabs = ['휴대폰 인증', '이메일 인증'];

  const handleChange = jest.fn();

  const renderPcTabs = () => render(<PcTabs selectedTab={selectedTab} tabs={tabs} onChange={handleChange} />);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it.each(tabs)('renders Tabs', (menu) => {
    const { container } = renderPcTabs();

    expect(container).toHaveTextContent(menu);
  });

  describe('Clicking tab', () => {
    it('calls onChange handler with menu name', () => {
      const { getByText } = renderPcTabs();

      fireEvent.click(getByText('이메일 인증'));

      expect(handleChange).toBeCalledWith('이메일 인증');
    });
  });
});
