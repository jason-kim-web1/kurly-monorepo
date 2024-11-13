import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';

import { useAppSelector } from '../../../../../shared/store';
import { orderCheckoutKeys } from '../../../../../mypage/order/shared/util/queryKeys';
import { notifyAndCloseWebview } from '../../../../../shared/reducers/page';
import { getPersonalCustomsCode } from '../../../../../shared/api';
import { isWebview } from '../../../../../../util/window/getDevice';
import Alert from '../../../../../shared/components/Alert/Alert';

function useGetPersonalCustomsCode() {
  const dispatch = useDispatch();
  const hasSession = useAppSelector(({ auth }) => auth.hasSession);

  const queryResult = useQuery(orderCheckoutKeys.personalCustomsCode(), getPersonalCustomsCode, {
    enabled: hasSession,
    select: (data) => ({ personalCustomsCode: data.personalCustomsCode ?? '' }),
  });

  const { error } = queryResult;

  useEffect(() => {
    if (error instanceof Error) {
      const handleError = async (err: Error) => {
        if (isWebview()) {
          dispatch(notifyAndCloseWebview(err.message));
          return;
        } else {
          await Alert({ text: err.message });
          window.history.back();
        }
      };

      handleError(error);
    }
  }, [error, dispatch]);

  return queryResult;
}

export default useGetPersonalCustomsCode;
