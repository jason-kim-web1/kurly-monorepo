import styled from '@emotion/styled';

import OrderFail from '../../../shared/icons/OrderFail';
import { useAppSelector } from '../../../shared/store';

const Title = styled.p`
  margin: 24px 0 12px;
  font-size: 20px;
`;

const ErrorMessage = styled.p`
  word-break: break-all;
  white-space: pre-line;
`;

export default function FailResult() {
  const { errorMessage, isChangePayment } = useAppSelector(({ subscribeResult }) => ({
    errorMessage: subscribeResult.errorMessage,
    isChangePayment: subscribeResult.isChangePayment,
  }));

  return (
    <>
      <OrderFail />
      <Title>{isChangePayment ? '결제수단 변경이' : '컬리멤버스 결제가'} 실패했습니다.</Title>
      {errorMessage && <ErrorMessage dangerouslySetInnerHTML={{ __html: errorMessage ?? '' }} />}
    </>
  );
}
