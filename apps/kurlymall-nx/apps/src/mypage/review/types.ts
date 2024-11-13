import { Grade } from '../../shared/enums';

import { createWritableReviews, createWrittenReviews } from './ProductReview.service';
import { ReviewImage } from './hooks/useCreateReviewImage';
import type { WritableReviewListItemData, WritableReviewReserveNotice } from '../../shared/api/mypage/review';

// 후기 공개 상태(PUBLIC(공개), PRIVATE(비공개), BLOCK(관리자 비공개))
export type ReviewVisibilityType = 'PUBLIC' | 'PRIVATE' | 'BLOCK';

// 후기 작성/수정 시 어뷰징 검증 (NONE: 동작하지 않음, ALL: 금칙어 및 의미없는 내용 검증, FORBIDDEN: 금칙어만 검증)
export type ReviewPassStatusType = 'NONE' | 'ALL' | 'FORBIDDEN';

// 후기 작성/수정 시 어뷰징 검증 결과 (FORBIDDEN: 등록불가, MEANINGLESS: 안내 후 등록 가능)
export type ReviewPassResultStatusType = 'FORBIDDEN' | 'MEANINGLESS';

export interface Profiles {
  beautyProfile: string;
  marketProfile: string;
}

export interface Order {
  orderNo: number;
  orderType: string;
  ea: number;
  shippedDate: string;
  writeExpirationDate: string;
}

export interface Product {
  contentsProductNo: number;
  contentsProductName: string;
  dealProductNo: number;
  dealProductName: string;
  productThumbnailImageUrl: string;
  productVerticalSmallUrl: string;
}

export interface Image {
  no: number;
  image: string;
  reviewSquareSmallUrl: string;
}

export interface Comment {
  no: number;
  registeredAt: string;
  contents: string;
  ownerName: string;
}

export interface Review {
  no: number;
  type: '베스트' | '일반' | '체험단';
  registeredAt: string;
  modifiedAt: string;
  contents: string;
  dealProductNo: number;
  dealProductName: string;
  contentsProductNo: number;
  contentsProductName: string;
  isLike: boolean;
  likeCount: number;
  ownerGrade: `${Grade}`;
  ownerName: string;
  ownerProfiles: Profiles;
  images: Array<Image>;
  comments: Array<Comment>;
  visibility: ReviewVisibilityType;
  orderType: string;
}

export interface WritableReviewsData {
  data: Array<Order & Product>;
  meta: {
    pagination: {
      nextPage?: number | null;
      previousPage?: number | null;
    };
    notification: {
      title: string;
      contents: string[];
    } | null;
  };
}

export interface WrittenReviewsData {
  data: Array<Review>;
  meta: {
    pagination: {
      after: number | null;
      before: number | null;
    };
    notification: {
      title: string;
      contents: string[];
    } | null;
  };
}

export type WritableReviews = ReturnType<typeof createWritableReviews>;

export type WrittenReviews = ReturnType<typeof createWrittenReviews>;

export type PrevUploadImageStatusType = 'SUCCESS' | 'DELETE';

export type ReviewImageData = WrittenReviews['writtenReviews'][0]['images'][0];

export type PrevUploadImage = ReviewImageData & {
  status: PrevUploadImageStatusType;
};

export interface MutableReviewFormData {
  contents: string;
  prevImages: PrevUploadImage[];
  newImages: ReviewImage[];
  visibility: ReviewVisibilityType;
}

export type WritableReviewListData = {
  products: WritableReviewListItemData[];
  pagination: {
    previousPageParam: number;
    nextPageParam: number;
  };
  reserveNotice: WritableReviewReserveNotice | null;
};
