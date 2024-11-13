import { fireEvent, render } from '@testing-library/react';
import { format, addDays, subDays } from 'date-fns';

import { checkoutCouponsFixture } from '../../../../../../../fixtures';
import { addComma } from '../../../../../../shared/services';

import { CouponItem } from './CouponItem';
import { UnselectedCouponOption } from './UnselectedCouponOption';
import { CheckoutCoupon } from '../../../../../../shared/interfaces';

describe('CouponItem 테스트', () => {
  const handleClick = jest.fn();
  given('coupon', () => checkoutCouponsFixture[0]);
  given('selectedCouponCode', () => null);

  const renderCouponItem = () =>
    render(
      <CouponItem coupon={given.coupon} selectedCouponCode={given.selectedCouponCode} onClickCoupon={handleClick} />,
    );

  it('쿠폰 내용을 볼 수 있다.', () => {
    const { container } = renderCouponItem();
    const { name, description } = given.coupon;

    expect(container).toHaveTextContent(name);
    expect(container).toHaveTextContent(description);
  });

  context('쿠폰 유효기간이 없으면', () => {
    given('coupon', () => ({
      ...checkoutCouponsFixture[0],
      usable: true,
      endAt: null,
    }));

    it('만료기간 없음을 볼 수 있다.', () => {
      const { container } = renderCouponItem();

      expect(container).toHaveTextContent('만료기간 없음');
    });
  });

  context('쿠폰 유효기간이 오늘이면', () => {
    const today = format(new Date(), 'yyyy-MM-dd 23:59:59');

    given('coupon', () => ({
      ...checkoutCouponsFixture[0],
      usable: true,
      endAt: today,
    }));

    it('오늘 만료라는 사실을 볼 수 있다.', () => {
      const { container } = renderCouponItem();

      expect(container).toHaveTextContent(`오늘 (${format(new Date(today), 'MM월dd일) 24시')} 만료`);
    });
  });

  context('쿠폰 유효기간이 내일이면', () => {
    const today = format(new Date(), 'yyyy-MM-dd 14:00:00');
    const tomorrow = format(new Date(addDays(new Date(today), 1)), 'yyyy-MM-dd HH:mm:ss');

    given('coupon', () => ({
      ...checkoutCouponsFixture[0],
      usable: true,
      endAt: tomorrow,
    }));

    it('내일 만료라는 사실을 볼 수 있다.', () => {
      const { container } = renderCouponItem();

      expect(container).toHaveTextContent(`내일 (${format(new Date(tomorrow), 'MM월dd일) HH시')} 만료`);
    });
  });

  context('쿠폰 유효기간이 지났으면', () => {
    const yesterday = subDays(new Date(), 1);

    given('coupon', () => ({
      ...checkoutCouponsFixture[0],
      usable: false,
      endAt: yesterday,
    }));

    it('유효기간 만료를 볼 수 있다.', () => {
      const { container } = renderCouponItem();

      expect(container).toHaveTextContent('유효기간 만료');
    });
  });

  context('쿠폰 유효기간이 이내이면', () => {
    const endAt = addDays(new Date(), 10);

    given('coupon', () => ({
      ...checkoutCouponsFixture[0],
      usable: true,
      endAt,
    }));

    it('만료일을 볼 수 있다.', () => {
      const { container } = renderCouponItem();

      expect(container).toHaveTextContent(`${format(new Date(endAt), 'yyyy년 MM월dd일 HH시')} 만료`);
    });
  });

  context('쿠폰이 사용 가능하면', () => {
    given('coupon', () => ({
      ...checkoutCouponsFixture[0],
      usable: true,
    }));

    it('할인 가격을 볼 수 있다.', () => {
      const { container } = renderCouponItem();
      const { totalCouponDiscount } = given.coupon;

      expect(container).toHaveTextContent(`${addComma(totalCouponDiscount)}원 할인`);
    });
  });

  context('쿠폰이 사용 불가하면', () => {
    given('coupon', () => ({
      ...checkoutCouponsFixture[0],
      usable: false,
    }));

    it('사용 불가 텍스트를 볼 수 있다.', () => {
      const { container } = renderCouponItem();
      const { totalCouponDiscount } = given.coupon;

      expect(container).toHaveTextContent('사용 불가');
      expect(container).not.toHaveTextContent(`${addComma(totalCouponDiscount)}원 할인`);
    });
  });

  context('선택된 쿠폰이 내 쿠폰 번호와 동일하면', () => {
    given('selectedCouponCode', () => given.coupon.couponCode);

    it('체크 아이콘을 볼 수 있다.', () => {
      const { getByTestId } = renderCouponItem();

      expect(getByTestId('selected-icon')).toBeInTheDocument();
    });
  });

  context('클릭하면', () => {
    it('handleClick handler를 호출한다', () => {
      const { getByText } = renderCouponItem();

      fireEvent.click(getByText(given.coupon.name));

      expect(handleClick).toBeCalled();
    });
  });
});

describe('UnselectedCouponOption 테스트', () => {
  const handleClick = jest.fn();

  const renderComponent = (couponList: CheckoutCoupon[] | undefined, selectedCouponCode: string | null) =>
    render(
      <UnselectedCouponOption
        selectedCouponCode={selectedCouponCode}
        couponList={couponList}
        handleClickUnselectedCouponOption={handleClick}
      />,
    );

  it('사용 가능한 쿠폰이 없다면 쿠폰 적용 안함 버튼이 비활성화 된다', () => {
    const couponList = [{ usable: false }, { usable: false }] as CheckoutCoupon[];

    const { getByText } = renderComponent(couponList, null);

    const button = getByText('쿠폰 적용 안함').closest('button');
    expect(button).toBeDisabled();
  });

  it('사용 가능한 쿠폰이 있다면 쿠폰 적용 안함 버튼이 활성화 된다', () => {
    const couponList = [{ usable: false }, { usable: true }] as CheckoutCoupon[];

    const { getByText } = renderComponent(couponList, null);

    const button = getByText('쿠폰 적용 안함').closest('button');
    expect(button).toBeEnabled();
  });
});
