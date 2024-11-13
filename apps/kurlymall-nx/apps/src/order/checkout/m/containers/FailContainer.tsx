import styled from '@emotion/styled';

import { useAppSelector } from '../../../../shared/store';

import COLOR from '../../../../shared/constant/colorset';

import OrderFail from '../../../../shared/icons/OrderFail';

import MobileFooter from '../../../../shared/components/layouts/MobileFooter';
import useFailResult from '../../shared/hooks/useFailResult';
import Button from '../../../../shared/components/Button/Button';

const MainContent = styled.div`
  overflow: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  height: 100%;
  padding: 0 20px;
`;

const MessageWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Message = styled.div`
  margin-top: 24px;
  font-size: 20px;
  text-align: center;
  line-height: 1.3;
`;

const ActionMessge = styled.p`
  font-size: 18px;
  font-weight: bold;
`;

const DetailReason = styled.p`
  margin-top: 12px;
  font-size: 14px;
  line-height: 20px;
  color: ${COLOR.kurlyGray800};
`;

const Guide = styled.div`
  position: absolute;
  width: 100%;
  left: 0;
  bottom: 8px;
  font-size: 14px;
  line-height: 1.43;
  text-align: center;
  color: ${COLOR.kurlyGray450};
`;

export default function FailContainer({ isJoinOrder }: { isJoinOrder?: boolean }) {
  const reason = useAppSelector(({ payments }) => payments.paymentsResult.reason);
  const { failButtonState, isButtonLoading } = useFailResult();

  const FailMessage = isJoinOrder ? '함께구매를 새로 모집해주세요.' : '다시 주문해주세요.';

  return (
    <>
      <MainContent>
        <MessageWrap>
          <OrderFail />
          <Message>
            주문이 실패했습니다.
            <ActionMessge>{FailMessage}</ActionMessge>
            {/* PG 에서 결제 실패 사유를 보내줄 시 */}
            {reason && <DetailReason>{reason}</DetailReason>}
            {isJoinOrder && (
              <DetailReason>
                다른 참여자가 먼저 결제 완료하여
                <br />
                해당 함께구매 모집이 종료되었습니다.
              </DetailReason>
            )}
          </Message>
        </MessageWrap>
        <Guide>
          문의가 있을 경우,
          <br />
          1:1 문의에 남겨주시면 신속히 해결해드리겠습니다.
        </Guide>
      </MainContent>
      <MobileFooter>
        <Button text={failButtonState.text} onClick={failButtonState.handler} isLoading={isButtonLoading} />
      </MobileFooter>
    </>
  );
}
