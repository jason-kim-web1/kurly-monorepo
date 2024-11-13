import { requestBulkOrder } from '../../../shared/api/mypage/bulk-order';
import { BulkOrderFormRequest, BulkOrderFormResponse } from '../interfaces/BulkOrderForm.interface';

export const postBulkOrder = async (params: BulkOrderFormRequest): Promise<BulkOrderFormResponse> => {
  return requestBulkOrder(params);
};
