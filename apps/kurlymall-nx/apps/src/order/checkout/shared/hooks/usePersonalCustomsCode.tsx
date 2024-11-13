import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import useGetPersonalCustomsCode from './queries/useGetPersonalCustomsCode';
import { setValue } from '../reducers/checkout.slice';
import { isPC } from '../../../../../util/window/getDevice';

const usePersonalCustomsCode = () => {
  const dispatch = useDispatch();
  const { data, isLoading, isError, refetch, isRefetching } = useGetPersonalCustomsCode();

  const hasPCC = !!data?.personalCustomsCode;
  const showSkeleton = isLoading || isError || isRefetching;

  const TooltipMessage = (
    <>
      {hasPCC ? '수정' : '입력'} 버튼 클릭 시 해외직배송상품 이용 안내
      {!isPC && <br />}를 확인할 수 있어요.
    </>
  );

  useEffect(() => {
    if (data) {
      dispatch(setValue({ personalCustomsCode: data.personalCustomsCode }));
    }
  }, [data, dispatch]);

  return {
    showSkeleton,
    hasPCC,
    personalCustomsCode: data?.personalCustomsCode,
    refetch,
    TooltipMessage,
  };
};

export default usePersonalCustomsCode;
