import { isPC } from '../../../../util/window/getDevice';
import { SurveyBenefitText } from './type';
import { isProduction } from '../../../shared/configs/config';

export const CLASS_NAME_DEVICE = isPC ? 'pc' : 'mobile';

export const COUPONPACK_BUTTON_TEXT = '쿠폰팩 변경하기';

export const SURVEY_BENEFIT_TEXT: SurveyBenefitText[] = [
  {
    title: '원하는 혜택을 선택해서 받을 수 있어요.',
    text: '컬리멤버스는 무료 배송 쿠폰과 최대 할인 쿠폰 중 매달 원하는 쿠폰을 선택해서 사용할 수 있어요.',
  },
  {
    title: '컬리멤버스라면 매월 모든 혜택을 0원에 받을 수 있어요. ',
    list: [
      '매월 적립금 2,000원',
      '무료배송 쿠폰 31장 + 할인 쿠폰',
      '멤버스 계란 특가',
      '일일특가 멤버스 추가 할인',
      '커피빈 / CU 쿠폰 (즉시 지급 적립금으로 실 이용료 0원)',
    ],
  },
  {
    title: '컬리멤버스는 매월 0원으로 이용할 수 있어요.',
    text: '구독료를 매월 적립금 2,000원으로 돌려드려서 가입만 해도 이득이에요.',
  },
  {
    title: '컬리 밖에서도 다양한 혜택을 받을 수 있어요.',
    text: '커피빈, CU 등 매월 다양한 제휴사 혜택을 0원으로 받을 수 있어요. (즉시 지급 적립금으로 실 이용료 0원)',
  },
];

export const NAVER_PAY = '네이버페이';
export const KURLY_PAY = '컬리페이';

export const MEMBERS_COLLECTION_CODE = `${isProduction() ? 'kurlymembers-sales' : 'nghfd2ws'}`;
