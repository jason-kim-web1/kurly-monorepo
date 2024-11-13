import { useDispatch, useSelector } from 'react-redux';

import { MemberOrderProduct } from '../shared/types';
import { toggleSelectOrderProduct } from '../form/slice';
import { AppState } from '../../../shared/store';
import { notify } from '../../../shared/reducers/page';

export default function useOrderProductItem(product: MemberOrderProduct) {
  const personalInquiryFormState = useSelector(({ personalInquiryForm }: AppState) => personalInquiryForm);

  const { orderProductPicker } = personalInquiryFormState;

  const type = personalInquiryFormState.orderProductType;
  const selectionEnabled = type === 'OPTIONAL_EACH' || type === 'EACH';

  const dispatch = useDispatch();

  const toggleSelect = async () => {
    const selectedOrderProduct = orderProductPicker.orders.reduce((prev, curr) => {
      const selectedProducts = curr.products.filter((it) => it.selected);
      return prev.concat(selectedProducts);
    }, [] as Array<MemberOrderProduct>)[0];

    if (selectedOrderProduct && selectedOrderProduct.orderNo !== product.orderNo) {
      dispatch(notify('동일 주문번호 내의 상품만 중복으로 선택 가능합니다.'));
    }

    dispatch(toggleSelectOrderProduct(product));
  };

  return { toggleSelect, selectionEnabled };
}
