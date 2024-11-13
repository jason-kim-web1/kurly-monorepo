import { useCallback, useEffect, useState } from 'react';

import { useDispatch } from 'react-redux';

import { useRouter } from 'next/router';

import usePickListQuery from './usePickListQuery';

import { PRODUCT_PATH } from '../../../shared/constant';
import { PickProduct } from '../../../shared/api';
import Alert from '../../../shared/components/Alert/Alert';
import { RemovePickProduct, SelectProduct, SelectProductShortcut } from '../../../shared/amplitude/events';
import { notify } from '../../../shared/reducers/page';
import { amplitudeService } from '../../../shared/amplitude';
import type { ShortCutType } from '../../../shared/types';
import usePickListDeleteMutation from './usePickListDeleteMutation';
import { SHORTCUT_TYPE } from '../../../shared/constant/shortcut-type';
import { loadMyKurlyInfo } from '../../info-section/mykurly.slice';
import { isPC } from '../../../../util/window/getDevice';

export default function usePickButtonEvent() {
  const dispatch = useDispatch();
  const router = useRouter();

  const {
    isLoading,
    mutate: mutateDelete,
    isSuccess: isDeleteMutationSuccess,
    isError: isDeleteMutationError,
    reset,
  } = usePickListDeleteMutation();

  const { refetch } = usePickListQuery();

  const [productCode, setProductCode] = useState<string | null>(null);
  const [openedRestock, setOpenedRestock] = useState(false);
  const [type, setType] = useState<ShortCutType>();

  useEffect(() => {
    if (!isDeleteMutationError) {
      return;
    }
    dispatch(notify('일시적인 오류가 발생했습니다.\n잠시 후 다시 시도해주세요.'));
    reset();
  }, [isDeleteMutationError, dispatch, reset]);

  useEffect(() => {
    if (!isDeleteMutationSuccess) {
      return;
    }
    refetch();

    if (isPC) {
      dispatch(loadMyKurlyInfo());
    }
  }, [isDeleteMutationSuccess, refetch, dispatch]);

  const handleClickEmptyButton = useCallback(() => {
    router.push(PRODUCT_PATH.marketBest.uri);
  }, [router]);

  const handleClickRemoveButton = useCallback(
    (product: PickProduct) => async () => {
      const { isConfirmed } = await Alert({
        text: '삭제하시겠습니까?',
        confirmButtonText: '삭제',
        showCancelButton: true,
      });

      if (!isConfirmed) {
        return;
      }

      if (isLoading) {
        return;
      }

      await mutateDelete({ productNo: product.no, isPick: false });
      amplitudeService.logEvent(new RemovePickProduct({ product }));
    },
    [isLoading, mutateDelete],
  );

  const handleClickMoveTo = useCallback(
    (product: PickProduct, index: number) => () => {
      // 찜한 상품 페이지에서 바로구매 버튼을 누르면 바로 상품상세로 이동하므로 숏컷 타입은 purchase가 아닌 detail로 지정
      amplitudeService.logEvent(new SelectProductShortcut({ product, index, type: SHORTCUT_TYPE.DETAIL }));
      router.push(`/goods/${product.no}`);
    },
    [router],
  );

  const handleClickLink = useCallback(
    (product: PickProduct, index: number) => () => {
      amplitudeService.logEvent(
        new SelectProduct({
          product,
          index,
        }),
      );
    },
    [],
  );

  const handleClickCart = useCallback(
    (product: PickProduct, index: number) => () => {
      setType(SHORTCUT_TYPE.CART);
      setProductCode(product.no.toString());

      amplitudeService.logEvent(new SelectProductShortcut({ product, index, type: SHORTCUT_TYPE.CART }));
    },
    [],
  );

  const handleClickClose = useCallback(() => {
    setProductCode(null);
  }, []);

  const handleClickRestock = (product: PickProduct, index: number) => {
    setType(SHORTCUT_TYPE.RESTOCK_NOTIFICATION);
    setProductCode(product.no.toString());

    amplitudeService.logEvent(new SelectProductShortcut({ product, index, type: SHORTCUT_TYPE.RESTOCK_NOTIFICATION }));
    setOpenedRestock(true);
  };

  const handleCloseRestock = useCallback(() => setOpenedRestock(false), []);

  return {
    type,
    setType,
    productCode,
    setProductCode,
    openedRestock,
    setOpenedRestock,
    handleClickEmptyButton,
    handleClickRemoveButton,
    handleClickMoveTo,
    handleClickLink,
    handleClickCart,
    handleClickClose,
    handleClickRestock,
    handleCloseRestock,
  };
}
