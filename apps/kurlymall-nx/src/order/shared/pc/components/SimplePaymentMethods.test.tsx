import { render, fireEvent } from '@testing-library/react';

import SimplePaymentMethods from './SimplePaymentMethods';
import { NAVERPAY_VENDOR, simpleVendorsFixture } from '../../../../../fixtures/checkout/payment-vendors';

describe('SimplePaymentMethods', () => {
  const handleClick = jest.fn();

  const renderSimplePaymentMethods = () =>
    render(
      <SimplePaymentMethods selectedVendor={NAVERPAY_VENDOR} vendors={simpleVendorsFixture} onClick={handleClick} />,
    );

  it('renders SimplePaymentMethods', () => {
    const { container } = renderSimplePaymentMethods();

    expect(container).toHaveTextContent('네이버페이');
  });

  describe('Clicking payment method', () => {
    it('calls onClick handler', () => {
      const { getByText } = renderSimplePaymentMethods();

      fireEvent.click(getByText('토스'));

      expect(handleClick).toBeCalledWith('toss');
    });
  });
});
