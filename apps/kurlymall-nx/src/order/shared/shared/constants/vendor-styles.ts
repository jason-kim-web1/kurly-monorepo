import { VendorCode } from '../interfaces';

import COLOR from '../../../../shared/constant/colorset';

interface VendorStyle {
  name: string;
  color: string;
  fullWidth: boolean;
  icon?: {
    on: string;
    off: string;
  };
}

export const vendorStyles: Record<VendorCode, VendorStyle> = {
  'kakao-pay': {
    name: '카카오페이',
    color: COLOR.kakaoBg,
    fullWidth: true,
    icon: {
      on: 'https://res.kurly.com/mobile/service/order/2105/ico_kakaopay.png',
      off: 'https://res.kurly.com/mobile/service/order/2105/ico_kakaopay.png',
    },
  },
  'toss-payments': {
    name: '신용카드',
    color: '#5f0081',
    fullWidth: false,
  },
  'kurlypay-credit': {
    name: '신용카드',
    color: '#5f0081',
    fullWidth: false,
  },
  toss: {
    name: '토스',
    color: '#0050fe',
    fullWidth: false,
    icon: {
      on: 'https://res.kurly.com/mobile/service/order/2105/ico_toss_on.png',
      off: 'https://res.kurly.com/mobile/service/order/2105/ico_toss.png',
    },
  },
  'naver-pay': {
    name: '네이버페이',
    color: '#00c73c',
    fullWidth: false,
    icon: {
      on: 'https://res.kurly.com/mobile/service/order/2105/ico_naverpay_on.png',
      off: 'https://res.kurly.com/mobile/service/order/2105/ico_naverpay.png',
    },
  },
  payco: {
    name: '페이코',
    color: '#e6241f',
    fullWidth: false,
    icon: {
      on: 'https://res.kurly.com/mobile/service/order/2105/ico_payco_on.png',
      off: 'https://res.kurly.com/mobile/service/order/2105/ico_payco.png',
    },
  },
  phonebill: {
    name: '휴대폰',
    color: '#5f0081',
    fullWidth: false,
  },
  kurlypay: {
    name: '컬리페이',
    color: COLOR.kurlyPurple,
    fullWidth: false,
  },
};
