import { eq, get } from 'lodash';

import { ParsedUrlQuery } from 'querystring';
import { getSingleQueryValue } from '../../shared/utils/url';

type RefererInfo = {
  name: string;
  no: number;
};

const INVALID_PRODUCT_NAME = '';
const INVALID_PRODUCT_NO = 0;

const REFERER_INFO_DATA = [
  {
    queryKeyName: 'referer_name',
    valueKeyName: 'name',
    parseFn: (value: string | null): string => {
      if (!value) {
        return INVALID_PRODUCT_NAME;
      }
      return value;
    },
  },
  {
    queryKeyName: 'referer_no',
    valueKeyName: 'no',
    parseFn: (value: string | null): number => {
      if (!value) {
        return INVALID_PRODUCT_NO;
      }
      const parsedValue = parseInt(value, 10);
      if (isNaN(parsedValue)) {
        return INVALID_PRODUCT_NO;
      }
      return parsedValue;
    },
  },
];

/**
 * 추천 상품 유입 정보가 담긴 상품상세 Path 생성
 * ex: 상품 A (1) 상세에서 추천된 상품 B (2) 으로로 이동하는 경우 상품 A (1) 에 노출되는 상품 B (2) 의 주소는 /goods/2?referer_name=상품A&referer_no=1
 * @param productDetailPath
 * @param refererInfo
 */
const createProductDetailPathWithReferer = (productDetailPath: string, refererInfo: RefererInfo) => {
  const params = new URLSearchParams();
  REFERER_INFO_DATA.forEach(({ queryKeyName, valueKeyName }) => {
    const value = get(refererInfo, valueKeyName, '');
    if (!value) {
      return;
    }
    params.append(queryKeyName, get(refererInfo, valueKeyName, ''));
  });
  const size = [...params.values()].length;
  if (eq(size, 0)) {
    return productDetailPath;
  }
  return `${productDetailPath}?${params.toString()}`;
};

const getRefererInfoFromQueryParams = (params: ParsedUrlQuery): RefererInfo => {
  const no = getSingleQueryValue(params.referer_no);
  const name = getSingleQueryValue(params.referer_name);
  const parsedNo = parseInt(no, 10);
  return {
    name,
    no: isNaN(parsedNo) ? INVALID_PRODUCT_NO : parsedNo,
  };
};

export { createProductDetailPathWithReferer, getRefererInfoFromQueryParams };
