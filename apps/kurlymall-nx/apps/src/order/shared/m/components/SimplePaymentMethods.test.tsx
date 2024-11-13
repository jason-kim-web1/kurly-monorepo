import { render, fireEvent } from '@testing-library/react';

import { PaymentVendor } from '../../shared/interfaces';

import SimplePaymentMethods from './SimplePaymentMethods';

describe('SimplePaymentMethods', () => {
  const selectedVendor: PaymentVendor = {
    code: 'naver-pay',
    name: '네이버페이',
    hasEvent: false,
    isSimplePay: true,
  };
  const vendors: PaymentVendor[] = [
    {
      code: 'naver-pay',
      name: '네이버페이',
      hasEvent: false,
      isSimplePay: true,
    },
    {
      code: 'toss',
      name: '토스',
      hasEvent: true,
      isSimplePay: true,
    },
  ];

  const handleClick = jest.fn();

  const renderSimplePaymentMethods = () =>
    render(<SimplePaymentMethods selectedVendor={selectedVendor} vendors={vendors} onClick={handleClick} />);

  it('renders SimplePaymentMethods', () => {
    const { container } = renderSimplePaymentMethods();

    expect(container).toHaveTextContent('네이버페이');
    expect(container).toHaveTextContent('혜택');
  });

  describe('Clicking payment method', () => {
    it('calls onClick handler', () => {
      const { getByText } = renderSimplePaymentMethods();

      fireEvent.click(getByText('토스'));

      expect(handleClick).toBeCalledWith('toss');
    });
  });
});
