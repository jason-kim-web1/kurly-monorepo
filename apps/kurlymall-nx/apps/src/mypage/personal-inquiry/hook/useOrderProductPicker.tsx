import { useDispatch } from 'react-redux';
import { head } from 'lodash';
import { useMemo } from 'react';

import { MemberOrderProduct } from '../shared/types';
import { useAppSelector } from '../../../shared/store';
import { clearSelectedProducts, setSelectedOrderProducts } from '../form/slice';

export default function useOrderProductPicker() {
  const { selectedOrderProducts, orders } = useAppSelector(
    ({ personalInquiryForm }) => personalInquiryForm.orderProductPicker,
  );

  const dispatch = useDispatch();

  const deselectProduct = (target: MemberOrderProduct) => {
    const newValues = selectedOrderProducts.filter((it) => it.dealProductNo !== target.dealProductNo);
    dispatch(setSelectedOrderProducts(newValues));
  };

  const completeProductSelection = () => {
    dispatch(clearSelectedProducts());
    const products = orders
      .reduce((prev, curr) => prev.concat(...curr.products), [] as Array<MemberOrderProduct>)
      .filter((product) => product.selected);
    dispatch(setSelectedOrderProducts(products));
  };

  const selectedOrder = useMemo(() => {
    if (!selectedOrderProducts || selectedOrderProducts.length < 1 || !orders || orders.length < 1) {
      return undefined;
    }
    const firstEle = head(selectedOrderProducts);
    return orders.find(({ orderNo }) => orderNo === firstEle?.orderNo);
  }, [selectedOrderProducts, orders]);

  return {
    selectedOrder,
    selectedOrderProducts,
    deselectProduct,
    completeProductSelection,
  };
}
