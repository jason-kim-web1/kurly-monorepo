import {
  fetchProductInquiryNotice,
  fetchProductInquiryPost,
  ProductInquiryPostApiResponse,
} from '../../../../shared/api/product/inquiry';
import { ProductInquiryItem, ProductInquiryPost } from '../types';

const ADMIN_NAME = '컬리';

export const createProductInquiryPost = (resData: ProductInquiryPostApiResponse): ProductInquiryPost => {
  const { data, meta } = resData;

  return {
    items: data.map((it) => ({
      id: it.id,
      type: 'POST',
      thumbnailImageUrl: it.list_image_url,
      originalImageUrl: it.original_image_url,
      contentProductNo: it.content_product_no,
      contentProductCode: it.content_product_code,
      contentProductName: it.content_product_name,
      isMyPost: it.is_my_post,
      isSecret: it.is_secret,
      subject: it.subject ?? '',
      contents: it.contents ?? '',
      memberName: it.masked_member_name,
      commentsCount: it.comments_count,
      comments: it.comments.map((comment) => ({
        id: comment.id,
        subject: comment.subject,
        contents: comment.contents,
        isSecret: comment.is_secret,
        createdAt: comment.created_at,
        createdAtTimestamp: comment.created_at_timestamp,
      })),
      createdAt: it.created_at,
      createdAtTimestamp: it.created_at_timestamp,
      // client side properties
      expanded: false,
    })),
    pagination: {
      count: meta.pagination.count,
      currentPage: meta.pagination.current_page,
      perPage: meta.pagination.per_page,
      totalPages: meta.pagination.total_pages,
    },
  };
};

export const getProductInquiryPost = async (
  productNo: number,
  pageNo: number,
  perPage: number,
): Promise<ProductInquiryPost> => {
  const resData = await fetchProductInquiryPost(productNo, pageNo, perPage);

  return createProductInquiryPost(resData);
};

export const getProductInquiryNotice = async (productNo: number): Promise<ProductInquiryItem[]> => {
  const data = await fetchProductInquiryNotice(productNo);

  return data.map(({ id, subject, contents, created_at }) => ({
    id,
    type: 'NOTICE',
    subject,
    contents,
    memberName: ADMIN_NAME,
    createdAt: created_at,
    expanded: false,
  }));
};
