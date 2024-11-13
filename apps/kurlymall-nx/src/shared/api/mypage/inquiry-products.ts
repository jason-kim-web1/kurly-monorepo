import httpClient from '../../configs/http-client';
import { UnknownError } from '../../errors';

interface FetchInquiryProductsResponse {
  success: boolean;
  message: string | null;
  data: {
    id: number;
    list_image_url: string;
    original_image_url: string;
    content_product_no: number;
    content_product_code: string;
    content_product_name: string;
    is_my_post: boolean;
    is_secret: boolean;
    subject: string;
    contents: string;
    masked_member_name: string;
    comments_count: number;
    comments: any[];
    created_at: string;
    created_at_timestamp: number;
  }[];
  meta: {
    pagination: {
      count: number;
      current_page: number;
      per_page: number;
      total_pages: number;
    };
  };
}

interface FetchInquiryProductsParams {
  perPage?: number;
  page: number;
}

interface DeleteInquiryProductsResponse {
  success: boolean;
  message: string;
  data: string | null;
}

interface PutInquiryProductResponse {
  success: boolean;
  message: string | null;
  data: {
    id: number;
    subject: string;
    contents: string;
    isSecret: boolean;
  };
}

export interface PutInquiryProductFormParam {
  contents: string;
  isSecret: boolean;
  subject: string;
}

export const fetchInquiryProducts = async ({
  perPage = 10,
  page = 1,
}: FetchInquiryProductsParams): Promise<FetchInquiryProductsResponse> => {
  try {
    const { data } = await httpClient.get<FetchInquiryProductsResponse>('/board/v1/product-inquiry/members/posts', {
      params: { per_page: perPage, page: page },
    });
    return data;
  } catch (err) {
    throw new UnknownError(err);
  }
};

export const putInquiryProduct = async (
  productNo: number,
  contentId: number,
  formData: PutInquiryProductFormParam,
): Promise<PutInquiryProductResponse> => {
  try {
    const { isSecret, subject, contents } = formData;
    const { data } = await httpClient.put<PutInquiryProductResponse>(
      `/board/v1/product-inquiry/content-products/${productNo}/posts/${contentId}`,
      {
        subject,
        contents,
        is_secret: isSecret,
      },
    );
    return data;
  } catch (err) {
    throw new UnknownError(err);
  }
};

export const deleteInquiryProduct = async (
  productNo: number,
  contentId: number,
): Promise<DeleteInquiryProductsResponse> => {
  try {
    const { data } = await httpClient.delete<DeleteInquiryProductsResponse>(
      `/board/v1/product-inquiry/content-products/${productNo}/posts/${contentId}`,
    );
    return data;
  } catch (err) {
    throw new UnknownError(err);
  }
};
