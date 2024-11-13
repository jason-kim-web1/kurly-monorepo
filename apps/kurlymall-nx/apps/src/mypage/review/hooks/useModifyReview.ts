import { useEffect, useRef } from 'react';
import { eq, get } from 'lodash';
import type { AxiosError } from 'axios';
import { useQueryClient } from '@tanstack/react-query';

import { ALERT_MESSAGES, REVIEW_PASS_RESULT_STATUS, REVIEW_PASS_STATUS, REVIEW_VISIBILITY_TYPES } from '../constants';
import { useUpdateReview } from './useUpdateReview';
import { getOnline } from '../../../shared/utils/getOnline';
import Alert, { checkClosedByBackDrop } from '../../../shared/components/Alert/Alert';
import { getErrorMessage } from '../../../shared/utils/getErrorMessage';
import { ignoreError } from '../../../shared/utils/general';
import type { ReviewVisibilityType, ReviewPassStatusType } from '../types';
import { QueryKeys } from '../queries';

interface Options {
  modifyData: {
    reviewId: number;
    contents: string;
    visibility?: ReviewVisibilityType;
    uploadImages: string[];
    deleteImages: number[];
  };
  onSuccess(): void;
  onFailedByTextContent(): void;
  onOfflineRetryCancel(): void;
}

export const useModifyReview = (options: Options) => {
  const queryClient = useQueryClient();
  const { modifyData, onSuccess, onFailedByTextContent, onOfflineRetryCancel } = options;
  const passStatusRef = useRef<ReviewPassStatusType>(REVIEW_PASS_STATUS.ALL);
  const { mutateAsync, isLoading, isSuccess, isError, error: modifyError, reset } = useUpdateReview();

  const handleModify = async () => {
    if (!getOnline()) {
      const { isConfirmed, dismiss } = await Alert({
        text: ALERT_MESSAGES.CONFIRM_RETRY_MODIFICATION,
        showCancelButton: true,
        confirmButtonText: '재시도',
      });
      const isChooseNothing = checkClosedByBackDrop(dismiss);
      if (isChooseNothing) {
        return;
      }
      if (!isConfirmed) {
        onOfflineRetryCancel();
        return;
      }
      handleModify();
      return;
    }
    const { visibility } = modifyData;
    const nextVisibility = eq(visibility, REVIEW_VISIBILITY_TYPES.PUBLIC)
      ? REVIEW_VISIBILITY_TYPES.PUBLIC
      : REVIEW_VISIBILITY_TYPES.PRIVATE;
    ignoreError(async () => {
      await mutateAsync({
        ...modifyData,
        visibility: nextVisibility,
        passStatus: passStatusRef.current,
      });
    });
  };

  const handleSuccess = async () => {
    await Alert({ text: ALERT_MESSAGES.REVIEW_CHANGE_SUCCESS });
    ignoreError(async () => {
      await queryClient.invalidateQueries({
        queryKey: QueryKeys.base(),
        exact: false,
      });
    });
    onSuccess();
  };

  const handleError = async (error: AxiosError | null) => {
    const resultPassStatus = get(error, 'response.data.data.status');
    const message = getErrorMessage(error as AxiosError);
    if (eq(resultPassStatus, REVIEW_PASS_RESULT_STATUS.MEANINGLESS)) {
      const { isConfirmed, dismiss } = await Alert({
        text: message,
        showCancelButton: true,
        cancelButtonText: '이대로 등록하기',
        confirmButtonText: '내용 수정하기',
      });
      const isChooseNothing = checkClosedByBackDrop(dismiss);
      if (isChooseNothing) {
        passStatusRef.current = REVIEW_PASS_STATUS.ALL;
        reset();
        return;
      }
      if (isConfirmed) {
        passStatusRef.current = REVIEW_PASS_STATUS.ALL;
        onFailedByTextContent();
        reset();
        return;
      }
      passStatusRef.current = REVIEW_PASS_STATUS.NONE;
      handleModify();
      return;
    }
    await Alert({ text: message });
    onFailedByTextContent();
    reset();
    passStatusRef.current = REVIEW_PASS_STATUS.ALL;
  };

  useEffect(() => {
    passStatusRef.current = REVIEW_PASS_STATUS.ALL;
  }, []);

  useEffect(() => {
    if (!isSuccess) {
      return;
    }
    handleSuccess();
  }, [isSuccess]);

  useEffect(() => {
    if (!isError) {
      return;
    }
    // TODO: 타입 캐스팅 제거
    handleError(modifyError as AxiosError);
  }, [isError, modifyError]);

  return {
    isLoading,
    modifyReview: handleModify,
  };
};
