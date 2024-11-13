import httpClient from '../../configs/http-client';
import { UnknownError } from '../../errors';

interface ProductInquiryPostCommentData {
  id: number;
  subject: string;
  contents: string;
  is_secret: boolean;
  created_at: string;
  created_at_timestamp: number;
}

interface ProductInquiryPostData {
  id: number;
  list_image_url: string;
  original_image_url: string;
  content_product_no: number;
  content_product_code: string;
  content_product_name: string;
  is_my_post: boolean;
  is_secret: boolean;
  subject: string | null;
  contents: string | null;
  masked_member_name: string;
  comments_count: number;
  comments: ProductInquiryPostCommentData[];
  created_at: string;
  created_at_timestamp: number;
}

interface ProductInquiryNoticeData {
  id: number;
  subject: string;
  contents: string;
  created_at: string;
  created_by: string;
}

export interface ProductInquiryPostApiResponse {
  data: ProductInquiryPostData[];
  meta: {
    pagination: {
      count: number;
      current_page: number;
      per_page: number;
      total_pages: number;
    };
  };
}

interface ProductInquiryFormData {
  contents: string | null;
  id: number;
  isSecret: boolean | null;
  subject: string | null;
}

export const fetchProductInquiryPost = async (
  productNo: number,
  pageNo: number,
  perPage: number,
): Promise<ProductInquiryPostApiResponse> => {
  try {
    const path = `/board/v1/product-inquiry/content-products/${productNo}/posts`;
    const { data } = await httpClient.get<ProductInquiryPostApiResponse>(path, {
      params: {
        page: pageNo,
        per_page: perPage,
      },
    });

    return data;
  } catch (err) {
    throw new UnknownError(err);
  }
};

export const postProductInquiryDraft = async (productNo: number): Promise<ProductInquiryFormData> => {
  try {
    const path = `/board/v1/product-inquiry/content-products/${productNo}/posts/draft`;
    const { data } = await httpClient.post<{ data: ProductInquiryFormData }>(path);
    return data.data;
  } catch (err) {
    throw new UnknownError(err);
  }
};

export const postProductInquiryForm = async (
  productNo: number,
  draftId: number,
  payload: {
    subject: string;
    contents: string;
    is_secret: boolean;
  },
): Promise<ProductInquiryFormData> => {
  try {
    const path = `/board/v1/product-inquiry/content-products/${productNo}/posts/${draftId}`;
    const { data } = await httpClient.post<{ data: ProductInquiryFormData }>(path, {
      ...payload,
    });

    return data.data;
  } catch (err) {
    throw new UnknownError(err);
  }
};

export const fetchProductInquiryNotice = async (productNo: number): Promise<ProductInquiryNoticeData[]> => {
  try {
    const path = `/board/v1/product-inquiry/notices?content_product_no=${productNo}`;
    const { data } = await httpClient.get<{ data: ProductInquiryNoticeData[] }>(path);

    return data.data;
  } catch (err) {
    throw new UnknownError(err);
  }
};

export const deleteProductInquiry = async ({ productNo, postId }: { productNo: number; postId: number }) => {
  try {
    const path = `/board/v1/product-inquiry/content-products/${productNo}/posts/${postId}`;
    await httpClient.delete(path);
  } catch (err) {
    throw new UnknownError(err);
  }
};

export const putProductInquiryItem = async ({
  productNo,
  postId,
  payload,
}: {
  productNo: number;
  postId: number;
  payload: {
    contents: string;
    is_secret: boolean;
    subject: string;
  };
}) => {
  try {
    const path = `/board/v1/product-inquiry/content-products/${productNo}/posts/${postId}`;
    await httpClient.put(path, payload);
  } catch (err) {
    throw new UnknownError(err);
  }
};
