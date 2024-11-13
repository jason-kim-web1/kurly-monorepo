import { MemberSessionRequest } from '../../../shared/api/membership/api.type';
import {
  postMemberSessionCreate,
  postPaymentUnsubscribe,
  putPaymentUnsubscribeReserve,
} from '../../../shared/api/membership/membership.api';
import { CancelReason } from './type';

export const shortenText = (text?: string) => {
  if (!text) {
    return '';
  }

  if (text.length < 5) {
    return text;
  }

  return `${text.slice(0, 5)}...`;
};

export const returnToSubscription = async () => {
  await putPaymentUnsubscribeReserve({
    id: undefined,
    reason: undefined,
    isCancelReserved: false,
  });
};

export const reserveToUnsubscribeMembership = async (cancelReason: CancelReason) => {
  await putPaymentUnsubscribeReserve({
    ...cancelReason,
    isCancelReserved: true,
  });
};

export const unsubscribeMembershipNow = async (cancelReason: CancelReason) => {
  await postPaymentUnsubscribe(cancelReason);
};

export const createMemberSession = async ({ marketingAgreement }: MemberSessionRequest) => {
  await postMemberSessionCreate({ marketingAgreement });
};
