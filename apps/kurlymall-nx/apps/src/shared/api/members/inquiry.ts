import { UnknownError } from '../../errors';
import { InquiryCategoryResponse } from '../../../mypage/personal-inquiry/form/types';
import httpClient from '../../configs/http-client';
import {
  InquiryNoticeResponseData,
  UserInquiryContentCommentResponseData,
  UserInquiryContentImageData,
} from '../../../mypage/personal-inquiry/list/types';
import { BaseResponse } from '../../interfaces';
import { OrderType } from '../../constant/order';

const apiEntry = '/member/proxy/member-board';

export const fetchPersonalInquiryNotices = async () => {
  const url =
    '/member/proxy/member-board/v1/member-board/notices?boardType=INQUIRY&sortField=createdAt&sortDirection=DESC';
  const { data } = await httpClient.get<BaseResponse<InquiryNoticeResponseData[]>>(url);
  return data.data;
};

interface MemberOrderProductData {
  quantity: number;
  productPrice: number;
  contentsProductName: string | null;
  contentsProductNo: number | null;
  dealProductName: string;
  dealProductNo: number;
  createdDateTime: string;
  imageUrl: string;
  orderedAt: string;
}

interface UserInquiryContentResponseData {
  id: number;
  contents: string;
  inquiryTypeCode: string;
  inquiryTypeName: string;
  inquiryTypeSubCode: string;
  inquiryTypeSubName: string;
  memberId: string;
  createdDateTime: string;
  subject: string;
  comments: UserInquiryContentCommentResponseData[];
  images: UserInquiryContentImageData[];
  orderProducts: MemberOrderProductData[];
  orderNo: number;
  orderType: OrderType;
  allowsNotification: boolean;
}

interface UserInquiryResponseData {
  content: UserInquiryContentResponseData[];
  empty: boolean;
  first: boolean;
  last: boolean;
  number: number;
  numberOfElements: number;
  pageable: {
    offset: number;
    pageNumber: number;
    pageSize: number;
    paged: boolean;
    sort: {
      unsorted: boolean;
      sorted: boolean;
      empty: boolean;
    };
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
    unpaged: boolean;
  };
  size: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
}

// 문의 목록 조회
export const fetchPersonalInquiries = async (pageNo: number, pageSize: number): Promise<UserInquiryResponseData> => {
  const url = `${apiEntry}/v1/member-inquiries`;
  try {
    const { data } = await httpClient.get(url, {
      params: { page: pageNo, pageSize },
    });

    return data.data;
  } catch (err) {
    throw new UnknownError(err);
  }
};

// 문의 유형 코드 조회
export const getPersonalInquiryCodes = async (): Promise<Array<InquiryCategoryResponse>> => {
  const url = `${apiEntry}/v1/member-board/codes?groupCodeType=INQUIRY`;
  try {
    const { data } = await httpClient.get(url);
    return data.data;
  } catch (err) {
    throw new UnknownError(err);
  }
};

interface FetchPersonalInquiryOrdersReqParam {
  startDate: string;
  endDate: string;
  limit: number;
  page: number;
  keyword: string | null;
  orderNo: number | null;
}

interface PageableData<T> {
  items: Array<T>;
  totalPages: number; // 모든 페이지 개수
  totalElements: number; // 모든 엘리먼트 개수
  size: number; // 페이징 사이즈
  numberOfElements: number; // 현재 페이지 내 엘리먼트 개수
  number: number; // 페이지 번호
  last: boolean; // 첫번째 페이지 여부
  first: boolean; // 마지막 페이지 여부
}

interface MemberOrderResponseData {
  groupOrderNo: number;
  orderType: OrderType;
  dealProducts: {
    contentsProductNo: number;
    contentsProductName: string;
    dealProductNo: number;
    dealProductName: string;
    quantity: number;
    productPrice: number;
    imageUrl: string;
    orderedAt: string;
  }[];
}

export const fetchPersonalInquiryOrders = async (params: FetchPersonalInquiryOrdersReqParam) => {
  const url = `${apiEntry}/v1/orders`;
  try {
    const { data } = await httpClient.get<{ data: PageableData<MemberOrderResponseData> }>(url, {
      params,
    });

    return data.data;
  } catch (err) {
    throw new UnknownError(err);
  }
};

interface PostPersonalInquiryItemReqParam {
  id: number;
  oneToOneInquiryNo: number;
  subject: string;
  contents: string;
  inquiryTypeCode: string;
  inquiryTypeSubCode: string;
  allowsNotification: boolean;
  orderNo: number;
  orderProducts: {
    contentsProductNo: number | null;
    contentsProductName: string | null;
    dealProductNo?: number;
    dealProductName?: string;
    quantity: number;
    productPrice: number;
    imageUrl: string;
    orderedAt: string;
  }[];
}

export const postPersonalInquiryItem = async (param: PostPersonalInquiryItemReqParam) => {
  const url = `${apiEntry}/v1/member-inquiries`;

  try {
    await httpClient.post(url, param);
  } catch (err) {
    throw new UnknownError(err);
  }
};

type PutPersonalInquiryItemReqParam = PostPersonalInquiryItemReqParam;

export const updatePersonalInquiryItem = async (draftId: number, param: PutPersonalInquiryItemReqParam) => {
  const url = `${apiEntry}/v1/member-inquiries/${draftId}`;

  try {
    await httpClient.put(url, param);
  } catch (err) {
    throw new UnknownError(err);
  }
};

export const postPersonalInquiryItemDraft = async () => {
  const url = `${apiEntry}/v1/member-inquiries/draft`;

  try {
    const { data } = await httpClient.post<BaseResponse<{ id: number }>>(url);
    return data.data;
  } catch (err) {
    throw new UnknownError(err);
  }
};

export const getPersonalInquiryMemberInfo = async () => {
  const url = `${apiEntry}/v1/members/info`;

  try {
    const { data } = await httpClient.get<BaseResponse<{ memberMobileMasked: string }>>(url);
    return data.data;
  } catch (err) {
    throw new UnknownError(err);
  }
};

export const deletePersonalInquiryItem = async (inquiryId: number) => {
  const url = `${apiEntry}/v1/member-inquiries/${inquiryId}`;

  try {
    await httpClient.delete(url);
  } catch (err) {
    throw new UnknownError(err);
  }
};

interface PostAttachmentResponse {
  id: number;
  originalFilename: string;
  mimeType: string;
  path: string;
  host: string;
  size: number;
  createdDateTime: string;
}

export const postPersonalInquiryAttachment = async (draftId: number, attachment: File) => {
  const url = `${apiEntry}/v1/member-inquiries/${draftId}/attachments`;

  try {
    const form = new FormData();
    form.append('files', attachment);
    const { data } = await httpClient.post<BaseResponse<PostAttachmentResponse[]>>(url, form);
    return data.data;
  } catch (err) {
    throw new UnknownError(err);
  }
};

export const deletePersonalInquiryAttachment = async (draftId: number, attachmentId: number) => {
  const url = `${apiEntry}/v1/member-inquiries/${draftId}/attachments/${attachmentId}`;
  try {
    await httpClient.delete(url);
  } catch (err) {
    throw new UnknownError(err);
  }
};
