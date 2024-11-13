import { findIndex, isEmpty, isNull } from 'lodash';

import { postCheckContinuity, readPreferenceMethods } from '../../../../shared/api';

import {
  CheckContinuityRequest,
  CheckoutCoupon,
  CheckoutType,
  CreditCardCompanies,
  EasyPaymentCompanyId,
  EasyPaymentType,
  KurlypayEasyPayment,
  KurlypayEasyPaymentMethod,
  KurlypayVendor,
  OrderTypeInformation,
  PaymentMethod,
} from '../../../../shared/interfaces';
// TODO: 공통 interface로 뺄 것.
import { Installment, OrderVendorCode, PaymentEvents, PaymentVendor, VendorCode, VendorCodes } from '../interfaces';
import { CardVenderCode } from '../../../../shared/constant';
import { disableVendor } from '../utils/disableVendor';

type Installments = {
  [x: string]: Installment[];
};

const SIMPLE_PAYMENT_VENDOR_CODES: VendorCode[] = [VendorCodes.KAKAOPAY, VendorCodes.TOSS, VendorCodes.PAYCO];

export const isCreditCardPayments = (vendorCode?: OrderVendorCode | '') =>
  vendorCode === 'kurlypay-credit' || vendorCode === 'toss-payments';

export const isKurlypayPayments = (vendorCode?: OrderVendorCode | '') => vendorCode === VendorCodes.KURLYPAY;

export const isKurlypayVendor = (selectedVendor?: PaymentVendor) =>
  selectedVendor && selectedVendor.code === VendorCodes.KURLYPAY;

export const isKurlypayPaymentType = (paymentType: EasyPaymentType, selectedKurlypayVendor?: KurlypayVendor) =>
  selectedKurlypayVendor && selectedKurlypayVendor.paymentType === paymentType;

export const isKurlycard = ({ companyId }: { companyId?: EasyPaymentCompanyId | null }) =>
  companyId === CardVenderCode.KURLYPAY_CARD;

export const isPlccExisted = (kurlypayVendors: KurlypayVendor[]) =>
  !!kurlypayVendors.find((vendor) => isKurlycard(vendor) && !isKurlypayPaymentType(EasyPaymentType.ADD_PLCC, vendor));

export const isKurlycardCoupon = (coupon?: CheckoutCoupon) =>
  coupon && coupon.creditCardId === CardVenderCode.KURLYPAY_CARD;
export const findCardIndex = ({
  kurlypayVendors,
  selectedKurlypayVendor,
}: {
  kurlypayVendors: KurlypayVendor[];
  selectedKurlypayVendor?: KurlypayVendor;
}) => {
  const index = findIndex(
    kurlypayVendors,
    (vendor) => vendor.paymentMethodId === selectedKurlypayVendor?.paymentMethodId,
  );

  return index === -1 ? 0 : index;
};

export const formattedCreditCards = (creditCards: CreditCardCompanies[]) =>
  creditCards.map((it) => ({
    name: it.companyName,
    value: it.companyId,
  }));

export const createInstallments = (defaultMonths: number[], freeMonths: number[]) => [
  { name: '일시불', value: '0' },
  ...defaultMonths.map((value) => {
    const isFree = freeMonths.includes(value);
    return {
      name: `${value}개월${isFree ? ' (무이자)' : ''}`,
      value: value.toString(),
    };
  }),
];

export const formattedInstallments = (creditCards: CreditCardCompanies[]) =>
  creditCards.reduce<Installments>(
    (acc, cur) => ({
      ...acc,
      [cur.companyId]: createInstallments(cur.defaultInstallmentMonths, cur.freeInterestInstallmentMonths),
    }),
    {},
  );

export const formattedFreeInterestInstallments = (creditCards: CreditCardCompanies[]) =>
  creditCards
    .filter((it) => !isEmpty(it.freeInterestInstallmentMonths))
    .map((value) => {
      const min = Math.min(...value.freeInterestInstallmentMonths);
      const max = Math.max(...value.freeInterestInstallmentMonths);
      const isOneMonth = min === max;

      return {
        name: `${value.companyName}카드`,
        value: `${min}${!isOneMonth ? `~${max}` : ''}개월 무이자`,
      };
    });

export const formattedKurlypayEvent = (vendors: KurlypayEasyPayment): PaymentMethod => {
  return {
    paymentGatewayId: 'kurlypay',
    paymentGatewayName: '컬리페이',
    eventTitle: vendors.eventTitle,
    eventDescriptions: vendors.eventDescriptions,
    creditCards: [],
  };
};

export const formattedEvent = (vendors: PaymentMethod[], easyPayment: KurlypayEasyPayment) => {
  const copyedVendors = [...vendors];
  const easyPaymentEvent = formattedKurlypayEvent(easyPayment);
  copyedVendors.push(easyPaymentEvent);

  const event = copyedVendors.reduce<PaymentEvents>((acc, cur) => {
    return cur.eventTitle
      ? {
          ...acc,
          [cur.paymentGatewayId]: [
            {
              code: cur.paymentGatewayId,
              title: cur.eventTitle,
              descriptions: cur.eventDescriptions,
            },
          ],
        }
      : acc;
  }, {});

  return event;
};

export const formattedKurlypayPaymentMethods = (
  paymentMethods: KurlypayEasyPaymentMethod[] | null,
  isGiftCardOrder: boolean,
) => {
  if (paymentMethods === null) {
    return [];
  }

  const defaultVendor = {
    companyId: null,
    companyName: '',
    maskingNo: '',
    cardType: null,
    installments: [],
    imageUrl: '',
    isDisabled: false,
    cardHolderType: '' as const,
  };

  const plccExisted = paymentMethods.find((it) => it.companyId === CardVenderCode.KURLYPAY_CARD);

  const plccLottieVendor: KurlypayVendor = {
    ...defaultVendor,
    paymentMethodId: 'plcc-lottie',
    paymentType: EasyPaymentType.ADD_PLCC,
    companyId: CardVenderCode.KURLYPAY_CARD,
    companyName: '컬리카드',
    lastPaymentDateTime: '202401130222',
    registrationDateTime: '202401130222',
  };

  const kurlypayVendors = paymentMethods.reduce<KurlypayVendor[]>((acc, cur) => {
    const { defaultInstallmentMonths, freeInterestInstallmentMonths, ...method } = cur;
    return [
      ...acc,
      {
        ...method,
        installments: createInstallments(defaultInstallmentMonths, freeInterestInstallmentMonths),
      },
    ];
  }, []);

  const addKurlypayVendor: KurlypayVendor = {
    paymentMethodId: 'add-kurlypay-card',
    paymentType: EasyPaymentType.ADD_KURLYPAY,
    ...defaultVendor,
    lastPaymentDateTime: '202401130222',
    registrationDateTime: '202401130222',
  };

  return plccExisted || isGiftCardOrder
    ? [...kurlypayVendors, addKurlypayVendor]
    : [...kurlypayVendors, plccLottieVendor, addKurlypayVendor];
};

export const formattedPaymentVendors = (
  vendors: PaymentMethod[],
  kurlypayEasyPayment: KurlypayEasyPayment,
  orderTypeInformation: OrderTypeInformation,
) => {
  const isGiftCardOrder = orderTypeInformation.checkoutType === CheckoutType.GIFT_CARD;

  const creditCardVendors: CreditCardCompanies[] =
    vendors.find(({ paymentGatewayId }) => isCreditCardPayments(paymentGatewayId))?.creditCards ?? [];

  const kurlypayVendors: KurlypayVendor[] = formattedKurlypayPaymentMethods(
    kurlypayEasyPayment.paymentMethods,
    isGiftCardOrder,
  );

  const paymentVendors: PaymentVendor[] = vendors.map((it) => ({
    code: it.paymentGatewayId,
    name: it.paymentGatewayName,
    hasEvent: !!it.eventTitle,
    isSimplePay: SIMPLE_PAYMENT_VENDOR_CODES.includes(it.paymentGatewayId),
  }));

  if (!isNull(kurlypayEasyPayment.paymentMethods)) {
    paymentVendors.push({
      code: 'kurlypay',
      name: '컬리카드',
      hasEvent: !!kurlypayEasyPayment.eventTitle,
      isSimplePay: false,
    });
  }

  const hasKurlypayError = isEmpty(kurlypayVendors);
  const simplePaymentVendors = paymentVendors.filter((it) => it.isSimplePay);

  return {
    vendors: paymentVendors,
    disableVendorCodes: disableVendor(hasKurlypayError, orderTypeInformation),
    event: formattedEvent(vendors, kurlypayEasyPayment),
    creditCards: formattedCreditCards(creditCardVendors),
    installments: formattedInstallments(creditCardVendors),
    freeInterestInstallments: formattedFreeInterestInstallments(creditCardVendors),
    simplePaymentVendors,
    kurlypayVendors,
    defaultKurlypayVendors: kurlypayEasyPayment.paymentMethods,
    isKurlypayMember: kurlypayEasyPayment.isKurlypayMember,
    plccDiscountPrice: kurlypayEasyPayment.plccDiscountPrice,
    hasRegisteredCashReceipt: kurlypayEasyPayment.hasRegisteredCashReceipt,
    isPLCCExisted: isPlccExisted(kurlypayVendors),
    hasKurlypayError,
  };
};

export const getPreviousVendor = async () => {
  const data = await readPreferenceMethods();

  return {
    paymentGatewayId: data.paymentGatewayId,
    companyId: data.creditCardCompanyId,
  };
};

export const getCheckContinuity = async (params: CheckContinuityRequest) => {
  const data = await postCheckContinuity(params);

  return {
    continuityPopupMessage: data.displayMessage?.deliveryNotice?.text,
    continuityPopupSubMessage: data.displayMessage?.deliveryNotice?.subText,
    continuityPopupMessageBasicStyle: data.displayMessage?.deliveryNotice?.basicStyle,
    continuityPopupMessageReplaceStyles: data.displayMessage?.deliveryNotice?.replaceStyles,
  };
};
