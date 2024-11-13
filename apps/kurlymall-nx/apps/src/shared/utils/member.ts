import { CART_PATH, GIFT_PATH, MYPAGE_PATH, ORDER_PATH, PRODUCT_PATH } from '../constant';
import { MemberBenefitPolicy, MemberPointBenefit } from '../interfaces';

export const getBenefitsText = (benefits?: MemberPointBenefit) => {
  if (!benefits) {
    return '';
  }

  const { grade, policy, percent, description } = benefits;

  // 회원 등급의 특별 혜택인 경우
  if (policy === MemberBenefitPolicy.MEMBER_BENEFIT_POLICY) {
    return `${description} ${percent}%`;
  }

  return `${grade} ${percent}%`;
};

// 전체 포인트 혜택 조회가 필요한 페이지
export const getPointBenefitsAllowedUrl = (uri: string | undefined) => {
  const list = [CART_PATH.cart.uri, ORDER_PATH.order.uri, GIFT_PATH.order.uri, PRODUCT_PATH.detail.uri];

  return list.find((addr) => uri && uri?.includes(addr));
};

// 전체 혜택 조회가 필요한 페이지
export const getBenefitsAllowedUrl = (uri: string | undefined) => {
  const list: (string | undefined)[] = [
    CART_PATH.cart.uri,
    ORDER_PATH.order.uri,
    ORDER_PATH.join.uri,
  ];

  return list.includes(uri);
};
// 적립금 조회가 필요한 페이지
export const getPointAllowedUrl = (uri: string | undefined) => {
  const list: (string | undefined)[] = [
    CART_PATH.cart.uri,
    ORDER_PATH.order.uri,
    ORDER_PATH.order.mobileUri,
    ORDER_PATH.join.uri,
    ORDER_PATH.join.mobileUri,
    MYPAGE_PATH.orderList.uri,
  ];

  return list.includes(uri);
};
