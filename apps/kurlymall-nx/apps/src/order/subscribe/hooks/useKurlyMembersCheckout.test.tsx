import { waitFor } from '@testing-library/react';

import { renderHookWithProviders } from '../../../../util/testutil';

import useKurlyMembersCheckout from './useKurlyMembersCheckout';
import { getKurlyMembersCheckoutProduct } from '../services';
import { SessionExpirationError } from '../../../shared/errors/kurly-members';
import { MEMBERSHIP_PATH, getPageUrl } from '../../../shared/constant';

jest.mock('../services');

describe.skip('useKurlyMembersCheckout', () => {
  const mockResponse = {
    product: {
      name: '유료 멤버쉽',
      code: 'test-product-code',
      price: 9900,
      discountPrice: 0,
    },
    order: {
      firstSubscription: false,
      startSettlementDate: '2023년 07월 05일',
    },
  };

  const renderUseKurlyMembersCheckout = () => renderHookWithProviders(useKurlyMembersCheckout);

  context('멤버십 주문 조회가 성공하면', () => {
    it('응답값을 return 한다.', async () => {
      (getKurlyMembersCheckoutProduct as jest.Mock).mockResolvedValue(mockResponse);

      const { result } = renderUseKurlyMembersCheckout();

      await waitFor(() => expect(result.current.isSuccess).toBeTruthy());

      expect(result.current.order).toEqual(mockResponse.order);
      expect(result.current.product).toEqual(mockResponse.product);
    });
  });

  context('멤버십 주문 조회 API 가 실패하면', () => {
    it('에러 메세지를 띄우고 구독페이지로 이동하는 action 을 수행한다.', async () => {
      const mockError = new Error();
      (getKurlyMembersCheckoutProduct as jest.Mock).mockRejectedValueOnce(new SessionExpirationError(mockError));

      const { result, store } = renderUseKurlyMembersCheckout();

      await waitFor(() => expect(result.current.isError).toBeTruthy());

      const { page } = store.getState();

      expect(page.message).toEqual(`유효하지 않은 접근입니다.\n다시 시도해주세요.`);
      expect(page.redirectUrl).toEqual(getPageUrl(MEMBERSHIP_PATH.membership));
    });
  });
});
