import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { isEmpty } from 'lodash';

import { ParsedUrlQuery } from 'querystring';

import { useAppSelector } from '../../../../shared/store';
import {
  loadCancelOrder,
  postCancelOrder,
  resetMypageGiftCancel,
  setCancelReason,
  setCancelReasonEtc,
} from '../reducers/mypage-gift-cancel.slice';

import { notifyAndFocus, notifyAndRedirectTo } from '../../../../shared/reducers/page';
import { CancelDetail } from '../services/cancel-order.service';
import { COMMON_PATH, getPageUrl } from '../../../../shared/constant';

import Alert from '../../../../shared/components/Alert/Alert';

interface CancelInfoResponse {
  isLoading: boolean;
  cancelInfo: CancelDetail;
  cancelReason: {
    list: string[];
    selectedReason: string;
    etcValue: string;
  };
  changeReason: (params: { value: string }) => void;
  changeReasonEtc: (value: string) => void;
  submitCancel: () => void;
}

export default function useCheckoutCancel(): CancelInfoResponse {
  const router = useRouter();
  const dispatch = useDispatch();

  const { isLoading, cancelInfo, cancelReasonList, selectedReason, etcReason } = useAppSelector(
    ({ mypageGiftCancel }) => mypageGiftCancel,
  );

  const { orderNo } = router.query as ParsedUrlQuery & { orderNo: string };

  const changeReason = ({ value }: { value: string }) => {
    dispatch(setCancelReason(value));
  };

  const changeReasonEtc = (value: string) => {
    dispatch(setCancelReason('기타'));
    dispatch(setCancelReasonEtc(value));
  };

  const submitCancel = () => {
    Alert({
      text: '정말 주문을 취소하시겠습니까? 주문을 취소하시면 상품이 품절되어 다시 구매가 불가능 할 수도 있습니다.',
      showCancelButton: true,
    }).then(({ isConfirmed }) => {
      if (!isConfirmed) {
        return;
      }

      if (selectedReason === '기타' && isEmpty(etcReason)) {
        dispatch(
          notifyAndFocus({
            message: '취소 사유를 적어주세요.',
            documentId: 'cancel-reason-etc',
          }),
        );
        return;
      }

      dispatch(postCancelOrder());
    });
  };

  useEffect(() => {
    if (!router.isReady) {
      return;
    }

    if (isEmpty(orderNo)) {
      dispatch(
        notifyAndRedirectTo({
          message: '존재하지 않는 주문번호입니다.',
          redirectUrl: getPageUrl(COMMON_PATH.error),
        }),
      );
    }

    dispatch(loadCancelOrder(orderNo));

    return () => {
      dispatch(resetMypageGiftCancel());
    };
  }, [dispatch, orderNo, router]);

  return {
    isLoading,
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
