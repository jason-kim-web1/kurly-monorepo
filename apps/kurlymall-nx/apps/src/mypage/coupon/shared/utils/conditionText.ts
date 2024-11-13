import { isEmpty } from 'lodash';

import { addDays, differenceInDays, format, isBefore, isEqual, parseISO, startOfDay } from 'date-fns';

import { BenefitText, PriceConditionText, PaymentConditionText } from '../interfaces/ConditionText.interfaces';
import { BenefitInfoType } from '../types/conditionTextType';
import { addComma } from '../../../../shared/services';
import { CartVendorName, getPageUrl, PaymentVendorName, PRODUCT_PATH } from '../../../../shared/constant';
import { UNLIMITED_PERIOD } from '../constants';
import { SalesOwner, SalesOwnerType } from '../../../../shared/interfaces';
import { CategoryType, DisplayType, HurdleType } from '../interfaces/Coupon.interfaces';
import { isIos } from '../../../../../util/window/getDevice';

export function makeBenefitText({ luckyBoxCouponCode, benefitInfo }: BenefitText) {
  if (luckyBoxCouponCode) {
    return '0원 할인';
  }

  const benefitTextMap: Record<string, string> = {
    [BenefitInfoType.PRICE_DISCOUNT]: `${addComma(benefitInfo.value ?? 0)}원 할인`,
    [BenefitInfoType.PERCENT_DISCOUNT]: `${benefitInfo.value}% 할인`,
    [BenefitInfoType.FREE_SHIPPING]: '무료배송',
  };

  return benefitTextMap[benefitInfo.type] || '';
}

export function makePriceConditionText({ hurdle, maximumDiscountPrice, type }: PriceConditionText) {
  if (!hurdle) return '';

  const { quantity, price } = hurdle;

  let hurdleText = '';

  if (quantity === 1 && !price) {
    return maximumDiscountPrice ? `최대 ${addComma(maximumDiscountPrice)}원 할인` : hurdleText;
  }

  if (price) {
    hurdleText += `${addComma(price)}원 `;
  }

  if (quantity !== 1) {
    hurdleText += `${quantity}개 `;
  }

  hurdleText += '이상 주문 시 ';

  if (type === BenefitInfoType.PERCENT_DISCOUNT && maximumDiscountPrice) {
    hurdleText += `최대 ${addComma(maximumDiscountPrice)}원 할인`;
  }

  return hurdleText;
}

export function makePaymentMethodText({ hurdle }: { hurdle?: HurdleType }) {
  if (!hurdle) {
    return '';
  }

  const { type, paymentGateways, creditCardId } = hurdle;

  if (type !== 'PAYMENT_METHOD') {
    return '';
  }

  const cardName = CartVendorName[creditCardId];
  const payName = paymentGateways ? PaymentVendorName[paymentGateways] : '';

  let paymentHurdleText = '';

  switch (payName) {
    case '컬리페이':
      paymentHurdleText = cardName === '전체' ? `${payName} 결제시` : `${payName} ${cardName}카드 결제시`;
      break;

    case '신용카드':
    case '토스페이먼츠(신용카드결제사)':
      paymentHurdleText = `${cardName}카드 결제시`;
      break;

    default:
      paymentHurdleText = `${payName} 결제시`;
      break;
  }

  return paymentHurdleText;
}

export function makeTargetOrderText({
  displayHurdle,
  displayTarget,
  scope,
}: {
  scope?: string;
  displayHurdle: DisplayType;
  displayTarget: DisplayType;
}) {
  const product = isEmpty(displayHurdle.allowedProducts) && !isEmpty(displayTarget.allowedProducts);
  const category = isEmpty(displayHurdle.allowedCategories) && !isEmpty(displayTarget.allowedCategories);

  if ((product || category) && scope !== 'ALL') {
    return '쿠폰 적용 대상 주문 시 쿠폰 사용 가능';
  }

  return '';
}

export function makePaymentConditionText({ hurdle, target }: PaymentConditionText) {
  const {
    allowedProducts,
    allowedCategories,
    disallowedProducts,
    disallowedCategories,
    disallowDiscountedProducts,
    salesOwner,
  } = target;

  const hurdleText = [];

  if (hurdle?.type === 'PAYMENT_METHOD') {
    const paymentMethodText = makePaymentMethodText({ hurdle });

    if (paymentMethodText) {
      hurdleText.push(paymentMethodText);
    }
  }

  const isForSpecific =
    hurdle?.type === 'ALLOWED_CATEGORY' ||
    hurdle?.type === 'ALLOWED_PRODUCT' ||
    !isEmpty(allowedProducts) ||
    !isEmpty(allowedCategories);

  const isExceptSpecific = !isEmpty(disallowedProducts) || !isEmpty(disallowedCategories);

  if (salesOwner === 'KURLY') {
    hurdleText.push('컬리상품 한정');
  }

  if (isForSpecific) {
    hurdleText.push('특정상품 한정');
  }

  if (disallowDiscountedProducts) {
    hurdleText.push('할인상품 제외');
  }

  if (isExceptSpecific) {
    hurdleText.push('일부 상품 제외');
  }

  return hurdleText.join(', ');
}

export function makeExpirationDate({ endAt }: { endAt: string }) {
  const endDate = parseISO(endAt);
  const unlimitedDate = parseISO(UNLIMITED_PERIOD);

  if (isEqual(endDate, unlimitedDate)) {
    return '기간제한 없음';
  }

  try {
    const formatText = 'yyyy년 MM월 dd일 HH시';

    if (/00:00:00/g.test(endAt)) {
      const newFormattedDate = format(addDays(endDate, -1), formatText);
      return `${newFormattedDate.replace(' 00시', ' 24시')}까지`;
    }

    return `${format(endDate, formatText)}까지`;
  } catch (err) {
    console.error(err);

    return '';
  }
}

export function makeBadgeText({ isOnlyApp, couponCount }: { isOnlyApp?: boolean; couponCount: number }) {
  const badgeText = [];

  if (couponCount > 1) badgeText.push(`${couponCount}장`);
  if (isOnlyApp) badgeText.push('앱 전용');

  return badgeText;
}

export function makeTargetText({
  salesOwner,
  disallowDiscountedProducts,
}: {
  salesOwner?: SalesOwnerType;
  disallowDiscountedProducts?: boolean;
}) {
  if (salesOwner === SalesOwner.KURLY) {
    return `상품상세 내에 판매자가 ‘컬리'인 상품에만 쿠폰이 적용됩니다.`;
  }

  if (salesOwner === SalesOwner.THIRD_PARTNER) {
    return `상품상세 내에 판매자가 ‘컬리'인 상품에는 쿠폰이 적용되지 않습니다.`;
  }

  if (disallowDiscountedProducts) {
    return '이미 할인이 설정된 상품에는 쿠폰이 적용되지 않습니다.';
  }

  return '';
}

export function makeCategoryLink({ webview, siteKey, code }: { webview: boolean; siteKey?: string; code: string }) {
  const link = webview ? `kurly://category?no=${code}` : `${getPageUrl(PRODUCT_PATH.categories)}/${code}`;
  const trimLink = link.trim();

  if (siteKey === 'beauty') {
    const specialCharacter = link.includes('?') ? '&' : '?';

    return `${trimLink}${specialCharacter}site=beauty`;
  }

  return trimLink;
}

export function makeProductLink({ webview, contentsProductNo }: { webview: boolean; contentsProductNo: string }) {
  if (webview) {
    return `kurly://product?no=${contentsProductNo}`;
  }

  return `${getPageUrl(PRODUCT_PATH.detail)}/${contentsProductNo}`;
}

export function makeCouponDaysLeft({ endAt }: { endAt: string }) {
  const endDate = new Date(endAt);
  const currentDate = new Date();

  if (isBefore(endDate, currentDate)) {
    return '';
  }

  // 날짜 기준으로 계산 하기 위해 시간을 00:00:00 으로 변경
  const startOfEndDate = startOfDay(endDate);
  const startOfCurrentDate = startOfDay(currentDate);

  const daysRemaining = differenceInDays(startOfEndDate, startOfCurrentDate);

  if (daysRemaining > 3) return '';

  if (daysRemaining > 0) {
    return `D-${daysRemaining}`;
  }

  if (daysRemaining === 0) {
    const endTimeFormatted = format(endDate, 'HH');
    return `오늘 ${endTimeFormatted}시 종료`;
  }

  return '';
}

/**
 * display_hurdle 또는 display_target의 카테고리는 2차 카테고리 여부를 알 수 없으므로
 * hurdle or target의 서브 카테고리를 이용하여 2차 카테고리 여부 확인
 */
export function findCategoryByDisplayCode(categories: CategoryType[], displayCode: string) {
  return categories.find(({ subCategory }) => subCategory?.code?.toString() === displayCode);
}

export function makeCategoryName({
  categories,
  displayCode,
  name,
}: {
  categories: CategoryType[];
  displayCode: string;
  name: string;
}) {
  // 2차 카테고리 존재 시 1차 카테고리 이름을 앞에 반환하기 위해 (ex. '1차 카테고리명 > 2차 카테고리명')
  const category = findCategoryByDisplayCode(categories, displayCode);
  return category ? `${category.name} > ${name}` : name;
}

export function makePrimaryCategoryId({
  categories,
  displayCode,
}: {
  categories: CategoryType[];
  displayCode: string;
}) {
  const category = findCategoryByDisplayCode(categories, displayCode);
  return category ? category.code : displayCode;
}

export function makeSecondaryCategoryId({
  categories,
  displayCode,
}: {
  categories: CategoryType[];
  displayCode: string;
}) {
  const category = findCategoryByDisplayCode(categories, displayCode);
  return category ? category.subCategory.code : null;
}

export function isIosAccessVersion({
  webview,
  userVer,
  compareVer,
}: {
  webview: boolean;
  userVer: string;
  compareVer: string;
}) {
  if (!webview || !isIos) {
    return true;
  }

  return userVer.localeCompare(compareVer, undefined, { numeric: true }) !== -1;
}
