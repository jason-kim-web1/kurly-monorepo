import { InquiryCategory, SubInquiryCategory } from '../types';
import { fetchPersonalInquiryOrders, getPersonalInquiryCodes } from '../../../../shared/api';

export const getPersonalInquiryCategories = async (): Promise<InquiryCategory[]> => {
  const data = await getPersonalInquiryCodes();

  return data.map((item) => ({
    id: item.id,
    value: item.code,
    name: item.codeName,
    childCodes: item.childCodes.map(
      (code) =>
        ({
          id: code.id,
          value: code.code,
          name: code.codeName,
          parentCode: code.parentCode,
          orderProductType: code.orderProductType,
          isRegisterImage: code.isRegisterImage,
        } as SubInquiryCategory),
    ),
  }));
};

export async function getMemberOrderData({
  startDate,
  endDate,
  orderNo,
  keyword,
  pageNo,
  pageSize,
  foldOptionPredict,
}: {
  startDate: string;
  endDate: string;
  pageSize: number;
  pageNo: number;
  keyword: string | null;
  orderNo: number | null;
  foldOptionPredict?: (pageNo: number, index: number) => boolean;
}) {
  const { items, last, totalPages } = await fetchPersonalInquiryOrders({
    startDate: startDate,
    endDate: endDate,
    limit: pageSize,
    page: pageNo + 1,
    keyword,
    orderNo,
  });

  return {
    items: items.map((order, index) => ({
      products: order.dealProducts.map(
        ({
          dealProductNo,
          contentsProductNo,
          dealProductName,
          contentsProductName,
          productPrice,
          quantity,
          imageUrl,
          orderedAt,
        }) => ({
          dealProductNo,
          dealProductName,
          contentsProductName,
          contentsProductNo,
          imageUrl,
          quantity,
          orderedDatetime: orderedAt,
          paymentAmount: productPrice,
          orderNo: order.groupOrderNo,
          selected: false,
        }),
      ),
      orderNo: order.groupOrderNo,
      orderType: order.orderType,
      folded: foldOptionPredict && foldOptionPredict(pageNo, index),
      selected: false,
    })),
    last,
    totalPages,
  };
}
