import { CardVenderCode } from '../../src/shared/constant';
import { EasyPaymentCardType, EasyPaymentType, KurlypayVendor } from '../../src/shared/interfaces';

export const ADD_KURYPAY_GOST_CARD: KurlypayVendor = {
  paymentMethodId: 'add-kurlypay-card',
  paymentType: EasyPaymentType.ADD_KURLYPAY,
  companyId: null,
  companyName: '',
  maskingNo: '',
  cardType: null,
  imageUrl: '',
  installments: [],
  isDisabled: false,
  cardHolderType: '',
  lastPaymentDateTime: '202401130222',
  registrationDateTime: '202401130222',
};

export const ADD_PLCC_LOTTIE_CARD: KurlypayVendor = {
  paymentMethodId: 'plcc-lottie',
  paymentType: EasyPaymentType.ADD_PLCC,
  companyId: CardVenderCode.KURLYPAY_CARD,
  companyName: '컬리카드',
  maskingNo: '',
  cardType: null,
  imageUrl: '',
  installments: [],
  isDisabled: false,
  cardHolderType: '',
  lastPaymentDateTime: '202401130222',
  registrationDateTime: '202401130222',
};

export const KURLYPAY_HYUNDAI_CREDITCARD: KurlypayVendor = {
  paymentMethodId: 'C6A9C45F9942AC30DAFF553FD5EEC26565B907DDE1930BFED390EC0993EDFD93Q6Z',
  paymentType: EasyPaymentType.CARD,
  companyId: '61',
  companyName: '현대카드',
  maskingNo: '489016******7803',
  cardType: EasyPaymentCardType.CREDIT_CARD,
  lastPaymentDateTime: '202401130222',
  registrationDateTime: '202401130222',
  imageUrl: 'https://pg.stg.kurlypay.co.kr/api/img/kurlypay/card/card-hyundai.png',
  isDisabled: false,
  cardHolderType: 'personal',
  installments: [
    {
      name: '일시불',
      value: '0',
    },
  ],
};

export const KURLYPAY_SHINHAN_CREDITCARD: KurlypayVendor = {
  paymentMethodId: '12345',
  paymentType: EasyPaymentType.CARD,
  companyId: '41',
  companyName: '신한카드',
  maskingNo: '123456******7803',
  cardType: EasyPaymentCardType.CREDIT_CARD,
  lastPaymentDateTime: '202401130222',
  registrationDateTime: '202401130222',
  imageUrl: 'https://pg.stg.kurlypay.co.kr/api/img/kurlypay/card/card-shinhan.png',
  isDisabled: false,
  cardHolderType: 'personal',
  installments: [
    {
      name: '일시불',
      value: '0',
    },
  ],
};

export const KURLYPAY_KB_CREDITCARD: KurlypayVendor = {
  paymentMethodId: 'DCACC0901E3927E8284E84DD3EDAE16826D22A8349BB51F8EBBFEC918F7D5003BGB',
  paymentType: EasyPaymentType.CARD,
  companyId: '11',
  companyName: 'KB국민카드',
  maskingNo: '949094******2047',
  cardType: EasyPaymentCardType.CREDIT_CARD,
  lastPaymentDateTime: '202401130222',
  registrationDateTime: '202401130222',
  imageUrl: 'https://pg.stg.kurlypay.co.kr/api/img/kurlypay/card/card-kb.png',
  isDisabled: false,
  cardHolderType: 'personal',
  installments: [
    {
      name: '일시불',
      value: '0',
    },
  ],
};

export const KURLYPAY_BC_CREDITCARD: KurlypayVendor = {
  paymentMethodId: '123412314',
  paymentType: EasyPaymentType.CARD,
  companyId: '31',
  companyName: 'BC카드',
  maskingNo: '944095******7503',
  cardType: EasyPaymentCardType.CREDIT_CARD,
  lastPaymentDateTime: '202401130222',
  registrationDateTime: '202401130222',
  imageUrl: 'https://pg.stg.kurlypay.co.kr/api/img/kurlypay/card/card-bc.png',
  isDisabled: false,
  cardHolderType: 'personal',
  installments: [
    {
      name: '일시불',
      value: '0',
    },
  ],
};

export const KURLYPAY_VENDORS_WITHOUT_PLCC: KurlypayVendor[] = [
  KURLYPAY_HYUNDAI_CREDITCARD,
  KURLYPAY_SHINHAN_CREDITCARD,
  KURLYPAY_KB_CREDITCARD,
  KURLYPAY_BC_CREDITCARD,
  ADD_PLCC_LOTTIE_CARD, // PLCC 로띠 카드
  ADD_KURYPAY_GOST_CARD, // 컬리페이 추가 고스트 카드
];

export const KURLYPAY_PLCC_CREDITCARD: KurlypayVendor = {
  paymentMethodId: '55F8658DA58333FD7F677DF8F7E3D5456C2DEE8C715C1ADF7EEDCA0BEE09A90DH11',
  paymentType: EasyPaymentType.CARD,
  companyId: 'P1',
  companyName: '컬리카드',
  maskingNo: '377374******066',
  cardType: EasyPaymentCardType.CREDIT_CARD,
  lastPaymentDateTime: '202401130222',
  registrationDateTime: '202401130222',
  imageUrl: 'https://pg.stg.kurlypay.co.kr/api//img/kurlypay/card/kurlycard/kurlycard_mykurly_purple.png',
  isDisabled: false,
  cardHolderType: 'personal',
  installments: [
    {
      name: '일시불',
      value: '0',
    },
  ],
};

export const KURLYPAY_VENDORS_WITH_PLCC: KurlypayVendor[] = [
  KURLYPAY_HYUNDAI_CREDITCARD,
  KURLYPAY_SHINHAN_CREDITCARD,
  KURLYPAY_KB_CREDITCARD,
  KURLYPAY_BC_CREDITCARD,
  KURLYPAY_PLCC_CREDITCARD, // PLCC 카드
  ADD_KURYPAY_GOST_CARD, // 컬리페이 추가 고스트 카드
];

export const DEFAULT_KURLYPAY_VENDORS: KurlypayVendor[] = [
  ADD_PLCC_LOTTIE_CARD, // PLCC 로띠 카드
  ADD_KURYPAY_GOST_CARD, // 컬리페이 추가 고스트 카드
];
