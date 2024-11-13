import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { isEmpty } from 'lodash';

import { ParsedUrlQuery } from 'querystring';

import { useAppSelector } from '../../../../shared/store';
import {
  loadCancelOrder,
  postCancelOrder,
  setCancelReason,
  setCanceling,
  setCancelReasonEtc,
  initMypageCancel,
} from '../../mypage-cancel.slice';

import { notifyAndFocus, notifyAndRedirectTo } from '../../../../shared/reducers/page';
import { COMMON_PATH, getPageUrl } from '../../../../shared/constant';

import Alert from '../../../../shared/components/Alert/Alert';

export default function useCheckoutCancel() {
  const router = useRouter();
  const dispatch = useDispatch();

  const { isLoading, productsSummary, cancelInfo, cancelReasonList, selectedReason, etcReason, isCanceling } =
    useAppSelector(({ mypageCancel }) => mypageCancel);

  const { groupOrderNo, orderNos } = router.query as ParsedUrlQuery & { groupOrderNo: string; orderNos?: string };

  const changeReason = ({ value }: { value: string }) => {
    dispatch(setCancelReason(value));
  };

  const changeReasonEtc = (value: string) => {
    dispatch(setCancelReason('기타'));
    dispatch(setCancelReasonEtc(value));
  };

  const submitCancel = () => {
    if (isCanceling) {
      return;
    }

    dispatch(setCanceling(true));

    Alert({
      text: '정말 주문을 취소하시겠습니까? 주문을 취소하시면 상품이 품절되어 다시 구매가 불가능 할 수도 있습니다.',
      showCancelButton: true,
    }).then(({ isConfirmed }) => {
      if (!isConfirmed) {
        dispatch(setCanceling(false));
        return;
      }

      if (selectedReason === '기타' && isEmpty(etcReason)) {
        dispatch(
          notifyAndFocus({
            message: '취소 사유를 적어주세요.',
            documentId: 'cancel-reason-etc',
          }),
        );
        dispatch(setCanceling(false));
        return;
      }

      dispatch(postCancelOrder());
    });
  };

  useEffect(() => {
    if (!router.isReady) {
      return;
    }
    dispatch(initMypageCancel());

    if (isEmpty(groupOrderNo)) {
      dispatch(
        notifyAndRedirectTo({
          message: '존재하지 않는 주문번호입니다.',
          redirectUrl: getPageUrl(COMMON_PATH.error),
        }),
      );
    }

    dispatch(
      loadCancelOrder(
        Number(groupOrderNo),
        orderNos?.split(',').map((orderNo) => Number(orderNo)),
      ),
    );

    return () => {
      dispatch(initMypageCancel());
    };
  }, [dispatch, groupOrderNo, orderNos, router]);

  return {
    isLoading,
    isCanceling,
    productsSummary,
    cancelInfo,
    cancelReason: {
      list: cancelReasonList,
      selectedReason,
      etcValue: etcReason,
    },
    changeReason,
    changeReasonEtc,
    submitCancel,
  };
}
