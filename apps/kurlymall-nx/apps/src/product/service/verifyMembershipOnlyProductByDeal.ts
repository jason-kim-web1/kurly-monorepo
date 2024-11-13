import { chain, get, head, isArray, isEmpty } from 'lodash';

import MembershipOnlyProductAlert from '../../shared/components/Cart/MembershipOnlyProductAlert';
import {
  MEMBERSHIP_PURCHASE_ALERT_TYPE,
  PRODUCT_SELECT_USER_ACTION_TYPE,
} from '../../shared/components/Cart/MembershipOnlyProductAlert/constants';
import { DealProduct } from '../../mypage/order/shared/interfaces';

const checkCanNotPurchaseLevel = (deal: DealProduct) => !get(deal, 'canPurchaseLevel');
const checkOverOneQuantity = (deal: DealProduct) => (get(deal, 'quantity') || get(deal, 'buyUnit')) > 0;

export const getVerifiedMembershipOnlyDeals = (dealProducts: DealProduct[]) => {
  // NOTE: 멤버스 상품과 일반 상품이 섞여있을 경우, 빈배열([])을 리턴하여 검증에 실패하도록 처리
  const hasMembersDeal = chain(dealProducts).map('canPurchaseLevel').some().value();
  if (hasMembersDeal) {
    return [];
  }

  return chain(dealProducts).filter(checkCanNotPurchaseLevel).filter(checkOverOneQuantity).value();
};

export const getMembershipOnlyDeals = (dealProducts: DealProduct[]) => {
  if (!isArray(dealProducts)) {
    return [];
  }

  return getVerifiedMembershipOnlyDeals(dealProducts);
};

export const getMembershipPurchaseAlertInfo = (filteredMembersOnlyDeals: DealProduct[]) => {
  const headMemberShipDeal = head(filteredMembersOnlyDeals);
  return get(headMemberShipDeal, 'canPurchaseLevelText', {
    title: '안내',
    text: '전용 상품 구매 여부를 확인할 수 없습니다.',
    type: MEMBERSHIP_PURCHASE_ALERT_TYPE.INFO,
  });
};

export const assertDisabledAddToCartByMembershipDeals = (dealProducts: DealProduct[]) => {
  const membershipOnlyDeals = chain(dealProducts).filter(checkCanNotPurchaseLevel).filter(checkOverOneQuantity).value();
  return !isEmpty(membershipOnlyDeals);
};

interface Props {
  dealProducts: DealProduct[];
  userAction: keyof typeof PRODUCT_SELECT_USER_ACTION_TYPE;
  onClickConfirm(): void;
}

export const verifyMembershipOnlyProductByDeal = async ({ dealProducts, userAction, onClickConfirm }: Props) => {
  if (!isArray(dealProducts)) {
    return;
  }

  const filteredMembersOnlyDeals = getVerifiedMembershipOnlyDeals(dealProducts);
  if (isEmpty(filteredMembersOnlyDeals)) {
    return;
  }

  const membershipPurchaseAlertInfo = getMembershipPurchaseAlertInfo(filteredMembersOnlyDeals);
  if (!membershipPurchaseAlertInfo) {
    return;
  }

  MembershipOnlyProductAlert({
    userAction,
    membershipPurchaseAlertInfo,
    onClickConfirm,
  });
};
