import httpClient from '../../../shared/configs/http-client';
import { UnknownError } from '../../../shared/errors';
import { CheckProductReAddAvailableRequest } from '../interface/Request';
import { CheckProductReAddAvailableResponse } from '../interface/Response';

// 해당 상품들이 장바구니 다시 담기가 가능한 상태인지 체크하는 함수
// PMS 데이터 보다 상품의 재고, 현재 전시 활성화 등 더 상세히 판단하는 내용
export const checkProductReAddAvailable = async (param: CheckProductReAddAvailableRequest) => {
  const url = '/repeat-checkout/v1/check-available';

  try {
    const { data } = await httpClient.post<CheckProductReAddAvailableResponse>(url, param);

    return data.data;
  } catch (err) {
    throw new UnknownError(err as Error);
  }
};
