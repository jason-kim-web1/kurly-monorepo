import { eq, isUndefined } from 'lodash';

import { ne } from '../../../../shared/utils/lodash-extends';
import { productStatusMap } from '../../../../shared/services/product.service';
import type { ProductStatusCode } from '../../../../shared/interfaces';
import { isPC } from '../../../../../util/window/getDevice';

/**
 * 넘버형 디자인 타입의 상품일 경우 사용되는 랭킹을 반환하는 함수
 * @param rank 상품 랭킹
 * @param code 상품 판매 상태
 * @param soldOutStartRank 품절 상품이 시작되는 랭킹(품절 상품은 맨 뒤로 sorting 처리 되어 오기 때문)
 * @description
 * 랭킹 노출 조건 (아래 조건을 모두 만족해야 함)
 * 1. 넘버형 디자인 타입일 경우
 * 2. 100위 이하의 상품인 경우
 * 3. 품절 상품이 아닐 경우
 */
const getNumberTypeProductRanking = (rank: number, code: ProductStatusCode, soldOutStartRank?: number): number => {
  if (rank > 100) {
    return -1;
  }

  if (isPC) {
    if (eq(code, productStatusMap.SOLD_OUT)) {
      return -1;
    }
    return rank;
  }

  if (isUndefined(soldOutStartRank)) {
    return -1;
  }

  /**
   * 모바일 화면(2x2)의 경우 동일한 row에 품절 상품이 존재할 경우
   * 해당 품절 상품의 랭킹을 비노출하되 row 높이를 동일하게 맞추게 설정하고
   * 해당 상품 이후에 나오는 품절 상품들에 대해서는 랭킹 영역을 할당하지 않음
   *
   * PC의 경우에는 랭킹의 노출여부에 상관없이 랭킹 영역을 할당함
   */
  if (
    (ne(soldOutStartRank, -1) && rank > soldOutStartRank) ||
    (eq(rank, soldOutStartRank) && eq(soldOutStartRank % 2, 1))
  ) {
    return -1;
  }

  return rank;
};

export { getNumberTypeProductRanking };
