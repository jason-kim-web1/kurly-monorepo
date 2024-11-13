import { OrderType } from '../../../shared/constant/order';
import { MemberOrderProductData } from '../shared/types';

export type PersonalInquiryListItemType = 'NOTICE' | 'NORMAL';

export type PersonalInquiryListItemState = 'COMPLETE' | 'PENDING' | 'NONE';

export interface UserInquiryContentCommentResponseData {
  id: number;
  contents: string;
  createdActorEmail: string;
  createdActorName: string;
  createdDateTime: string;
  subject: string;
}

export interface UserInquiryContentImageData {
  id: number; // 이미지 번호
  originalFilename: string; // 이미지 원본 파일명
  mimeType: string; // 이미지 타입
  size: number; // 이미지 사이즈
  imageUrl: string; // 이미지 경로
  createdDateTime: string; // 이미지 생성일시
}

export interface PersonalInquiryListNoticeItem {
  id: number;
  type: PersonalInquiryListItemType;
  date: string;
  title: string;
  contents: string;
}

export interface PersonalInquiryListItem {
  id: number;
  expanded: boolean;
  title: string;
  date: string;
  type: PersonalInquiryListItemType;
  status: PersonalInquiryListItemState;
  orderNo: number;
  orderType: OrderType;
  orderProducts: MemberOrderProductData[];
  contents: string;
  comments: Array<UserInquiryContentCommentResponseData>;
  inquiryTypeName: string;
  inquiryTypeCode: string;
  inquiryTypeSubName: string;
  inquiryTypeSubCode: string;
  images: UserInquiryContentImageData[];
  allowsNotification: boolean;
}

export interface InquiryNoticeResponseData {
  id: number;
  subject: string;
  contents: string;
  createdBy: string;
  createdDateTime: string;
}
