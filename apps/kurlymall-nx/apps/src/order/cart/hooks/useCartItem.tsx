import { isEmpty } from 'lodash';

import { useCallback } from 'react';

import { useDispatch } from 'react-redux';

import { Alert } from '@thefarmersfront/kpds-react';

import useChangeQuantityMutation from '../queries/useChangeQuantityMutation';
import { CartProduct } from '../interface/CartProduct';
import { getCorrectQuantity } from '../utils/getCorrectQuantity';
import { getQuantityAlertMessage } from '../utils/getQuantityAlertMessage';

import { useAppSelector } from '../../../shared/store';
import useCheckboxStatus from './useCheckboxStatus';
import { addCartItem, removeCartItem } from '../store/cart';
import useDeleteCartItemMutation from '../queries/useDeleteCartItemMutation';
import { DeleteType } from '../constants/SelectionType';

export interface DeleteProps {
  message?: string;
  products: CartProduct[];
  selectionType: DeleteType;
}

export interface ChangeProps {
  quantity: number;
  item: CartProduct;
}

export interface ToggleProps {
  checked: boolean;
  items: CartProduct[];
}

export default function useCartItem() {
  const dispatch = useDispatch();
  const selectedCartItems = useAppSelector(({ cart }) => cart.selectedCartItems);

  const isGuest = useAppSelector(({ auth }) => auth.isGuest);

  const { mutateAsync: changeCartItem, onChangeGuestCartItemQuantity } = useChangeQuantityMutation();
  const { mutateAsync: deleteCartItem } = useDeleteCartItemMutation();
  const { onToggleCheckboxStatus, onDeleteCheckboxStatus } = useCheckboxStatus();

  const isChecked = (product: CartProduct) => selectedCartItems.includes(product.dealProductNo);

  const onDelete = async ({ message = '삭제하시겠습니까?', products, selectionType }: DeleteProps) => {
    const { isConfirmed } = await Alert({
      contents: message,
      showCancelButton: true,
    });

    if (!isConfirmed) {
      return;
    }

    const dealProductNos = products.map((it) => it.dealProductNo);
    await deleteCartItem({ products, dealProductNos, selectionType });

    onDeleteCheckboxStatus({ dealProductNos });
  };

  const onChange = async ({ quantity, item }: ChangeProps) => {
    // 1) 묶음 단위 수량 검증
    const correctQuantity = getCorrectQuantity({
      quantity,
      item,
    });

    // 2) 최소, 최대 수량 검증
    const { text, changedQuantity } = getQuantityAlertMessage({
      quantity: correctQuantity,
      item,
    });

    if (!isEmpty(text)) {
      await Alert({ contents: text });
    }

    if (item.quantity === changedQuantity) {
      return;
    }

    const cartItem = { dealProductNo: item.dealProductNo, quantity: correctQuantity };
    if (isGuest) {
      await onChangeGuestCartItemQuantity(cartItem);
      return;
    }
    await changeCartItem(cartItem);
  };

  const onToggle = useCallback(
    ({ checked, items }: ToggleProps) => {
      const dealProductNos = items.map((item) => item.dealProductNo);

      if (checked) {
        dispatch(addCartItem({ dealProductNos }));
      } else {
        dispatch(removeCartItem({ dealProductNos }));
      }

      dealProductNos.map((dealProductNo) => onToggleCheckboxStatus({ checked, dealProductNo }));
    },
    [dispatch, onToggleCheckboxStatus],
  );

  return {
    isChecked,
    onDelete,
    onChange,
    onToggle,
  };
}
