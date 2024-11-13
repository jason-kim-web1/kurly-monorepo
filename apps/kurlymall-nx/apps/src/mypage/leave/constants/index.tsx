import { ActiveServiceInfo, LeaveTitleText } from '../interface/Leave.interface';

export const REASON_CODES = [
  {
    name: '고객서비스(상담,포장 등) 불만',
    value: '01',
  },
  {
    name: '배송불만',
    value: '02',
  },
  {
    name: '교환/환불/반품 불만',
    value: '03',
  },
  {
    name: '방문 빈도가 낮음',
    value: '04',
  },
  {
    name: '상품가격 불만',
    value: '05',
  },
  {
    name: '개인 정보유출 우려',
    value: '06',
  },
  {
    name: '쇼핑몰의 신뢰도 불만',
    value: '07',
  },
  {
    name: '쇼핑 기능 불만',
    value: '08',
  },
];

export const GUIDE_TOP_INFO: LeaveTitleText = {
  title: '회원 탈퇴 불가 안내',
  text: '아래 불가 사유로 인해 즉시 탈퇴처리가 불가합니다. 아래 사유를 확인해주세요.',
};

export const ACTIVE_SERVICE_INFO: ActiveServiceInfo = {
  title: '이용중인 서비스',
  kurlyMembersName: '컬리멤버스',
  kurlyPayName: '컬리페이',
};

export const IMPOSSIBLE_WITHDRAWAL_PAGE_ACTIVE = {
  name: 'impossible_withdrawal_page_active',
  value: {
    active: 'true',
    inactive: '',
  },
};
