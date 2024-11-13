import {
  createInstallments,
  formattedCreditCards,
  formattedEvent,
  formattedInstallments,
  formattedFreeInterestInstallments,
  formattedKurlypayPaymentMethods,
  formattedPaymentVendors,
  getCheckContinuity,
  getPreviousVendor,
  isPlccExisted,
} from '.';
import {
  formattedKurlypayVendors,
  KurlypayAddVendor,
  KurlypayCardsWithoutPLCC,
  KurlypayPlccLottieVendor,
  paymentMethodResponse,
  paymentMethodResponseWithKurlypayError,
  paymentMethodResponseWithoutPLCC,
} from '../../../../../fixtures';
import { postCheckContinuity, readPaymentMethods, readPreferenceMethods } from '../../../../shared/api';
import { CheckoutType, CreditCardCompanies, PageType } from '../../../../shared/interfaces';
import { Grade } from '../../../../shared/enums';

jest.mock('../../../../shared/api');

describe('Payment service', () => {
  const { paymentMethods, kurlypayEasyPayment } = paymentMethodResponse;

  const mockCreditCards: CreditCardCompanies[] = [
    {
      companyId: '31',
      companyName: '비씨',
      freeInterestInstallmentMonths: [5, 6],
      defaultInstallmentMonths: [2, 3, 4, 5, 6],
    },
    {
      companyId: '61',
      companyName: '현대',
      freeInterestInstallmentMonths: [],
      defaultInstallmentMonths: [2, 3, 4, 5, 6],
    },
    {
      companyId: '11',
      companyName: '국민',
      freeInterestInstallmentMonths: [],
      defaultInstallmentMonths: [],
    },
    {
      companyId: '33',
      companyName: '우리',
      freeInterestInstallmentMonths: [2],
      defaultInstallmentMonths: [2],
    },
  ];

  beforeEach(() => {
    (readPaymentMethods as jest.Mock).mockResolvedValue(paymentMethodResponse);
  });

  describe('isPlccExisted', () => {
    context('컬리페이 결제수단에 컬리카드가 있으면', () => {
      it('true 를 return 한다.', () => {
        expect(isPlccExisted(formattedKurlypayVendors)).toBeTruthy();
      });
    });

    context('컬리페이 결제수단에 컬리카드가 없으면', () => {
      it('false 를 return 한다.', () => {
        expect(isPlccExisted(KurlypayCardsWithoutPLCC)).toBeFalsy();
      });
    });
  });

  describe('formattedCreditCards', () => {
    it('신용카드 결제 수단의 데이터 구조를 { name, value } 의 객체 배열로 구조화 한다', () => {
      const creditCards = formattedCreditCards(mockCreditCards);

      expect(creditCards).toEqual([
        { name: '비씨', value: '31' },
        { name: '현대', value: '61' },
        { name: '국민', value: '11' },
        { name: '우리', value: '33' },
      ]);
    });
  });

  describe('formattedInstallments', () => {
    it('신용카드사의 일시불 정보를 { 신용카드사id: 일시불[] } 로 구조화 한다.', () => {
      const installments = formattedInstallments(mockCreditCards);

      expect(installments).toEqual({
        '31': [
          { name: '일시불', value: '0' },
          { name: '2개월', value: '2' },
          { name: '3개월', value: '3' },
          { name: '4개월', value: '4' },
          { name: '5개월 (무이자)', value: '5' },
          { name: '6개월 (무이자)', value: '6' },
        ],
        '61': [
          { name: '일시불', value: '0' },
          { name: '2개월', value: '2' },
          { name: '3개월', value: '3' },
          { name: '4개월', value: '4' },
          { name: '5개월', value: '5' },
          { name: '6개월', value: '6' },
        ],
        '11': [{ name: '일시불', value: '0' }],
        '33': [
          { name: '일시불', value: '0' },
          { name: '2개월 (무이자)', value: '2' },
        ],
      });
    });
  });

  describe('createInstallments', () => {
    context('기본 할부목록과 무이자 할부 목록이 있으면', () => {
      const freeInterestInstallmentMonths = [2, 3, 4];
      const defaultInstallmentMonths = [2, 3, 4, 5, 6];

      it('{ name, value }[] 형식의 할부 배열을 return 한다.', () => {
        const installment = createInstallments(defaultInstallmentMonths, freeInterestInstallmentMonths);

        expect(installment).toEqual([
          { name: '일시불', value: '0' },
          { name: '2개월 (무이자)', value: '2' },
          { name: '3개월 (무이자)', value: '3' },
          { name: '4개월 (무이자)', value: '4' },
          { name: '5개월', value: '5' },
          { name: '6개월', value: '6' },
        ]);
      });
    });
  });

  describe('formattedFreeInterestInstallments', () => {
    it('신용카드사의 무이자 혜택 기간 정보를 { 신용카드사 이름 + 카드, 무이자 혜택 최소기간~최대기간} 로 구조화 한다.', () => {
      const freeInterestInstallments = formattedFreeInterestInstallments(mockCreditCards);

      expect(freeInterestInstallments).toEqual([
        { name: '비씨카드', value: '5~6개월 무이자' },
        { name: '우리카드', value: '2개월 무이자' },
      ]);
    });
  });

  describe('formattedEvent', () => {
    it('각 결제수단의 이벤트 목록을 구조화 하여 return 한다.', () => {
      const event = formattedEvent(paymentMethods, kurlypayEasyPayment);

      expect(event).toEqual({
        'kakao-pay': [
          {
            code: 'kakao-pay',
            title: '카카오페이 이벤트',
            descriptions: ['카', '카', '오', '혜', '택'],
          },
        ],
        kurlypay: [
          {
            code: 'kurlypay',
            title: '컬리페이 할인',
            descriptions: ['혜택'],
          },
        ],
        'kurlypay-credit': [
          {
            code: 'kurlypay-credit',
            title: 'la-cms에서 관리하는 프로모션',
            descriptions: ['메뉴 경로는', '프로모션', '결제제휴혜택'],
          },
        ],
        'naver-pay': [
          {
            code: 'naver-pay',
            title: '네이버페이 할인',
            descriptions: [
              '네이버페이네이버페이네이버페이네이버페이네이버페이네이버페이네이버페이네이버페이네이버페이네이버페이',
            ],
          },
        ],
        toss: [
          {
            code: 'toss',
            title: '토스 할인',
            descriptions: ['토스'],
          },
        ],
        phonebill: [
          {
            code: 'phonebill',
            title: '휴대폰 혜택',
            descriptions: ['휴대폰'],
          },
        ],
      });
    });
  });

  describe('formattedKurlypayPaymentMethods', () => {
    const kurlypayError = paymentMethodResponseWithKurlypayError.kurlypayEasyPayment?.paymentMethods;

    context('컬리페이 장애로 결제수단이 null 이면', () => {
      it('빈 배열을 return 한다.', () => {
        const kurlypayVendors = formattedKurlypayPaymentMethods(kurlypayError, false);

        expect(kurlypayVendors).toEqual([]);
      });
    });

    context('컬리페이 결제수단이 없으면', () => {
      it('PLCC 추가 로띠 카드와 컬리페이 결제수단 추가 고스트 카드만 존재한다.', () => {
        const kurlypayVendors = formattedKurlypayPaymentMethods([], false);

        expect(kurlypayVendors).toEqual([KurlypayPlccLottieVendor, KurlypayAddVendor]);
      });
    });

    context('PLCC 카드가 포함되어 있으면', () => {
      it('컬리페이 결제수단을 return 한다.', () => {
        const kurlypayVendors = formattedKurlypayPaymentMethods(kurlypayEasyPayment.paymentMethods, false);

        expect(kurlypayVendors).toEqual(formattedKurlypayVendors);
      });
    });

    context('PLCC 카드가 포함되어 있지 않으면', () => {
      const {
        kurlypayEasyPayment: { paymentMethods: paymentMethodsWithoutPLCC },
      } = paymentMethodResponseWithoutPLCC;
      it('결제 수단 리스트에 PLCC lottie 카드가 포함되어있다.', () => {
        const kurlypayVendors = formattedKurlypayPaymentMethods(paymentMethodsWithoutPLCC, false);

        expect(kurlypayVendors).toContainEqual(KurlypayPlccLottieVendor);
      });
    });
  });

  describe('formattedPaymentVendors', () => {
    it('사용 가능한 결제 수단 및 결제 수단별 이벤트 목록을 return 한다.', async () => {
      const { vendors, event, creditCards, installments, kurlypayVendors, isPLCCExisted } = formattedPaymentVendors(
        paymentMethodResponse.paymentMethods,
        paymentMethodResponse.kurlypayEasyPayment,
        {
          checkoutType: CheckoutType.NORMAL,
          isGiftOrder: false,
          isJoinOrder: false,
          userGrade: Grade.Normal,
          isSubscribed: false,
        },
      );

      const hyundai = creditCards.filter(({ value }) => value === '61');

      expect(event['kakao-pay']).not.toBeNull();
      expect(vendors).toContainEqual(expect.objectContaining({ code: 'kakao-pay' }));
      expect(vendors).toContainEqual(expect.objectContaining({ code: 'kakao-pay' }));
      expect(creditCards).toContainEqual(expect.objectContaining({ name: '현대' }));
      expect(kurlypayVendors).toEqual(formattedKurlypayVendors);
      expect(isPLCCExisted).toBeTruthy();

      expect(installments[hyundai[0].value]).not.toBeUndefined();
    });

    context('컬리페이 결제수단이 null 이면', () => {
      it('vendors 에 컬리페이 결제수단이 포함되지 않는다.', async () => {
        (readPaymentMethods as jest.Mock).mockResolvedValueOnce(paymentMethodResponseWithKurlypayError);

        const { vendors } = formattedPaymentVendors(
          paymentMethodResponseWithKurlypayError.paymentMethods,
          paymentMethodResponseWithKurlypayError.kurlypayEasyPayment,
          {
            checkoutType: CheckoutType.NORMAL,
            isGiftOrder: false,
            isJoinOrder: false,
            userGrade: Grade.Normal,
            isSubscribed: false,
          },
        );

        expect(vendors).toContainEqual(expect.not.objectContaining({ code: 'kurlypay' }));
      });
    });
  });

  describe('getPreviousVendor', () => {
    it('마지막으로 사용했던 결제수단을 return 한다', async () => {
      (readPreferenceMethods as jest.Mock).mockResolvedValueOnce({
        paymentGatewayId: 'toss-payments',
        creditCardCompanyId: '41',
      });

      const { paymentGatewayId, companyId } = await getPreviousVendor();

      expect(paymentGatewayId).toBe('toss-payments');
      expect(companyId).toBe('41');
    });
  });

  describe('getCheckContinuity', () => {
    const params = {
      pageType: PageType.PLACE_ORDER,
      address: '서울 강남구 테헤란로 133',
      addressDetail: '15층',
      dealProducts: [],
    };

    context('continuity 주문이면', () => {
      const basicStyle = {
        color: '#000000',
        bold: true,
      };

      const replaceStyles = [
        {
          text: '14시',
          color: '#5F0080',
          bold: true,
        },
        {
          text: '내일 새벽 7시',
          color: '#5F0080',
          bold: true,
        },
      ];

      (postCheckContinuity as jest.Mock).mockResolvedValueOnce({
        displayMessage: {
          deliveryNotice: {
            text: '오늘 주문이 마감되어, 내일 밤에 배송받으실 수 있습니다. 주문을 계속 진행하시겠습니까?',
            subText: '모레 아침에 열어보셔도 신선하도록\n보냉을 강화해서 보내드려요!',
            basicStyle,
            replaceStyles,
          },
        },
      });

      it('continuity 문구를 return 한다.', async () => {
        const {
          continuityPopupMessage,
          continuityPopupSubMessage,
          continuityPopupMessageBasicStyle,
          continuityPopupMessageReplaceStyles,
        } = await getCheckContinuity(params);

        expect(continuityPopupMessage).toBe(
          '오늘 주문이 마감되어, 내일 밤에 배송받으실 수 있습니다. 주문을 계속 진행하시겠습니까?',
        );
        expect(continuityPopupSubMessage).toBe('모레 아침에 열어보셔도 신선하도록\n보냉을 강화해서 보내드려요!');
        expect(continuityPopupMessageBasicStyle).toBe(basicStyle);
        expect(continuityPopupMessageReplaceStyles).toBe(replaceStyles);
      });
    });

    context('continuity 주문이 아니면', () => {
      (postCheckContinuity as jest.Mock).mockResolvedValueOnce({
        displayMessage: {
          deliveryNotice: {
            text: '',
            subText: '',
            basicStyle: {},
            replaceStyles: [],
          },
        },
      });

      it('빈 문자열을 return 한다.', async () => {
        const {
          continuityPopupMessage,
          continuityPopupSubMessage,
          continuityPopupMessageBasicStyle,
          continuityPopupMessageReplaceStyles,
        } = await getCheckContinuity(params);

        expect(continuityPopupMessage).toBe('');
        expect(continuityPopupSubMessage).toBe('');
        expect(continuityPopupMessageBasicStyle).toStrictEqual({});
        expect(continuityPopupMessageReplaceStyles).toStrictEqual([]);
      });
    });
  });
});
