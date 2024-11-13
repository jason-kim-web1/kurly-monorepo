import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import styled from '@emotion/styled';

import { vars } from '@thefarmersfront/kpds-css';
import { Button } from '@thefarmersfront/kpds-react';

import { ButtonGroup, MessageGroup, MessageBox, RoundSection, BenefitTitle } from '../shared/styled';
import { MYPAGE_PATH, ORDER_PATH, getPageUrl } from '../../../shared/constant';
import Alert from '../../../shared/components/Alert/Alert';
import { loadMyMembership } from '../shared/membership.slice';
import { useAppSelector } from '../../../shared/store';
import { createMemberSession, returnToSubscription } from '../shared/service';
import { amplitudeService } from '../../../shared/amplitude';
import { SelectMembershipCancelUnsubscribe } from '../../../shared/amplitude/events/membership';
import { redirectTo } from '../../../shared/reducers/page';
import { PaymentStatus } from '../shared/type';
import { isWebview } from '../../../../util/window/getDevice';
import appService from '../../../shared/services/app.service';
import InfoIcon from '../../../shared/components/icons/InfoIcon';

const PaymentInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin: 16px 0 20px;
  font-weight: 400;
  font-size: 16px;
  line-height: 22px;
  color: ${vars.color.text.$primary};

  .item {
    display: flex;
    justify-content: space-between;
    align-items: center;

    &.number {
      margin-top: -16px;
    }
  }
  .label {
    color: ${vars.color.text.$tertiary};
  }
  .text {
    display: flex;
    align-items: center;
  }
  strong {
    font-weight: 600;
    color: ${vars.color.$mint950};
  }
`;

const TPaymentInfo = styled.p`
  padding-top: 12px;
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  color: ${vars.color.text.$tertiary};
`;

export default function PaymentSettlement() {
  const dispatch = useDispatch();
  const { isSubscribed, startSubscriptionDate, endSubscriptionDate, isSmsAgreed, isUsingFreeTicket } = useAppSelector(
    ({ member }) => ({
      isSubscribed: member.subscription.isSubscribed,
      startSubscriptionDate: member.subscription.startSubscriptionDate,
      endSubscriptionDate: member.subscription.endSubscriptionDate,
      isSmsAgreed: member.subscription.agreeSMS,
      isUsingFreeTicket: member.subscription.isUsingFreeTicket,
    }),
  );

  const { isCancelReserved, payment, isSKTMember } = useAppSelector(({ myMembership }) => ({
    isCancelReserved: myMembership.isCancelReserved,
    isSKTMember: myMembership.partner.isSKT,
    payment: myMembership.payment,
  }));

  const getPaymentInfo = () => {
    const paymentInfo = []; // 결제정보

    // 컬리멤버스계정 = 구독 & 취소예약X & 결제상태 완료
    const kurlyMembersAccount = isSubscribed && !isCancelReserved && payment.status === PaymentStatus.COMPLETED;

    if (kurlyMembersAccount) {
      paymentInfo.push(
        { label: '다음 결제 예정일', value: payment.nextDate },
        { label: '구독 시작일', value: startSubscriptionDate },
        { label: '결제 금액', value: payment.price },
        { label: '결제 수단', value: payment.method.name },
      );

      // 계좌번호가 있을 때에만 추가
      if (payment.method.number) {
        paymentInfo.push({ label: '', value: payment.method.number });
      }
    } else {
      paymentInfo.push({ label: '멤버십 종료 예정일', value: endSubscriptionDate });
    }
    // 배열의 값 중 value가 있는 것만 필터링
    return paymentInfo.filter(({ value }) => value);
  };

  const backToSubscribe = useCallback(async () => {
    if (isSKTMember) {
      await Alert({
        text: 'T 우주패스를 통한 컬리멤버스 가입고객은 T우주에서 해지철회 하실 수 있습니다.',
      });
      return;
    }

    try {
      await returnToSubscription();

      await Alert({
        text: '컬리멤버스 혜택이 유지됩니다.',
      });

      amplitudeService.logEvent(new SelectMembershipCancelUnsubscribe());

      dispatch(loadMyMembership());
    } catch (err) {
      if (err.response?.status === '400' || err.response?.data.message) {
        await Alert({
          text: err.response?.data.message ?? '멤버십 해지 철회에 실패하였습니다. 다시 시도해 주세요!',
        });
      }
    }
  }, [dispatch, isSKTMember]);

  const goToCancelPage = useCallback(async () => {
    if (isSKTMember) {
      await Alert({
        text: 'T 우주패스를 통한 컬리멤버스 가입고객은 T우주에서 가입해지 하실 수 있습니다.',
      });
      return;
    }

    if (isWebview()) {
      appService.openWebview({
        url: `${window.location.origin}${MYPAGE_PATH.myMembershipBenefit.uri}`,
      });
      return;
    }

    dispatch(redirectTo({ url: MYPAGE_PATH.myMembershipBenefit.uri }));
  }, [isSKTMember, dispatch]);

  const goToChangePayMethod = useCallback(async () => {
    if (isSKTMember) {
      await Alert({
        text: 'T 우주패스를 통한 컬리멤버스 가입고객은 T우주에서 결제수단 변경 하실 수 있습니다.',
      });
      return;
    }
    if (payment.status === PaymentStatus.SUSPENDED) {
      await createMemberSession({ marketingAgreement: isSmsAgreed });

      dispatch(redirectTo({ url: getPageUrl(ORDER_PATH.subscribe) }));
      return;
    }
    if (isUsingFreeTicket && !payment.method.name) {
      await Alert({
        text: '결제수단을 등록하시면 무료이용권 종료 후 계속해서 컬리멤버스 혜택을 받으실 수 있어요!',
      });
    }

    dispatch(redirectTo({ url: getPageUrl(ORDER_PATH.editSubscribe) }));
  }, [isSKTMember, payment.status, payment.method, isSmsAgreed, isUsingFreeTicket, dispatch]);

  return (
    <RoundSection>
      <BenefitTitle className="border">결제 정보</BenefitTitle>
      <PaymentInfo>
        {getPaymentInfo().map(({ label, value }) => (
          <div className={`item${label ? '' : ' number'}`} key={label}>
            <div className="label">{label}</div>
            <div className="text">
              {isUsingFreeTicket && value === payment.price ? <strong>이용권 사용중</strong> : value}
            </div>
          </div>
        ))}
      </PaymentInfo>
      {isCancelReserved ? (
        <MessageGroup className="cancel">
          <MessageBox className="default">
            <InfoIcon width={15} height={15} color={vars.color.text.$primary} />
            멤버스가 곧 해지됩니다. 언제든 돌아오세요!
          </MessageBox>
          <Button _type="primary" _style="fill" color="regular" size="large" shape="square" onClick={backToSubscribe}>
            멤버스 혜택 계속받기
          </Button>
        </MessageGroup>
      ) : (
        <MessageGroup>
          {payment.status !== PaymentStatus.COMPLETED && (
            <MessageBox className="error">
              <InfoIcon width={15} height={15} color={vars.color.main.$danger} />
              결제에 실패하였습니다. 다른 결제 수단을 등록해주세요.
            </MessageBox>
          )}
          <ButtonGroup>
            <Button _type="secondary" _style="fill" color="light" size="large" shape="square" onClick={goToCancelPage}>
              구독 해지하기
            </Button>
            <Button
              _type="primary"
              _style="fill"
              color="light"
              size="large"
              shape="square"
              onClick={goToChangePayMethod}
            >
              {isUsingFreeTicket && !payment.method.name ? '결제수단 등록' : '결제수단 변경'}
            </Button>
          </ButtonGroup>
        </MessageGroup>
      )}
      {isSKTMember && <TPaymentInfo>* 결제정보는 T우주패스에서 확인가능합니다.</TPaymentInfo>}
    </RoundSection>
  );
}
