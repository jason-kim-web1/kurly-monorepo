import { ParsedUrlQuery } from 'querystring';

import { PAYMENT_TERMS_ID, PaymentTermsArray } from '../../../../order/subscribe/constants';
import { RESOURCE_URL } from '../../../../shared/configs/config';

export enum Agreed {
  termsAll = 'termsAllAgreed',
  terms = 'termsAgreed',
  marketing = 'marketingAgreed',
}

const selectedTerms = PaymentTermsArray.filter((term) =>
  [PAYMENT_TERMS_ID.NORMAL, PAYMENT_TERMS_ID.MARKETING].includes(term.id),
).map(({ id, label, required, link }) => ({
  id: id === PAYMENT_TERMS_ID.NORMAL ? Agreed.terms : Agreed.marketing,
  label,
  required,
  total: false,
  link: link || '',
}));

export const termsArray = [
  { id: Agreed.termsAll, label: '약관 전체 동의', total: true, required: false, link: '' },
  ...selectedTerms,
];

export const CONFIRM_BUTTON_ARRAY = [
  { id: 'inactiveConfirmButton', active: false, loading: false },
  { id: 'activeConfirmButton', active: true, loading: false },
  { id: 'loadingConfirmButton', active: true, loading: true },
];

export const MEMBERS_BUTTON_ID = 'membership-button';

export const LOVERS_CAUTION_TEXT = '컬리멤버스 가입시, 러버스 등급 혜택이 지급되지 않습니다.';

export const LINK_COPY_MESSAGE = '이 글의 URL이 클립보드에 복사되었습니다.';

export const SHARE_IMAGE_URL = {
  titleSharePC: `${RESOURCE_URL}/images/event/common/pc/tit_share.png`,
  iconKakaoPC: `${RESOURCE_URL}/images/event/common/pc/ico_share_kakao.png`,
  textKakaoPC: `${RESOURCE_URL}/images/event/common/pc/txt_share_kakao.png`,
  iconCopyUrlPC: `${RESOURCE_URL}/images/event/common/pc/ico_share_url.png`,
  textCopyUrlPC: `${RESOURCE_URL}/images/event/common/pc/txt_share_url.png`,
  titleShareMo: `${RESOURCE_URL}/images/event/common/m/tit_share.png`,
  iconKakaoMo: `${RESOURCE_URL}/images/event/common/m/ico_share_kakao.png`,
  textKakaoMo: `${RESOURCE_URL}/images/event/common/m/txt_share_kakao_v2.png`,
  iconCopyUrlMo: `${RESOURCE_URL}/images/event/common/m/ico_share_url.png`,
  textCopyUrlMo: `${RESOURCE_URL}/images/event/common/m/txt_share_url_v2.png`,
};

export const AFFILILATE_BENEFIT_TITLE = '나의 제휴 혜택';

export const AFFILILATE_BENEFIT_NOTICE = [
  '제휴 혜택은 월 1회 제공됩니다.',
  '전월 미등록한 제휴 쿠폰 정보는 추가 제공이 어렵습니다.',
  '혜택 바로가기 클릭 시 제공되는 링크는 모바일 기준으로 제공됩니다.',
  '제휴사별 혜택 등록 방법은 각 안내사항을 참고해주세요.',
];

export const getMembershipQueryData = (query: ParsedUrlQuery): { showTerms: boolean; paymentMethodId: string } => {
  return {
    showTerms: query.openTerms === 'true',
    paymentMethodId: query.paymentMethodId as string,
  };
};
