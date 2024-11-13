import { PaymentVendorsPayload } from '../../src/order/checkout/shared/reducers/checkout-payment.slice';
import { EasyPaymentCardType, EasyPaymentType } from '../../src/shared/interfaces';

export const formattedPaymentVendorFixture: PaymentVendorsPayload = {
  vendors: [
    {
      code: 'kakao-pay',
      name: '카카오페이',
      hasEvent: false,
      isSimplePay: true,
    },
    {
      code: 'toss-payments',
      name: '신용카드',
      hasEvent: false,
      isSimplePay: false,
    },
    {
      code: 'naver-pay',
      name: '네이버페이',
      hasEvent: false,
      isSimplePay: false,
    },
    {
      code: 'toss',
      name: '토스',
      hasEvent: false,
      isSimplePay: true,
    },
    {
      code: 'payco',
      name: '페이코',
      hasEvent: false,
      isSimplePay: true,
    },
    {
      code: 'phonebill',
      name: '휴대폰',
      hasEvent: false,
      isSimplePay: false,
    },
    {
      code: 'kurlypay',
      name: '컬리카드',
      hasEvent: false,
      isSimplePay: false,
    },
  ],
  disableVendorCodes: ['smile-pay', 'mobilians'],
  event: {},
  creditCards: [
    {
      name: '현대',
      value: '61',
    },
    {
      name: '신한',
      value: '41',
    },
    {
      name: '비씨(페이북)',
      value: '31',
    },
    {
      name: 'KB국민',
      value: '11',
    },
    {
      name: '삼성',
      value: '51',
    },
    {
      name: '롯데',
      value: '71',
    },
    {
      name: '하나(외환)',
      value: '21',
    },
    {
      name: 'NH채움',
      value: '91',
    },
    {
      name: '우리',
      value: '33',
    },
    {
      name: '수협',
      value: '34',
    },
    {
      name: '씨티',
      value: '36',
    },
    {
      name: '광주',
      value: '46',
    },
    {
      name: '전북',
      value: '35',
    },
    {
      name: '제주',
      value: '42',
    },
    {
      name: '신협체크',
      value: '62',
    },
    {
      name: 'MG새마을체크',
      value: '38',
    },
    {
      name: '저축은행체크',
      value: '39',
    },
    {
      name: '우체국카드',
      value: '37',
    },
    {
      name: 'KDB산업은행',
      value: '30',
    },
    {
      name: '카카오뱅크',
      value: '15',
    },
  ],
  installments: {
    '11': [
      {
        name: '일시불',
        value: '0',
      },
      {
        name: '2개월 (무이자)',
        value: '2',
      },
      {
        name: '3개월 (무이자)',
        value: '3',
      },
      {
        name: '4개월',
        value: '4',
      },
      {
        name: '5개월',
        value: '5',
      },
      {
        name: '6개월',
        value: '6',
      },
      {
        name: '7개월',
        value: '7',
      },
      {
        name: '8개월',
        value: '8',
      },
      {
        name: '9개월',
        value: '9',
      },
      {
        name: '10개월',
        value: '10',
      },
      {
        name: '11개월',
        value: '11',
      },
      {
        name: '12개월',
        value: '12',
      },
    ],
    '15': [
      {
        name: '일시불',
        value: '0',
      },
      {
        name: '2개월',
        value: '2',
      },
      {
        name: '3개월',
        value: '3',
      },
      {
        name: '4개월',
        value: '4',
      },
      {
        name: '5개월',
        value: '5',
      },
      {
        name: '6개월',
        value: '6',
      },
      {
        name: '7개월',
        value: '7',
      },
      {
        name: '8개월',
        value: '8',
      },
      {
        name: '9개월',
        value: '9',
      },
      {
        name: '10개월',
        value: '10',
      },
      {
        name: '11개월',
        value: '11',
      },
      {
        name: '12개월',
        value: '12',
      },
    ],
    '21': [
      {
        name: '일시불',
        value: '0',
      },
      {
        name: '2개월 (무이자)',
        value: '2',
      },
      {
        name: '3개월 (무이자)',
        value: '3',
      },
      {
        name: '4개월',
        value: '4',
      },
      {
        name: '5개월',
        value: '5',
      },
      {
        name: '6개월',
        value: '6',
      },
      {
        name: '7개월',
        value: '7',
      },
      {
        name: '8개월',
        value: '8',
      },
      {
        name: '9개월',
        value: '9',
      },
      {
        name: '10개월',
        value: '10',
      },
      {
        name: '11개월',
        value: '11',
      },
      {
        name: '12개월',
        value: '12',
      },
    ],
    '30': [
      {
        name: '일시불',
        value: '0',
      },
      {
        name: '2개월',
        value: '2',
      },
      {
        name: '3개월',
        value: '3',
      },
      {
        name: '4개월',
        value: '4',
      },
      {
        name: '5개월',
        value: '5',
      },
      {
        name: '6개월',
        value: '6',
      },
      {
        name: '7개월',
        value: '7',
      },
      {
        name: '8개월',
        value: '8',
      },
      {
        name: '9개월',
        value: '9',
      },
      {
        name: '10개월',
        value: '10',
      },
      {
        name: '11개월',
        value: '11',
      },
      {
        name: '12개월',
        value: '12',
      },
    ],
    '31': [
      {
        name: '일시불',
        value: '0',
      },
      {
        name: '2개월 (무이자)',
        value: '2',
      },
      {
        name: '3개월 (무이자)',
        value: '3',
      },
      {
        name: '4개월 (무이자)',
        value: '4',
      },
      {
        name: '5개월 (무이자)',
        value: '5',
      },
      {
        name: '6개월 (무이자)',
        value: '6',
      },
      {
        name: '7개월',
        value: '7',
      },
      {
        name: '8개월',
        value: '8',
      },
      {
        name: '9개월',
        value: '9',
      },
      {
        name: '10개월',
        value: '10',
      },
      {
        name: '11개월',
        value: '11',
      },
      {
        name: '12개월',
        value: '12',
      },
    ],
    '33': [
      {
        name: '일시불',
        value: '0',
      },
      {
        name: '2개월 (무이자)',
        value: '2',
      },
      {
        name: '3개월 (무이자)',
        value: '3',
      },
      {
        name: '4개월 (무이자)',
        value: '4',
      },
      {
        name: '5개월 (무이자)',
        value: '5',
      },
      {
        name: '6개월 (무이자)',
        value: '6',
      },
      {
        name: '7개월 (무이자)',
        value: '7',
      },
      {
        name: '8개월',
        value: '8',
      },
      {
        name: '9개월',
        value: '9',
      },
      {
        name: '10개월',
        value: '10',
      },
      {
        name: '11개월',
        value: '11',
      },
      {
        name: '12개월',
        value: '12',
      },
    ],
    '34': [
      {
        name: '일시불',
        value: '0',
      },
      {
        name: '2개월',
        value: '2',
      },
      {
        name: '3개월',
        value: '3',
      },
      {
        name: '4개월',
        value: '4',
      },
      {
        name: '5개월',
        value: '5',
      },
      {
        name: '6개월',
        value: '6',
      },
      {
        name: '7개월',
        value: '7',
      },
      {
        name: '8개월',
        value: '8',
      },
      {
        name: '9개월',
        value: '9',
      },
      {
        name: '10개월',
        value: '10',
      },
      {
        name: '11개월',
        value: '11',
      },
      {
        name: '12개월',
        value: '12',
      },
    ],
    '35': [
      {
        name: '일시불',
        value: '0',
      },
      {
        name: '2개월 (무이자)',
        value: '2',
      },
      {
        name: '3개월 (무이자)',
        value: '3',
      },
      {
        name: '4개월 (무이자)',
        value: '4',
      },
      {
        name: '5개월 (무이자)',
        value: '5',
      },
      {
        name: '6개월',
        value: '6',
      },
      {
        name: '7개월',
        value: '7',
      },
      {
        name: '8개월',
        value: '8',
      },
      {
        name: '9개월',
        value: '9',
      },
      {
        name: '10개월',
        value: '10',
      },
      {
        name: '11개월',
        value: '11',
      },
      {
        name: '12개월',
        value: '12',
      },
    ],
    '36': [
      {
        name: '일시불',
        value: '0',
      },
      {
        name: '2개월',
        value: '2',
      },
      {
        name: '3개월',
        value: '3',
      },
      {
        name: '4개월',
        value: '4',
      },
      {
        name: '5개월',
        value: '5',
      },
      {
        name: '6개월',
        value: '6',
      },
      {
        name: '7개월',
        value: '7',
      },
      {
        name: '8개월',
        value: '8',
      },
      {
        name: '9개월',
        value: '9',
      },
      {
        name: '10개월',
        value: '10',
      },
      {
        name: '11개월',
        value: '11',
      },
      {
        name: '12개월',
        value: '12',
      },
    ],
    '37': [
      {
        name: '일시불',
        value: '0',
      },
      {
        name: '2개월',
        value: '2',
      },
      {
        name: '3개월',
        value: '3',
      },
      {
        name: '4개월',
        value: '4',
      },
      {
        name: '5개월',
        value: '5',
      },
      {
        name: '6개월',
        value: '6',
      },
      {
        name: '7개월',
        value: '7',
      },
      {
        name: '8개월',
        value: '8',
      },
      {
        name: '9개월',
        value: '9',
      },
      {
        name: '10개월',
        value: '10',
      },
      {
        name: '11개월',
        value: '11',
      },
      {
        name: '12개월',
        value: '12',
      },
    ],
    '38': [
      {
        name: '일시불',
        value: '0',
      },
      {
        name: '2개월',
        value: '2',
      },
      {
        name: '3개월',
        value: '3',
      },
      {
        name: '4개월',
        value: '4',
      },
      {
        name: '5개월',
        value: '5',
      },
      {
        name: '6개월',
        value: '6',
      },
      {
        name: '7개월',
        value: '7',
      },
      {
        name: '8개월',
        value: '8',
      },
      {
        name: '9개월',
        value: '9',
      },
      {
        name: '10개월',
        value: '10',
      },
      {
        name: '11개월',
        value: '11',
      },
      {
        name: '12개월',
        value: '12',
      },
    ],
    '39': [
      {
        name: '일시불',
        value: '0',
      },
      {
        name: '2개월',
        value: '2',
      },
      {
        name: '3개월',
        value: '3',
      },
      {
        name: '4개월',
        value: '4',
      },
      {
        name: '5개월',
        value: '5',
      },
      {
        name: '6개월',
        value: '6',
      },
      {
        name: '7개월',
        value: '7',
      },
      {
        name: '8개월',
        value: '8',
      },
      {
        name: '9개월',
        value: '9',
      },
      {
        name: '10개월',
        value: '10',
      },
      {
        name: '11개월',
        value: '11',
      },
      {
        name: '12개월',
        value: '12',
      },
    ],
    '41': [
      {
        name: '일시불',
        value: '0',
      },
      {
        name: '2개월 (무이자)',
        value: '2',
      },
      {
        name: '3개월 (무이자)',
        value: '3',
      },
      {
        name: '4개월',
        value: '4',
      },
      {
        name: '5개월',
        value: '5',
      },
      {
        name: '6개월',
        value: '6',
      },
      {
        name: '7개월',
        value: '7',
      },
      {
        name: '8개월',
        value: '8',
      },
      {
        name: '9개월',
        value: '9',
      },
      {
        name: '10개월',
        value: '10',
      },
      {
        name: '11개월',
        value: '11',
      },
      {
        name: '12개월',
        value: '12',
      },
    ],
    '42': [
      {
        name: '일시불',
        value: '0',
      },
      {
        name: '2개월',
        value: '2',
      },
      {
        name: '3개월',
        value: '3',
      },
      {
        name: '4개월',
        value: '4',
      },
      {
        name: '5개월',
        value: '5',
      },
      {
        name: '6개월',
        value: '6',
      },
      {
        name: '7개월',
        value: '7',
      },
      {
        name: '8개월',
        value: '8',
      },
      {
        name: '9개월',
        value: '9',
      },
      {
        name: '10개월',
        value: '10',
      },
      {
        name: '11개월',
        value: '11',
      },
      {
        name: '12개월',
        value: '12',
      },
    ],
    '46': [
      {
        name: '일시불',
        value: '0',
      },
      {
        name: '2개월 (무이자)',
        value: '2',
      },
      {
        name: '3개월 (무이자)',
        value: '3',
      },
      {
        name: '4개월 (무이자)',
        value: '4',
      },
      {
        name: '5개월 (무이자)',
        value: '5',
      },
      {
        name: '6개월 (무이자)',
        value: '6',
      },
      {
        name: '7개월 (무이자)',
        value: '7',
      },
      {
        name: '8개월',
        value: '8',
      },
      {
        name: '9개월',
        value: '9',
      },
      {
        name: '10개월',
        value: '10',
      },
      {
        name: '11개월',
        value: '11',
      },
      {
        name: '12개월',
        value: '12',
      },
    ],
    '51': [
      {
        name: '일시불',
        value: '0',
      },
      {
        name: '2개월 (무이자)',
        value: '2',
      },
      {
        name: '3개월 (무이자)',
        value: '3',
      },
      {
        name: '4개월',
        value: '4',
      },
      {
        name: '5개월',
        value: '5',
      },
      {
        name: '6개월',
        value: '6',
      },
      {
        name: '7개월',
        value: '7',
      },
      {
        name: '8개월',
        value: '8',
      },
      {
        name: '9개월',
        value: '9',
      },
      {
        name: '10개월',
        value: '10',
      },
      {
        name: '11개월',
        value: '11',
      },
      {
        name: '12개월',
        value: '12',
      },
    ],
    '61': [
      {
        name: '일시불',
        value: '0',
      },
      {
        name: '2개월 (무이자)',
        value: '2',
      },
      {
        name: '3개월 (무이자)',
        value: '3',
      },
      {
        name: '4개월',
        value: '4',
      },
      {
        name: '5개월',
        value: '5',
      },
      {
        name: '6개월',
        value: '6',
      },
      {
        name: '7개월',
        value: '7',
      },
      {
        name: '8개월',
        value: '8',
      },
      {
        name: '9개월',
        value: '9',
      },
      {
        name: '10개월',
        value: '10',
      },
      {
        name: '11개월',
        value: '11',
      },
      {
        name: '12개월',
        value: '12',
      },
    ],
    '62': [
      {
        name: '일시불',
        value: '0',
      },
      {
        name: '2개월',
        value: '2',
      },
      {
        name: '3개월',
        value: '3',
      },
      {
        name: '4개월',
        value: '4',
      },
      {
        name: '5개월',
        value: '5',
      },
      {
        name: '6개월',
        value: '6',
      },
      {
        name: '7개월',
        value: '7',
      },
      {
        name: '8개월',
        value: '8',
      },
      {
        name: '9개월',
        value: '9',
      },
      {
        name: '10개월',
        value: '10',
      },
      {
        name: '11개월',
        value: '11',
      },
      {
        name: '12개월',
        value: '12',
      },
    ],
    '71': [
      {
        name: '일시불',
        value: '0',
      },
      {
        name: '2개월 (무이자)',
        value: '2',
      },
      {
        name: '3개월 (무이자)',
        value: '3',
      },
      {
        name: '4개월',
        value: '4',
      },
      {
        name: '5개월',
        value: '5',
      },
      {
        name: '6개월',
        value: '6',
      },
      {
        name: '7개월',
        value: '7',
      },
      {
        name: '8개월',
        value: '8',
      },
      {
        name: '9개월',
        value: '9',
      },
      {
        name: '10개월',
        value: '10',
      },
      {
        name: '11개월',
        value: '11',
      },
      {
        name: '12개월',
        value: '12',
      },
    ],
    '91': [
      {
        name: '일시불',
        value: '0',
      },
      {
        name: '2개월 (무이자)',
        value: '2',
      },
      {
        name: '3개월 (무이자)',
        value: '3',
      },
      {
        name: '4개월 (무이자)',
        value: '4',
      },
      {
        name: '5개월',
        value: '5',
      },
      {
        name: '6개월',
        value: '6',
      },
      {
        name: '7개월',
        value: '7',
      },
      {
        name: '8개월',
        value: '8',
      },
      {
        name: '9개월',
        value: '9',
      },
      {
        name: '10개월',
        value: '10',
      },
      {
        name: '11개월',
        value: '11',
      },
      {
        name: '12개월',
        value: '12',
      },
    ],
  },
  freeInterestInstallments: [
    {
      name: '현대카드',
      value: '2~3개월 무이자',
    },
    {
      name: '신한카드',
      value: '2~3개월 무이자',
    },
    {
      name: '비씨(페이북)카드',
      value: '2~6개월 무이자',
    },
    {
      name: 'KB국민카드',
      value: '2~3개월 무이자',
    },
    {
      name: '삼성카드',
      value: '2~3개월 무이자',
    },
    {
      name: '롯데카드',
      value: '2~3개월 무이자',
    },
    {
      name: '하나(외환)카드',
      value: '2~3개월 무이자',
    },
    {
      name: 'NH채움카드',
      value: '2~4개월 무이자',
    },
    {
      name: '우리카드',
      value: '2~7개월 무이자',
    },
    {
      name: '광주카드',
      value: '2~7개월 무이자',
    },
    {
      name: '전북카드',
      value: '2~5개월 무이자',
    },
  ],
  simplePaymentVendors: [
    {
      code: 'naver-pay',
      name: '네이버페이',
      hasEvent: false,
      isSimplePay: true,
    },
    {
      code: 'toss',
      name: '토스',
      hasEvent: false,
      isSimplePay: true,
    },
    {
      code: 'payco',
      name: '페이코',
      hasEvent: false,
      isSimplePay: true,
    },
  ],
  kurlypayVendors: [
    {
      paymentMethodId: '55F8658DA58333FD7F677DF8F7E3D5456C2DEE8C715C1ADF7EEDCA0BEE09A90DH11',
      paymentType: EasyPaymentType.CARD,
      companyId: 'P1',
      companyName: '컬리카드',
      maskingNo: '377374******066',
      cardType: EasyPaymentCardType.CREDIT_CARD,
      isDisabled: false,
      cardHolderType: 'personal',
      imageUrl: 'https://pg.stg.kurlypay.co.kr/api//img/kurlypay/card/kurlycard/kurlycard_mykurly_purple.png',
      lastPaymentDateTime: '202401130222',
      registrationDateTime: '202401130222',
      installments: [
        {
          name: '일시불',
          value: '0',
        },
        {
          name: '2개월 (무이자)',
          value: '2',
        },
        {
          name: '3개월 (무이자)',
          value: '3',
        },
        {
          name: '4개월',
          value: '4',
        },
        {
          name: '5개월',
          value: '5',
        },
        {
          name: '6개월',
          value: '6',
        },
        {
          name: '7개월',
          value: '7',
        },
        {
          name: '8개월',
          value: '8',
        },
        {
          name: '9개월',
          value: '9',
        },
        {
          name: '10개월',
          value: '10',
        },
        {
          name: '11개월',
          value: '11',
        },
        {
          name: '12개월',
          value: '12',
        },
      ],
    },
    {
      paymentMethodId: '125DD13CB829D91160FA67914FF1F19FFDADE2861BC00611FA1A4EEA07D201A7SCC',
      paymentType: EasyPaymentType.CARD,
      companyId: '11',
      companyName: 'KB국민카드',
      maskingNo: '557042******1048',
      cardType: EasyPaymentCardType.CREDIT_CARD,
      isDisabled: false,
      cardHolderType: 'personal',
      imageUrl: 'https://pg.stg.kurlypay.co.kr/api/img/kurlypay/card/card-kb.png',
      lastPaymentDateTime: '202401130222',
      registrationDateTime: '202401130222',
      installments: [
        {
          name: '일시불',
          value: '0',
        },
        {
          name: '2개월',
          value: '2',
        },
        {
          name: '3개월',
          value: '3',
        },
        {
          name: '4개월',
          value: '4',
        },
        {
          name: '5개월',
          value: '5',
        },
        {
          name: '6개월 (무이자)',
          value: '6',
        },
        {
          name: '7개월',
          value: '7',
        },
        {
          name: '8개월',
          value: '8',
        },
        {
          name: '9개월',
          value: '9',
        },
        {
          name: '10개월',
          value: '10',
        },
        {
          name: '11개월',
          value: '11',
        },
        {
          name: '12개월',
          value: '12',
        },
      ],
    },
    {
      paymentMethodId: '123123123124421aadadqwdqd',
      paymentType: EasyPaymentType.CARD,
      companyId: '31',
      companyName: '비씨카드',
      maskingNo: '123456******1048',
      cardType: EasyPaymentCardType.CREDIT_CARD,
      isDisabled: false,
      imageUrl: 'https://pg.stg.kurlypay.co.kr/api/img/kurlypay/card/card-bc.png',

      cardHolderType: 'personal',

      installments: [
        {
          name: '일시불',
          value: '0',
        },
        {
          name: '2개월',
          value: '2',
        },
        {
          name: '3개월',
          value: '3',
        },
        {
          name: '4개월',
          value: '4',
        },
        {
          name: '5개월',
          value: '5',
        },
        {
          name: '6개월 (무이자)',
          value: '6',
        },
        {
          name: '7개월',
          value: '7',
        },
        {
          name: '8개월',
          value: '8',
        },
        {
          name: '9개월',
          value: '9',
        },
        {
          name: '10개월',
          value: '10',
        },
        {
          name: '11개월',
          value: '11',
        },
        {
          name: '12개월',
          value: '12',
        },
      ],
      lastPaymentDateTime: '',
      registrationDateTime: '',
    },
    {
      paymentMethodId: 'add-kurlypay-card',
      paymentType: EasyPaymentType.ADD_KURLYPAY,
      companyId: null,
      companyName: '',
      maskingNo: '',
      cardType: null,
      isDisabled: false,
      installments: [],
      imageUrl: '',
      cardHolderType: '',
      lastPaymentDateTime: '202401130222',
      registrationDateTime: '202401130222',
    },
  ],
  plccDiscountPrice: 30000,
  hasKurlypayError: false,
  hasRegisteredCashReceipt: false,
  isPLCCExisted: true,
  isKurlypayMember: false,
};
