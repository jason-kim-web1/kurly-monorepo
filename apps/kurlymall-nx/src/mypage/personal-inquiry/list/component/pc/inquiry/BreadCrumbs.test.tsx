import { render } from '@testing-library/react';

import BreadCrumbs from './BreadCrumbs';

describe('BreadCrumbs', () => {
  given('inquiryTypeName', () => '주문/결제/반품/교환문의');
  given('inquiryTypeSubName', () => '반품/교환 문의');

  const renderBreadCrumbs = () =>
    render(<BreadCrumbs category={given.inquiryTypeName} subCategory={given.inquiryTypeSubName} />);

  it('renders', () => {
    const { container } = renderBreadCrumbs();

    expect(container).toHaveTextContent('주문/결제/반품/교환문의');
    expect(container).toHaveTextContent('반품/교환 문의');
  });
});
