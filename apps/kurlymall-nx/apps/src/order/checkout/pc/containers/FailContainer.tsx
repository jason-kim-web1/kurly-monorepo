import styled from '@emotion/styled';

import { useAppSelector } from '../../../../shared/store';

import COLOR from '../../../../shared/constant/colorset';

import OrderFail from '../../../../shared/icons/OrderFail';
import useFailResult from '../../shared/hooks/useFailResult';
import Button from '../../../../shared/components/Button/Button';

const Container = styled.div`
  position: relative;
  width: 400px;
  height: 524px;
  margin: 0 auto;
  background: ${COLOR.kurlyWhite};
  text-align: center;
`;

const MessageWrap = styled.div`
  display: flex;
  height: 374px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Message = styled.div`
  padding-top: 24px;
  font-size: 20px;
  line-height: 26px;
`;

const ActionMessge = styled.p`
  font-size: 18px;
  font-weight: bold;
`;

const DetailReason = styled.p`
  margin: 12px 30px 0;
  font-size: 14px;
  line-height: 20px;
  color: ${COLOR.kurlyGray800};
`;

const GuideWrap = styled.div`
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  padding: 30px;
`;

const Guide = styled.div`
  margin-bottom: 24px;
  font-size: 14px;
  line-height: 20px;
  text-align: center;
  color: ${COLOR.kurlyGray450};
`;

export default function FailContainer() {
  const reason = useAppSelector(({ payments }) => payments.paymentsResult.reason);
  const { isButtonLoading, failButtonState } = useFailResult();

  return (
    <Container>
      <MessageWrap>
        <OrderFail />
        <Message>
          주문이 실패했습니다.
          <ActionMessge>다시 주문해주세요.</ActionMessge>
          {/* PG 에서 결제 실패 사유를 보내줄 시 */}
          {reason && <DetailReason>{reason}</DetailReason>}
        </Message>
      </MessageWrap>
      <GuideWrap>
        <Guide>
          문의가 있을 경우,
          <br />
          1:1 문의에 남겨주시면 신속히 해결해드리겠습니다.
        </Guide>
        <Button text={failButtonState.text} onClick={failButtonState.handler} radius={6} isLoading={isButtonLoading} />
      </GuideWrap>
    </Container>
  );
}
