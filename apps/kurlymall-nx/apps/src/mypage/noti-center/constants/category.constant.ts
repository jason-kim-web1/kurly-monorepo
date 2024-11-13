import { NotificationCategory } from '../../../shared/interfaces/Notification';
import { NotificationCategoryTabType } from '../interfaces/category.interface';

export const categoryNames: Record<NotificationCategory, string> = {
  NOTICE: '공지',
  PAYMENT_DELIVERY: '결제・배송',
  MEMBER_BENEFITS: '회원・혜택',
  EVENT: '이벤트',
  RESTOCKED: '재입고',
  CUSTOMER_CENTER: '고객센터',
  // KURLY_LOG: '#컬리로그',
};
export const categoryTabNames: Record<NotificationCategoryTabType, string> = {
  ALL: '전체',
  ...categoryNames,
};

// 노출될 카테고리 리스트
const showingCategoryTabs: NotificationCategoryTabType[] = ['ALL', 'PAYMENT_DELIVERY', 'RESTOCKED', 'CUSTOMER_CENTER'];

export const categoryTabList: {
  value: NotificationCategoryTabType;
  label: string;
}[] = showingCategoryTabs.map((key) => ({
  value: key,
  label: categoryTabNames[key],
}));
