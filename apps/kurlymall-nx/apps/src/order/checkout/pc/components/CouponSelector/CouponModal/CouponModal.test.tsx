import { fireEvent, render } from '@testing-library/react';

import { checkoutCouponsFixture } from '../../../../../../../fixtures';
import { couponExpired } from '../../../../../shared/shared/utils';

import CouponModal from './CouponModal';
import useMembersBanner from '../../../../../shared/shared/hooks/useMembersBanner';

jest.mock('../../../../../shared/shared/hooks/useMembersBanner');

describe('CouponModal 테스트', () => {
  const handleClick = jest.fn();
  const handleMouseLeave = jest.fn();

  given('couponList', () => checkoutCouponsFixture);
  given('selectedCoupon', () => null);
  given('isSubscribed', () => false);

  beforeEach(() => {
    jest.clearAllMocks();
    (useMembersBanner as jest.Mock).mockImplementation(() => ({
      membersBanner: undefined,
      goToMembership: jest.fn(),
    }));
  });

  const renderCouponModal = () =>
    render(
      <CouponModal
        couponList={given.couponList}
        selectedCoupon={given.selectedCoupon}
        onClick={handleClick}
        onMouseLeave={handleMouseLeave}
        membersBanner={{}}
        goToMembership={jest.fn()}
      />,
    );

  context('쿠폰 리스트가 있으면', () => {
    it('쿠폰 상세 내역을 볼 수 있다.', () => {
      const { container } = renderCouponModal();
      const { name, description, endAt } = given.couponList[0];

      expect(container).toHaveTextContent(name);
      expect(container).toHaveTextContent(description);
      expect(container).toHaveTextContent(couponExpired(endAt));
    });
  });

  context('쿠폰 적용 안함을 클릭하면', () => {
    it('handleClick 핸들러에서 아무 것도 전송하지 않는다.', () => {
      const { getByText } = renderCouponModal();

      fireEvent.click(getByText('쿠폰 적용 안함'));

      expect(handleClick).toBeCalled();
    });
  });

  context('사용 불가능한 쿠폰을 클릭하면', () => {
    it('handleClick 핸들러를 호출하지 않는다.', () => {
      const { getByText } = renderCouponModal();

      fireEvent.click(getByText(given.couponList[1].name));

      expect(handleClick).not.toBeCalled();
    });
  });

  context('사용 가능한 쿠폰을 클릭하면', () => {
    it('handleClick 핸들러에서 쿠폰 정보를 전송한다.', () => {
      const { getByText } = renderCouponModal();

      fireEvent.click(getByText(given.couponList[0].name));

      expect(handleClick).toBeCalledWith(given.couponList[0]);
    });
  });

  context('쿠폰 선택 modal에서 마우스를 벗어나면', () => {
    it('handleMouseLeave 이벤트가 발생한다', () => {
      const { getByRole } = renderCouponModal();

      fireEvent.mouseLeave(getByRole('listbox'));

      expect(handleMouseLeave).toBeCalled();
    });
  });
});
