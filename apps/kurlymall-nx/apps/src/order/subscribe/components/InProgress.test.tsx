import { render, screen } from '@testing-library/react';

import InProgress from './InProgress';
import { InProgressProps, PAYMENT_RESULT } from '../interfaces';
import { MEMBERS_PRODUCT_CODE } from '../../../shared/constant';
import usePaymentProcess from '../hooks/usePaymentProcess';

jest.mock('../hooks/usePaymentProcess');

describe.skip('InProgress', () => {
  const successPaymentProcess = jest.fn();
  const failPaymentProcess = jest.fn();
  const cancelPaymentProcess = jest.fn();

  const renderInProgress = ({ result, productCode, errorMessage, orderNo, errorCode }: InProgressProps) =>
    render(
      <InProgress
        result={result}
        productCode={productCode}
        errorMessage={errorMessage}
        orderNo={orderNo}
        errorCode={errorCode}
      />,
    );

  beforeEach(() => {
    (usePaymentProcess as jest.Mock).mockReturnValue({
      successPaymentProcess,
      failPaymentProcess,
      cancelPaymentProcess,
    });
  });

  it('결제 진행 문구를 볼 수 있다.', () => {
    renderInProgress({
      result: '',
      productCode: '',
      orderNo: '',
      errorMessage: '',
      errorCode: '',
    });

    expect(screen.queryByText(/결제하기/)).toBeInTheDocument();
    expect(screen.queryByText(/결제 진행 중입니다./)).toBeInTheDocument();
    expect(screen.queryByText(/결제가 완료될 때까지 잠시만 기다려 주세요./)).toBeInTheDocument();
  });

  context('결제 성공이면', () => {
    it('성공 프로세스를 실행하는 successPaymentProcess 를 호출한다.', () => {
      renderInProgress({
        result: PAYMENT_RESULT.SUCCESS,
        productCode: MEMBERS_PRODUCT_CODE,
        orderNo: '12345',
        errorMessage: '',
        errorCode: '',
      });

      expect(successPaymentProcess).toBeCalled();
    });
  });

  context('결제 실패면', () => {
    it('실패 프로세스를 실행하는 failPaymentProcess 를 호출한다.', () => {
      renderInProgress({
        result: PAYMENT_RESULT.ERROR,
        productCode: MEMBERS_PRODUCT_CODE,
        errorMessage: '생년월일 또는 사업자번호 불일치',
        orderNo: '',
        errorCode: '',
      });

      expect(failPaymentProcess).toBeCalled();
    });
  });

  context('결제 취소면', () => {
    it('실패 프로세스를 실행하는 cancelPaymentProcess 를 호출한다.', () => {
      renderInProgress({
        result: '',
        productCode: '',
        orderNo: '',
        errorMessage: '',
        errorCode: '',
      });

      expect(cancelPaymentProcess).toBeCalled();
    });
  });
});
