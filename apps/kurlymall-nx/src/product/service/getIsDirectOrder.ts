import { DirectOrderType } from '../detail/types';

export default function getIsDirectOrder(directOrderType: DirectOrderType) {
  if (directOrderType === 'SINGLE_DIRECT_ORDER' || directOrderType === 'MULTIPLE_DIRECT_ORDER') {
    return true;
  }

  return false;
}
