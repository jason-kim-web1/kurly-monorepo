import { useDispatch } from 'react-redux';

import { ContentType, DealProduct } from '../types';
import Alert from '../../../shared/components/Alert/Alert';
import { isPC } from '../../../../util/window/getDevice';
import { updateDealProductQuantity } from '../slice';
import { useProductDetail } from './useProductDetail';

export default function useDealProduct(contentNo: number, dealProduct: DealProduct, contentType: ContentType) {
  const dispatch = useDispatch();
  const { no, name, maxEa, minEa } = dealProduct;
  const { onChangeDealProductQuantity } = useProductDetail(contentNo);
  const changeQuantity = (newQuantity: number) => {
    if (maxEa < newQuantity) {
      Alert({
        title: isPC ? '알림' : '',
        text: `${name} 상품의 \n최대 구매 수량은 ${maxEa}개 입니다.`,
        styles: isPC
          ? {}
          : {
              textAlign: 'left',
            },
      });
      return;
    }
    const minQuantity = newQuantity < minEa ? minEa : newQuantity;
    const quantity = contentType === 'MULTI' ? newQuantity : minQuantity;
    dispatch(
      updateDealProductQuantity({
        targetProductNo: no,
        quantity,
      }),
    );
    onChangeDealProductQuantity(no, quantity);
  };

  const deselect = () => {
    dispatch(
      updateDealProductQuantity({
        targetProductNo: no,
        quantity: 0,
      }),
    );
    onChangeDealProductQuantity(no, 0);
  };

  return { changeQuantity, deselect };
}
