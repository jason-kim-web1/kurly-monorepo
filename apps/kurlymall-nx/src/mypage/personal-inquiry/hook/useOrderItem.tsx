import { useDispatch, useSelector } from 'react-redux';

import { MemberOrder } from '../shared/types';
import { toggleFoldOrder, toggleSelectOrder } from '../form/slice';
import { notify } from '../../../shared/reducers/page';
import { AppState } from '../../../shared/store';

export default function useOrderItem(order: MemberOrder) {
  const { orderProductPicker } = useSelector(({ personalInquiryForm }: AppState) => personalInquiryForm);

  const dispatch = useDispatch();

  const toggleSelect = () => {
    const selectedOrder = orderProductPicker.orders.find((it) => it.selected);

    if (selectedOrder && selectedOrder.orderNo !== order.orderNo) {
      dispatch(notify('동일 주문번호 내의 상품만 중복으로 선택 가능합니다.'));
    }

    dispatch(toggleSelectOrder(order));
  };

  const toggleFold = () => {
    dispatch(toggleFoldOrder(order));
  };

  return { toggleSelect, toggleFold };
}
