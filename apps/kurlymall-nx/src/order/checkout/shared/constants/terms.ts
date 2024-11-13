import { ThirdPartTermsContentType } from '../../../../shared/interfaces/UserTerms';

export const STORAGE_PERIOD = '업무목적 달성 후 파기(단, 타법령에따라 법령에서 규정한 기간동안 보존)';

export const ALCOHOL_DEFAULT_CONTENT: ThirdPartTermsContentType = {
  type: '(주류 상품 구매시)',
  items: ['구매자 정보(이름, 주소), 주문일자, 상품명, 수량, 주문금액'],
  purpose: '국세청 고시에 따른 주류 통신판매 주문에 대한 분기별 신고',
};

export const SHIPPING_CONTENT: ThirdPartTermsContentType = {
  type: '(배송 상품 구매시)',
  items: [
    '구매자 정보(이름, 휴대폰번호, 주소, 공동현관 비밀번호), 배송일자, 구매상품정보',
    '*관세청 통관 처리 필요 상품 구매시 : 개인통관고유부호',
  ],
  purpose: '서비스 제공(상품 배송, 설치), 고객 상담 및 불만처리',
};

export const TRAVEL_CONTENT: ThirdPartTermsContentType = {
  type: '(숙박 및 여행 상품 구매시)',
  items: [
    '구매자 정보(이름, 휴대폰 번호, 이메일), 투숙자 정보(이름, 휴대폰 번호, 생년월일, 성별), 예약일자, 구매상품정보',
  ],
  purpose: '서비스 제공(숙박, 항공, 여행상품 예약 및 취소), 고객 상담 및 불만처리',
};

export const AIRLINE_CONTENT: ThirdPartTermsContentType = {
  type: '(항공 상품 구매시)',
  items: [
    '구매자 정보(이름, 휴대폰 번호, 이메일), 탑승자 정보(이름, 휴대폰번호, 생년월일, 성별), 예약일자, 구매상품정보',
  ],
  purpose: '서비스 제공(항공 상품 예약 및 취소), 고객 상담 및 불만처리',
};

export const CULTURE_CONTENT: ThirdPartTermsContentType = {
  type: '(문화/컨텐츠 상품 구매 시)',
  items: ['구매자 정보(이름, 휴대폰번호), 예약일자, 구매상품정보'],
  purpose: '서비스 제공(구매자 확인), 고객 상담 및 불만 처리',
};

export const AS_CONTENT: ThirdPartTermsContentType = {
  type: '(A/S 지원 상품 구매 시)',
  items: ['구매자 정보(이름, 휴대폰번호), 구매상품정보'],
  purpose: '서비스 제공(상품 교환, 반품), 고객 상담 및 불만 처리',
};

export const PICKUP_CONTENT: ThirdPartTermsContentType = {
  type: '(픽업 상품 구매 시)',
  items: ['구매자 정보(이름, 휴대폰번호), 예약일자, 구매상품정보'],
  purpose: '서비스 제공(구매자 확인), 고객 상담 및 불만 처리',
};

export const ALCOHOL_CONTENT: ThirdPartTermsContentType = {
  type: '(주류 상품 구매 시)',
  items: [
    '구매자 정보(이름, 주소), 주문일자, 상품명, 수량, 주문금액',
    '*판매자 배송 시 추가 : 휴대폰번호, 공동현관 비밀번호',
  ],
  purpose: '서비스 제공(상품 배송), 고객 상담 및 불만 처리',
};
