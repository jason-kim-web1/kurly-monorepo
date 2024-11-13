import { readKurlyMembersChangePaymentMethod, readKurlyMembersCheckoutProduct } from '../api/kurlyMembersProduct';
import { getKurlyMembersStartSettlementDate } from '../../../shared/utils/getOrderDateFormat';
import { KurlyMembersCheckoutResponse, MembersCheckoutResponse } from '../interfaces/KurlyMembersProduct.interface';
import { MEMBERS_PRODUCT_CODE } from '../../../shared/constant';
import {
  getNextPaymentDate,
  postChangePaymentUrl,
  postPaymentUrl,
  postSubscribeMembership,
} from '../api/paymentProcess';
import {
  METHOD_TYPE,
  PaymentUrlParams,
  PostPaymentUrl,
  SubscribeResultParams,
  SuccessResultResponse,
} from '../interfaces';
import { getFormattedDate } from '../utils/formattedDate';

export const getKurlyMembersCheckoutProduct = async (
  isChangePayment?: boolean,
): Promise<KurlyMembersCheckoutResponse> => {
  const {
    order,
    product: { name, code, price, discountPrice },
    kurlypayPaymentMethodList,
    nextFreeTicket,
    benefitOptionMetaList,
    isKurlypayError,
  }: MembersCheckoutResponse = await (isChangePayment
    ? readKurlyMembersChangePaymentMethod(MEMBERS_PRODUCT_CODE)
    : readKurlyMembersCheckoutProduct(MEMBERS_PRODUCT_CODE));

  return {
    product: {
      name,
      code,
      originalPrice: price,
      paymentPrice: isChangePayment ? 0 : price - discountPrice,
    },
    order: {
      ...order,
      startSettlementDate: getKurlyMembersStartSettlementDate(order.startSettlementDate),
    },
    kurlypayList: kurlypayPaymentMethodList.map(({ registered, ...restData }) => ({
      ...restData,
      isCurrentPaymentMethod: registered,
    })),
    nextFreeTicket: nextFreeTicket && {
      ...nextFreeTicket,
      createdAt: getKurlyMembersStartSettlementDate(nextFreeTicket.createdAt),
      expiredAt: getKurlyMembersStartSettlementDate(nextFreeTicket.expiredAt),
    },
    couponPackList: benefitOptionMetaList?.map(
      ({ benefitOptionId, benefitOptionDescription, benefitMetaList, benefitOptionCode, benefitOptionName }) => ({
        couponPackId: benefitOptionId,
        couponPackCode: benefitOptionCode,
        couponPackName: benefitOptionName,
        couponPackDescription: benefitOptionDescription,
        couponList: benefitMetaList.map(({ type, description, value, tagList }) => ({
          couponType: type,
          couponDescription: description,
          couponValue: value,
          couponTagList: tagList,
        })),
      }),
    ),
    isKurlypayError,
  };
};

export const getPaymentUrl = async ({
  isChangePayment,
  paymentMethodId,
  ...restParams
}: PaymentUrlParams): Promise<PostPaymentUrl> => {
  const requestData = paymentMethodId ? { ...restParams, paymentMethodId } : restParams;

  const data = isChangePayment ? await postChangePaymentUrl(requestData) : await postPaymentUrl(requestData);

  return {
    ...data,
    paymentUrl: data.url,
    isPostRequest: data.method === METHOD_TYPE.POST,
  };
};

export const requestSuccessResult = async ({
  isChangePayment,
  productCode,
  orderNo,
  couponPackId,
}: SubscribeResultParams) => {
  try {
    const { amount, nextSettlementDate }: SuccessResultResponse = await (isChangePayment
      ? getNextPaymentDate()
      : postSubscribeMembership({ isChangePayment, productCode, orderNo, couponPackId }));

    const date = getFormattedDate(nextSettlementDate);

    return {
      price: amount,
      date,
    };
  } catch (error) {
    const isExpiredToken = error.response?.data.status === 401;
    const isAlreadyRequest = error.response?.data.code === 'ALREADY_PROCESSING';

    if (isExpiredToken || isAlreadyRequest) {
      return;
    }

    throw new Error(error.response?.data.message);
  }
};
