import { useMemo } from 'react';

import { RequestState, RequestStateType, textMap } from '../types/requestStateType';

export default function useRequestState(
  requestState: RequestStateType | '' | undefined,
  completeRequest: boolean | undefined,
) {
  const title = useMemo(() => {
    if (completeRequest) {
      return textMap.complete.title;
    }
    if (requestState === RequestState.REQUESTED) {
      return textMap.request.title;
    }
    if (requestState === RequestState.APPROVED) {
      return textMap.approved.title;
    }
    if (requestState === RequestState.REJECTED) {
      return textMap.rejected.title;
    }
  }, [requestState, completeRequest]);

  const message = useMemo(() => {
    if (completeRequest) {
      return textMap.complete.message;
    }
    if (requestState === RequestState.REQUESTED) {
      return textMap.request.message;
    }
    if (requestState === RequestState.APPROVED) {
      return textMap.approved.message;
    }
    if (requestState === RequestState.REJECTED) {
      return textMap.rejected.message;
    }
  }, [requestState, completeRequest]);

  return {
    title,
    message,
  };
}
