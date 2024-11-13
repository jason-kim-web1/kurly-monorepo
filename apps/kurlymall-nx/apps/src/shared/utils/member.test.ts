import { CART_PATH, INQUIRY_PATH, MYPAGE_PATH, ORDER_PATH } from '../constant';
import { MemberBenefitPolicy } from '../interfaces';
import { getBenefitsText, getBenefitsAllowedUrl, getPointAllowedUrl } from './member';

test('getBenefitsText', () => {
  expect(getBenefitsText(undefined)).toBe('');
  expect(
    getBenefitsText({
      grade: '라벤더',
      policy: MemberBenefitPolicy.MEMBER_GROUP_POLICY,
      percent: 1,
      description: '',
    }),
  ).toBe('라벤더 1%');
  expect(
    getBenefitsText({
      grade: '라벤더',
      policy: MemberBenefitPolicy.MEMBER_BENEFIT_POLICY,
      percent: 2,
      description: '오늘 하루 두배 적립',
    }),
  ).toBe('오늘 하루 두배 적립 2%');
  expect(
    getBenefitsText({
      grade: '라벤더',
      policy: MemberBenefitPolicy.KURLY_PASS,
      percent: 2,
      description: '오늘 하루 두배 적립',
    }),
  ).toBe('라벤더 2%');
});

test('getBenefitsAllowedUrl', () => {
  expect(getBenefitsAllowedUrl(undefined)).toBe(false);

  expect(getBenefitsAllowedUrl(INQUIRY_PATH.inquiry.uri)).toBe(false);
  expect(getBenefitsAllowedUrl(CART_PATH.cart.uri)).toBe(true);
  expect(getBenefitsAllowedUrl(ORDER_PATH.order.uri)).toBe(true);
  expect(getBenefitsAllowedUrl(ORDER_PATH.join.uri)).toBe(true);
});

test('getPointAllowedUrl', () => {
  expect(getPointAllowedUrl(undefined)).toBe(false);

  expect(getPointAllowedUrl(INQUIRY_PATH.inquiry.uri)).toBe(false);
  expect(getPointAllowedUrl(CART_PATH.cart.uri)).toBe(true);
  expect(getPointAllowedUrl(ORDER_PATH.order.uri)).toBe(true);
  expect(getPointAllowedUrl(ORDER_PATH.order.mobileUri)).toBe(true);
  expect(getPointAllowedUrl(ORDER_PATH.join.uri)).toBe(true);
  expect(getPointAllowedUrl(MYPAGE_PATH.orderList.uri)).toBe(true);
});
