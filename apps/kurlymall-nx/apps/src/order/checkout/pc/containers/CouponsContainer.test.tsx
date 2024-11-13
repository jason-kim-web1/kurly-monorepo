import { fireEvent, screen, waitFor } from '@testing-library/react';

import { renderWithProviders } from '../../../../../util/testutil';
import CouponsContainer from './CouponsContainer';
import { KAKAO_CS_URL } from '../../../../shared/configs/config';
import { FREE_SHIPPING_COUPON, NAVERPAY_COUPON, TOSS_COUPON, checkoutCouponsFixture } from '../../../../../fixtures';
import { usePreviousVendorQuery } from '../../shared/hooks/queries';
import useMembersBanner from '../../../shared/shared/hooks/useMembersBanner';
import { MEMBERS_BANNER, MembersBannerType } from '../../shared/constants/kurly-members-banner';
import { calculatePrice } from '../../../shared/shared/services';
import { JoinOrderType } from '../../../../shared/interfaces';

jest.mock('../../shared/hooks/queries');
jest.mock('../../../shared/shared/services');
jest.mock('../../../shared/shared/hooks/useMembersBanner');

const spyWindowOpen = jest.spyOn(window, 'open').mockImplementation(jest.fn());

const mockJoinOrderMeta = {
  code: '1234',
  requiredPeopleCount: 2,
  joinedPeopleCount: 1,
  startDate: '2023-07-21T10:30:30+09:00',
  endDate: '2023-12-31T12:31:30+09:00',
  status: '함께구매 인원 부족',
  type: 'CREATED' as JoinOrderType,
  joinOrderShareLink: 'test link',
};

describe('CouponContainer test', () => {
  const renderCouponsContainer = (preloadedState = {}) => renderWithProviders(<CouponsContainer />, { preloadedState });

  beforeEach(() => {
    (calculatePrice as jest.Mock).mockResolvedValue({
      totalPrice: 10000,
      discountPrice: 0,
      expectedPoint: 100,
      couponDiscountPrice: 3000,
      paymentPrice: 7000,
      deliveryPrice: 3000,
    });
    (usePreviousVendorQuery as jest.Mock).mockResolvedValue({
      isLoading: false,
    });
    (useMembersBanner as jest.Mock).mockImplementation(({ bannerType }: { bannerType: MembersBannerType }) => ({
      membersBanner: {
        bannerUrl: 'https://product-image-stg.kurly.com/banner/da-banner/84312547-e172-4409-a17e-0eba46f10445.png',
        bannerTitle: JSON.stringify(bannerType),
      },
      goToMembership: jest.fn(),
    }));
  });

  it('"쿠폰 적용" title 을 볼 수 있다.', async () => {
    renderCouponsContainer();

    await screen.findByText('쿠폰 적용');
  });

  context('쿠폰 사용 문의 button 을 누르면', () => {
    it('"카카오톡으로 이동하시겠습니까?" alert 을 볼 수 있다.', async () => {
      renderCouponsContainer();

      const button = await screen.findByRole('button', { name: '쿠폰 사용 문의 (카카오톡)' });
      fireEvent.click(button);

      await screen.findByText('카카오톡으로 이동하시겠습니까?');

      const confirmButton = await screen.findByRole('button', { name: 'confirm-button' });
      fireEvent.click(confirmButton);

      await waitFor(() => expect(spyWindowOpen).toBeCalledWith(KAKAO_CS_URL, '_blank', 'noopener,noreferrer'));
    });
  });

  context('쿠폰이 있으면', () => {
    it('전체 쿠폰 갯수와 사용가능 쿠폰 갯수를 볼 수 있다.', async () => {
      renderCouponsContainer({
        checkoutCoupon: {
          coupons: checkoutCouponsFixture,
        },
      });

      await screen.findByText('사용가능 쿠폰 6장 / 전체 7장');
    });

    it('쿠폰 창에서 쿠폰을 선택할 수 있다.', async () => {
      const { store } = renderCouponsContainer({
        checkoutCoupon: {
          coupons: [FREE_SHIPPING_COUPON, NAVERPAY_COUPON, TOSS_COUPON],
        },
      });

      const { coupons } = store.getState().checkoutCoupon;

      const selectbox = await screen.findByText('사용가능 쿠폰 3장 / 전체 3장');
      fireEvent.click(selectbox);

      await screen.findByRole('listbox');

      const coupon = await screen.findByText(coupons[2].description);
      fireEvent.click(coupon);

      const { selectedCoupon } = store.getState().checkoutCoupon;
      expect(selectedCoupon).toEqual(coupons[2]);
    });
  });

  context.each`
  text | orderType
  ${'이벤트 상품 주문'} | ${{ isEventProducts: true }}
  ${'상품권 주문'} | ${{ isGiftCardOrder: true }}
  ${'픽업 주문'} | ${{ isPickupOrder: true }}
  ${'함께구매 주문'} | ${{ joinOrder: mockJoinOrderMeta }}
`('$text 이면', ({ orderType }) => {
    it('쿠폰 사용 불가 메세지를 볼 수 있고, 쿠폰 선택창이 disable 된다.', async () => {
      renderCouponsContainer({
        checkoutCoupon: {
          coupons: checkoutCouponsFixture,
        },
        checkout: orderType,
      });

      await screen.findByText('쿠폰 적용 불가 상품입니다');
    });
  });

  context('멤버스 배너가 등록되어 있으면', () => {
    it('멤버스 배너를 볼 수 있다.', async () => {
      renderCouponsContainer({
        checkoutCoupon: {
          coupons: checkoutCouponsFixture,
        },
      });

      const selectbox = await screen.findByText('사용가능 쿠폰 6장 / 전체 7장');
      fireEvent.click(selectbox);

      const imageElement = await screen.findAllByRole('img');
      const altText = imageElement[0].getAttribute('alt')?.replace(/"/gi, '');

      expect(altText).toEqual(MEMBERS_BANNER.PC_COUPON_LIST);
    });
  });
});
