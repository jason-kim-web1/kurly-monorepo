import {
  DEFAULT_GROUP_CONTENT_NO,
  DEFAULT_NORMAL_CONTENT_NO,
  DEFAULT_PARTNER_CONTENT_NO,
} from '../../../constant/productNo';

export function getPackageId(productContentNo: number) {
  // 콘텐츠번호가 10억 이상(콘텐츠 그룹도 포함되며, 상품개편 이후에 등록됨) : package_id는 Null
  if (productContentNo >= DEFAULT_PARTNER_CONTENT_NO) {
    return null;
  }

  // 콘텐츠번호가 5,000,001 ~ 10,000,000 : package_id는 콘텐츠번호 - 5,000,000
  if (productContentNo > DEFAULT_NORMAL_CONTENT_NO && productContentNo <= DEFAULT_GROUP_CONTENT_NO) {
    return productContentNo - DEFAULT_NORMAL_CONTENT_NO;
  }

  return null;
}
