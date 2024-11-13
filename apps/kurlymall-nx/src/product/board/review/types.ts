import { Grade } from '../../../shared/enums';
import { BADGE_TYPE } from './constants';

interface OwnerProfiles {
  beautyProfile: Array<string>;
  marketProfile: Array<string>;
}

export interface OwnerProfile {
  beautyProfile: string;
  marketProfile: string;
}

export interface ReviewImageItem {
  no: number;
  image: string;
  reviewSquareSmallUrl: string;
}

export interface ReviewCommentItem {
  no: number;
  registeredAt: string;
  contents: string;
  ownerName: string;
}

interface ProductReviewImage {
  no: number;
  image: string;
}

interface ProductReviewComment {
  no: number;
  registeredAt: string;
  contents: string;
  ownerName: string;
}

export interface ProductReviewData {
  no: number;
  type: '베스트' | '체험단' | '일반';
  contents: string;
  dealProductNo: number;
  dealProductName: string;
  contentsProductNo: number;
  contentsProductName: string;
  productImageUrl?: string;
  likeCount: number;
  isLike: boolean;
  visibility: 'PUBLIC' | 'PRIVATE' | 'BLOCK';
  ownerGrade: `${Grade}`;
  ownerName: string;
  registeredAt: string;
  modifiedAt: string;
  ownerProfiles: OwnerProfiles;
  images: Array<ProductReviewImage>;
  comments: Array<ProductReviewComment>;
  isMembership: boolean;
}

interface ReviewNoticeData {
  no: number;
  registeredAt: string;
  subject: string;
  contents: string;
  ownerGrade: `${Grade}`;
  ownerName: string;
}

export interface ReviewBenefitNoticeData {
  title: string;
  contents: string[];
}

export interface ProductReviewNoticeData {
  data: ReviewNoticeData[];
  meta: {
    reserveNotice: ReviewBenefitNoticeData;
  };
}

type DealPreviouslyReviewedStatus = 'NOTHING' | 'ALREADY';

export interface DealPreviouslyReviewedStatusData {
  status: DealPreviouslyReviewedStatus;
  message: string;
}

export type ReviewFilterType = 'DEAL_PRODUCT' | 'MEMBER_GROUP';
export type ReviewMembershipType = 'MEMBER_GROUP_WITH_MEMBERSHIP';

export interface FetchReviewFilterProps {
  contentsProductNo: number;
  filterType: ReviewFilterType;
}

export interface FetchReviewFilterWithMembershipProps extends Pick<FetchReviewFilterProps, 'contentsProductNo'> {
  filterType: ReviewFilterType | ReviewMembershipType;
}

export interface FetchReviewCountProps {
  contentsProductNo: number;
  filters?: string;
}

export interface ReviewFilterOptionItem {
  code: string;
  name: string;
  count: number;
  disabled?: boolean;
}

export interface FetchReviewFilterResponse {
  data: {
    filterType: ReviewFilterType;
    filterTypeName: string;
    options: ReviewFilterOptionItem[];
  };
}

export interface FetchReviewCountResponse {
  data: {
    count: number;
  };
}

export type ProductReviewSortType = 'RECOMMEND' | 'RECENTLY';

export interface FetchReviewListResponseMeta {
  pagination: {
    before: number;
    after: number;
  };
}

export interface FetchReviewListResponseDataItem {
  no: number;
  type: BadgeTypeValues;
  registeredAt: string;
  modifiedAt?: string;
  contents: string;
  dealProductNo: number;
  dealProductName: string;
  contentsProductNo: number;
  contentsProductName: string;
  productImageUrl: string;
  isLike: boolean;
  visibility: string;
  likeCount: number;
  ownerGrade: string | null;
  ownerName: string;
  ownerProfiles: {
    beautyProfile: string;
    marketProfile: string;
  };
  images: {
    no: number;
    image: string;
    reviewSquareSmallUrl: string;
  }[];
  comments: {
    no: number;
    registeredAt: string;
    contents: string;
    ownerName: string;
  }[];
  isMembership: boolean;
}

export type FetchReviewListResponseData = FetchReviewListResponseDataItem[];

export interface FetchReviewListResponse {
  meta: FetchReviewListResponseMeta;
  data: FetchReviewListResponseData;
}

export interface FetchProductReviewDetailResponseData {
  no: number;
  type: BadgeTypeValues;
  registeredAt: string;
  modifiedAt: string;
  contents: string;
  dealProductNo: number;
  dealProductName: string;
  contentsProductNo: number;
  contentsProductName: string;
  productImageUrl: string;
  likeCount: number;
  isLike: boolean;
  visibility: string;
  ownerGrade: string;
  ownerName: string;
  ownerProfiles: OwnerProfile;
  images: ReviewImageItem[];
  comments: ReviewCommentItem[];
  isMembership: boolean;
}

export type ReviewFilterTypeList = ReviewFilterTypeItem[];

export interface ReviewFilterTypeItem {
  label: string;
  value: ReviewFilterType;
}

export interface ReviewFilterTabItem extends ReviewFilterTypeItem {
  active: boolean;
  count: number;
}

export type ReviewFilterTabList = ReviewFilterTabItem[];

export type ReviewFilterTypeListMapping = Record<ReviewFilterType, ReviewFilterTypeListMappingData>;

export interface ReviewFilterTypeListMappingData {
  list: ReviewFilterOptionItem[];
  name: string;
}

type BadgeTypeObjectShape = typeof BADGE_TYPE;
type BadgeTypeKeys = keyof BadgeTypeObjectShape;
export type BadgeTypeValues = BadgeTypeObjectShape[BadgeTypeKeys];
