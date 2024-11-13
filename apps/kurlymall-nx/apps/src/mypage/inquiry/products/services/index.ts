import {
  fetchInquiryProducts,
  deleteInquiryProduct,
  putInquiryProduct,
} from '../../../../shared/api/mypage/inquiry-products';
import snakeToCamel from '../../../../shared/utils/snakeToCamelCase';
import type { PutInquiryProductFormParam } from '../../../../shared/api/mypage/inquiry-products';

export interface InquiryProductsResponseData {
  success: boolean;
  message: string | null;
  data: InquiryProductItem[];
  meta: InquiryProductMeta;
}

export interface InquiryProductMeta {
  pagination: InquiryProductPagination;
}

export interface InquiryProductPagination {
  count: number;
  currentPage: number;
  perPage: number;
  totalPages: number;
}

export interface InquiryProductItem {
  id: number;
  listImageUrl: string;
  originalImageUrl: string;
  contentProductNo: number;
  contentProductCode: string;
  contentProductName: string;
  isMyPost: boolean;
  isSecret: boolean;
  subject: string;
  contents: string;
  maskedMemberName: string;
  commentsCount: number;
  comments: InquiryProductCommentItem[];
  createdAt: string;
  createdAtTimestamp: number;
}

interface InquiryProductCommentItem {
  contents: string;
  createdAt: string;
  createdAtTimestamp: number;
  id: number;
  isSecret: boolean;
  subject: string;
}

export const getInquiryProducts = async (page: number): Promise<InquiryProductsResponseData> => {
  const response = await fetchInquiryProducts({ page });
  return snakeToCamel<InquiryProductsResponseData>(response);
};

export const removeInquiryProduct = async (productNo: number, contentId: number) => {
  const response = await deleteInquiryProduct(productNo, contentId);
  return response;
};

export const updateInquiryProduct = async (
  productNo: number,
  contentId: number,
  formData: PutInquiryProductFormParam,
) => {
  const response = await putInquiryProduct(productNo, contentId, formData);
  return response;
};
