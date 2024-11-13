export type InquiryContentType = 'ANSWER' | 'QUESTION';

export type InquiryOrderProductType = 'OPTIONAL_EACH' | 'EACH' | 'ALL' | 'NONE';

export interface InquiryCategoryResponse {
  id: number;
  code: string;
  codeName: string;
  sort: number;
  depth: number;
  createdDateTime: string;
  // eslint-disable-next-line no-use-before-define
  childCodes: Array<SubInquiryCategoryResponse>;
}

export interface InquiryCategory {
  id: number;
  value: string;
  name: string;
  // eslint-disable-next-line no-use-before-define
  childCodes: Array<SubInquiryCategory>;
}

export interface SubInquiryCategoryResponse extends InquiryCategoryResponse {
  parentCode: string;
  orderProductType: InquiryOrderProductType;
  isRegisterImage: boolean;
}

export interface SubInquiryCategory extends InquiryCategory {
  parentCode: string;
  orderProductType: InquiryOrderProductType;
  isRegisterImage: boolean;
}

export interface PostPersonalInquiryRequestParam {
  subject: string;
  contents: string;
  oneToOneInquiryNo: number;
  inquiryTypeCode: string;
  inquiryTypeSubCode: string;
  allowsNotification: boolean;
  orderProducts: Array<any>;
}
