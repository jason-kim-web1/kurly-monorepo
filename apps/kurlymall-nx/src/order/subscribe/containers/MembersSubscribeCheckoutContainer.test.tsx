import { screen } from '@testing-library/react';

import { useRouter } from 'next/router';

import { renderWithProviders } from '../../../../util/testutil';

import MembersSubscribeCheckoutContainer from './MembersSubscribeCheckoutContainer';
import useKurlyMembersCheckout from '../hooks/useKurlyMembersCheckout';
import { VendorCodes } from '../../shared/shared/interfaces';
import { MEMBERS_PRODUCT_CODE } from '../../../shared/constant';

jest.mock('../hooks/useKurlyMembersCheckout');
jest.mock('next/router');
const push = jest.fn();

describe.skip('MembersSubscribeCheckoutContainer', () => {
  beforeEach(() => {
    (useRouter as jest.Mock).mockImplementation(() => ({
      push,
    }));
    (useKurlyMembersCheckout as jest.Mock).mockImplementation(() => ({
      product: {
        name: '컬리멤버스',
        code: MEMBERS_PRODUCT_CODE,
        originalPrice: 1900,
        paymentPrice: 1900,
      },
      order: {
        firstSubscription: false,
        startSettlementDate: '2023년 09월 01일',
      },
    }));
  });

  const renderMembersSubscribeCheckoutContainer = () => renderWithProviders(<MembersSubscribeCheckoutContainer />);

  it('주문서 진입 시 컬리페이 결제수단으로 상태를 변경한다.', () => {
    const { store } = renderMembersSubscribeCheckoutContainer();

    const { checkoutPayment } = store.getState();
    const { selectedVendor } = checkoutPayment;

    expect(selectedVendor?.code).toBe(VendorCodes.KURLYPAY);
  });

  it('멤버십 안내 문구를 볼 수 있다.', () => {
    renderMembersSubscribeCheckoutContainer();

    expect(screen.queryByText(/컬리멤버스를/i)).toBeInTheDocument();
    expect(screen.queryByText(/지금 바로 시작하세요/i)).toBeInTheDocument();
  });

  it('"결제수단" title 을 볼 수 있다.', () => {
    renderMembersSubscribeCheckoutContainer();

    expect(screen.queryByText('결제수단')).toBeInTheDocument();
    expect(screen.queryByText('신용카드')).toBeInTheDocument();
  });

  it('"자동결제" title 을 볼 수 있다.', () => {
    renderMembersSubscribeCheckoutContainer();

    expect(screen.queryByText('자동결제')).toBeInTheDocument();
  });

  it('"결제금액" 과 "결제 시작일" 을 볼 수 있다.', () => {
    renderMembersSubscribeCheckoutContainer();

    expect(screen.queryByText('결제금액')).toBeInTheDocument();
    expect(screen.queryByText('결제 시작일')).toBeInTheDocument();
  });

  context('첫 달이면', () => {
    it('원래 금액과 첫 달 할인 금액을 볼 수 있다.', () => {
      (useKurlyMembersCheckout as jest.Mock).mockImplementation(() => ({
        product: {
          name: '컬리멤버스',
          code: MEMBERS_PRODUCT_CODE,
          originalPrice: 1900,
          paymentPrice: 0,
        },
        order: {
          firstSubscription: true,
          startSettlementDate: '2023년 09월 01일',
        },
      }));

      renderMembersSubscribeCheckoutContainer();

      expect(screen.queryByText('월 1,900원')).toBeInTheDocument();
      expect(screen.queryByText('첫 달 0원')).toBeInTheDocument();
    });
  });

  it('약관동의 항목을 볼 수 있다.', () => {
    renderMembersSubscribeCheckoutContainer();

    expect(screen.queryByText('개인정보 수집∙이용 및 처리 동의')).toBeInTheDocument();
    expect(screen.queryByText('전자지급 결제대행 서비스 이용약관 동의')).toBeInTheDocument();
    expect(screen.queryByText('위 내용을 확인 하였으며 자동결제에 동의 합니다.')).toBeInTheDocument();
  });
});
