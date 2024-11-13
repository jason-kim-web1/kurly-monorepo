import { CreditCard } from '../../src/order/shared/shared/interfaces';

export const HYUNDAI_CARD: CreditCard = { name: '현대', value: '61' };
export const BC_CARD: CreditCard = { name: '비씨(페이북)', value: '31' };
export const SHINHAN_CARD: CreditCard = { name: '신한', value: '41' };
export const KB_CARD: CreditCard = { name: 'KB국민', value: '11' };
export const SAMSUNG_CARD: CreditCard = { name: '삼성', value: '51' };

export const CreditCardFixture: CreditCard[] = [
  HYUNDAI_CARD,
  SHINHAN_CARD,
  BC_CARD,
  KB_CARD,
  SAMSUNG_CARD,
  { name: '롯데', value: '71' },
  { name: '하나(외환)', value: '21' },
  { name: 'NH채움', value: '91' },
  { name: '우리', value: '33' },
  { name: '수협', value: '34' },
  { name: '씨티', value: '36' },
  { name: '광주', value: '46' },
  { name: '전북', value: '35' },
  { name: '제주', value: '42' },
  { name: '신협체크', value: '62' },
  { name: 'MG새마을체크', value: '38' },
  { name: '저축은행체크', value: '39' },
  { name: '우체국카드', value: '37' },
  { name: 'KDB산업은행', value: '30' },
  { name: '카카오뱅크', value: '15' },
];
