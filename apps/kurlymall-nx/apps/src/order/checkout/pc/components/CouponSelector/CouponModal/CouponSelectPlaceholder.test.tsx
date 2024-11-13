import { fireEvent, render } from '@testing-library/react';

import CouponSelectPlaceholder from './CouponSelectPlaceholder';

import { usePreviousVendorQuery } from '../../../../shared/hooks/queries';

jest.mock('../../../../shared/hooks/queries');
describe('CouponSelectPlaceholder 테스트', () => {
  const handleClick = jest.fn();

  given('placeholder', () => 'placeholder');
  given('disable', () => false);

  const renderCouponSelectPlaceholder = () =>
    render(
      <CouponSelectPlaceholder
        opened={given.opened}
        placeholder={given.placeholder}
        disable={given.disable}
        dimmed={given.dimmed}
        onClick={handleClick}
      />,
    );

  context('이전결제수단 조회 API가 pendding 상태이면', () => {
    it('스켈레톤 UI 를 보여준다.', () => {
      (usePreviousVendorQuery as jest.Mock).mockReturnValueOnce({
        isLoading: true,
      });

      const { getByTestId } = renderCouponSelectPlaceholder();

      expect(getByTestId('coupon-select-skeleton')).toBeInTheDocument();
    });
  });

  context('disable 상태이면', () => {
    given('disable', () => true);

    it('handleClick handler를 호출할 수 없다', () => {
      (usePreviousVendorQuery as jest.Mock).mockReturnValueOnce({
        isLoading: false,
      });

      const { container } = renderCouponSelectPlaceholder();

      fireEvent.click(container);

      expect(handleClick).not.toBeCalled();
    });
  });

  context('disable 상태가 아니면', () => {
    given('disable', () => false);

    it('handleClick handler를 호출할 수 있다', () => {
      (usePreviousVendorQuery as jest.Mock).mockReturnValueOnce({
        isLoading: false,
      });

      const { getByText } = renderCouponSelectPlaceholder();

      fireEvent.click(getByText(given.placeholder));

      expect(handleClick).toBeCalled();
    });
  });
});
