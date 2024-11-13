import { render, screen } from '@testing-library/react';

import { useRouter } from 'next/router';

import SubmitButton from './SubmitButton';
import usePaymentAction from '../hooks/usePaymentAction';

jest.mock('next/router');
jest.mock('../hooks/usePaymentAction');

const push = jest.fn();

describe.skip('Submit button component', () => {
  given('isPaymentButtonLoading', () => false);

  beforeEach(() => {
    (useRouter as jest.Mock).mockImplementation(() => ({
      push,
    }));
    (usePaymentAction as jest.Mock).mockImplementation(() => ({
      isPaymentButtonLoading: given.isPaymentButtonLoading,
      redirectPayment: jest.fn(),
    }));
  });

  it('신청페이지에서 결제하기 버튼을 볼 수 있다.', () => {
    render(<SubmitButton isChangePayment={false} isPaymentButtonLoading={false} handlePaymentLoading={() => {}} />);

    const button = screen.getByText('결제하기');

    expect(button).toBeInTheDocument();
  });

  it('변경페이지에서 결제하기 버튼을 볼 수 있다.', () => {
    render(<SubmitButton isChangePayment={true} isPaymentButtonLoading={false} handlePaymentLoading={() => {}} />);

    const button = screen.getByText('변경하기');

    expect(button).toBeInTheDocument();
  });
});
