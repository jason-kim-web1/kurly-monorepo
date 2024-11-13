import { screen } from '@testing-library/react';

import { useRouter } from 'next/router';

import { renderWithProviders } from '../../../../util/testutil';
import MembersEditPaymentContainer from './MembersEditPaymentContainer';
import { VendorCodes } from '../../shared/shared/interfaces';
import { PaymentVendorName } from '../../../shared/constant';

jest.mock('next/router');

const push = jest.fn();

describe.skip('MembersEditPaymentContainer', () => {
  const renderMembersEditPaymentContainer = () => renderWithProviders(<MembersEditPaymentContainer />);

  beforeEach(() => {
    (useRouter as jest.Mock).mockImplementation(() => ({
      push,
    }));
  });

  it('결제수단을 신용카드로 변경한다.', () => {
    const { store } = renderMembersEditPaymentContainer();

    const { selectedVendor } = store.getState().checkoutPayment;

    expect(selectedVendor).toEqual({
      code: VendorCodes.KURLYPAY,
      name: PaymentVendorName.kurlypay,
      hasEvent: false,
      isSimplePay: false,
    });
  });

  it('결제수단 변경 안내 문구를 볼 수 있다.', () => {
    renderMembersEditPaymentContainer();

    expect(screen.queryByText(/다음 결제일부터/i)).toBeInTheDocument();
    expect(screen.queryByText(/변경된 수단으로 결제됩니다./i)).toBeInTheDocument();
  });

  it('"결제수단" title 을 볼 수 있다.', () => {
    renderMembersEditPaymentContainer();

    expect(screen.queryByText('결제수단')).toBeInTheDocument();
    expect(screen.queryByText('신용카드')).toBeInTheDocument();
  });

  it('"자동결제" title 을 볼 수 있다.', () => {
    renderMembersEditPaymentContainer();

    expect(screen.queryByText('자동결제')).toBeInTheDocument();
  });
});
