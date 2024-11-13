export interface ProductInquiryPostComment {
  id: number;
  subject: string;
  contents: string;
  isSecret: boolean;
  createdAt: string;
  createdAtTimestamp: number;
}

export type ProductInquiryItemType = 'NOTICE' | 'POST';

export interface ProductInquiryItem {
  id: number;
  type: ProductInquiryItemType;
  subject: string;
  contents: string;
  memberName: string;
  createdAt: string;
  expanded: boolean;
}

export interface ProductInquiryPostItem extends ProductInquiryItem {
  thumbnailImageUrl: string;
  originalImageUrl: string;
  contentProductNo: number;
  contentProductCode: string;
  contentProductName: string;
  isMyPost: boolean;
  isSecret: boolean;
  commentsCount: number;
  comments: ProductInquiryPostComment[];
  createdAtTimestamp: number;
}

export interface ProductInquiryPostPagination {
  count: number;
  currentPage: number;
  perPage: number;
  totalPages: number;
}

export interface ProductInquiryPost {
  items: ProductInquiryPostItem[];
  pagination: ProductInquiryPostPagination;
}
