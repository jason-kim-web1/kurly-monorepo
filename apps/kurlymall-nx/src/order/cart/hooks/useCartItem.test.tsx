import { screen } from '@testing-library/react';

import userEvent from '@testing-library/user-event';

import { renderHookWithProviders } from '../../../../util/testutil';

import useCartItem from './useCartItem';
import useDeleteCartItemMutation from '../queries/useDeleteCartItemMutation';
import useChangeQuantityMutation from '../queries/useChangeQuantityMutation';
import { KurlyDeliveryColdProduct } from '../constants/__mocks__/mockCartDetail';
import useCartDetailQuery from '../queries/useCartDetailQuery';
import { DELETE_TYPE } from '../constants/SelectionType';

jest.mock('../queries/useDeleteCartItemMutation');
jest.mock('../queries/useChangeQuantityMutation');
jest.mock('../queries/useCartDetailQuery');

const deleteCartItem = jest.fn();
const changeCartItem = jest.fn();
const onChangeGuestCartItemQuantity = jest.fn();

describe('useCartItem', () => {
  const renderUseCartItem = (preloadedState = {}) => renderHookWithProviders(useCartItem, { preloadedState });

  beforeEach(() => {
    (useDeleteCartItemMutation as jest.Mock).mockReturnValue({
      mutateAsync: deleteCartItem,
    });
    (useChangeQuantityMutation as jest.Mock).mockReturnValue({
      mutateAsync: changeCartItem,
      onChangeGuestCartItemQuantity,
    });
    (useCartDetailQuery as jest.Mock).mockReturnValue({
      data: {},
    });
  });

  context('onDelete 를 call 하면', () => {
    it('삭제 confirm 메세지를 띄우고, 확인 클릭 시 삭제 mutateAsync 를 요청한다.', async () => {
      const { result, waitFor } = renderUseCartItem();

      result.current.onDelete({
        message: '삭제하시겠습니까?',
        products: [KurlyDeliveryColdProduct],
        selectionType: DELETE_TYPE.PRODUCT,
      });

      const alert = await screen.findByText('삭제하시겠습니까?');
      expect(alert).toBeInTheDocument();

      const button = await screen.findByLabelText('confirm-button');
      userEvent.click(button);

      await waitFor(() => {
        expect(deleteCartItem).toBeCalledWith({
          products: [KurlyDeliveryColdProduct],
          dealProductNos: [KurlyDeliveryColdProduct.dealProductNo],
          selectionType: DELETE_TYPE.PRODUCT,
        });
      });
    });
  });

  context('onChange 를 call 하면', () => {
    context('비회원 일 때', () => {
      it('onChangeGuestCartItemQuantity 를 실행한다.', async () => {
        const changedQuantity = KurlyDeliveryColdProduct.quantity + 1;

        const { result, waitFor } = renderUseCartItem({
          auth: {
            isGuest: true,
          },
        });

        result.current.onChange({ quantity: changedQuantity, item: KurlyDeliveryColdProduct });

        await waitFor(() => {
          expect(onChangeGuestCartItemQuantity).toBeCalledWith({
            dealProductNo: KurlyDeliveryColdProduct.dealProductNo,
            quantity: changedQuantity,
          });
        });
      });
    });

    context('비회원이 아닐 때', () => {
      it('changeCartItem mutateAsync 를 요청한다.', async () => {
        const changedQuantity = KurlyDeliveryColdProduct.quantity + 1;

        const { result, waitFor } = renderUseCartItem({
          auth: {
            isGuest: false,
          },
        });

        result.current.onChange({ quantity: changedQuantity, item: KurlyDeliveryColdProduct });

        await waitFor(() => {
          expect(changeCartItem).toBeCalledWith({
            dealProductNo: KurlyDeliveryColdProduct.dealProductNo,
            quantity: changedQuantity,
          });
        });
      });
    });
  });
});
