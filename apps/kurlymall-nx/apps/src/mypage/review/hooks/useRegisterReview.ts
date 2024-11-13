import { useEffect, useRef } from 'react';
import { eq, get } from 'lodash';
import type { AxiosError } from 'axios';

import type { ReviewPassStatusType } from '../types';
import { ALERT_MESSAGES, REVIEW_PASS_RESULT_STATUS, REVIEW_PASS_STATUS } from '../constants';
import { useCreateReview } from './index';
import { getOnline } from '../../../shared/utils/getOnline';
import Alert, { checkClosedByBackDrop } from '../../../shared/components/Alert/Alert';
import { getErrorMessage } from '../../../shared/utils/getErrorMessage';
import { ignoreError } from '../../../shared/utils/general';
import {
  logReviewRegister,
  logReviewRegisterSuccess,
  logReviewRegisterNotification,
  logReviewRegisterNotificationSelect,
} from '../ProductReview.service';
import { SELECTION_TYPES } from '../../../shared/amplitude/events/review/SelectSubmitReviewNotification';

interface Options {
  orderNo: number;
  dealProductNo: number;
  registerData: {
    contents: string;
    uploadImages: string[];
  };
  onSuccess(): void;
  onFailedByTextContent(): void;
  onOfflineRetryCancel(): void;
}

export const useRegisterReview = (options: Options) => {
  const { orderNo, dealProductNo, registerData, onSuccess, onFailedByTextContent, onOfflineRetryCancel } = options;
  const submitTryCountRef = useRef<number>(0);
  const passStatusRef = useRef<ReviewPassStatusType>(REVIEW_PASS_STATUS.ALL);
  const {
    mutateAsync,
    isLoading,
    isSuccess,
    isError,
    error: registerError,
    reset,
  } = useCreateReview(orderNo, dealProductNo);

  const handleRegister = async (isRetry?: boolean) => {
    submitTryCountRef.current += 1;
    if (!isRetry) {
      logReviewRegister(eq(submitTryCountRef.current, 1));
    }
    if (!getOnline()) {
      logReviewRegisterNotification('NULL');
      const { isConfirmed, dismiss } = await Alert({
        text: ALERT_MESSAGES.CONFIRM_RETRY_REGISTRATION,
        showCancelButton: true,
        confirmButtonText: '재시도',
      });
      const isChooseNothing = checkClosedByBackDrop(dismiss);
      if (isChooseNothing) {
        logReviewRegisterNotificationSelect('NULL', SELECTION_TYPES.EDIT);
        return;
      }
      if (!isConfirmed) {
        logReviewRegisterNotificationSelect('NULL', SELECTION_TYPES.BACK);
        onOfflineRetryCancel();
        return;
      }
      handleRegister(true);
      return;
    }

    ignoreError(async () => {
      await mutateAsync({
        ...registerData,
        passStatus: passStatusRef.current,
      });
    });
  };

  const handleSuccess = async () => {
    onSuccess();
    logReviewRegisterSuccess();
  };

  const handleError = async (error: AxiosError | null) => {
    const resultPassStatus = get(error, 'response.data.data.status', 'NULL');
    const message = getErrorMessage(error as AxiosError);
    logReviewRegisterNotification(resultPassStatus);
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
        logReviewRegisterNotificationSelect(resultPassStatus, SELECTION_TYPES.EDIT);
        onFailedByTextContent();
        reset();
        return;
      }
      passStatusRef.current = REVIEW_PASS_STATUS.NONE;
      logReviewRegisterNotificationSelect(resultPassStatus, SELECTION_TYPES.SUBMIT);
      handleRegister(true);
      return;
    }
    await Alert({ text: message });
    logReviewRegisterNotificationSelect(resultPassStatus, SELECTION_TYPES.EDIT);
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
    handleError(registerError);
  }, [isError, registerError]);

  return {
    isLoading,
    registerReview: handleRegister,
  };
};
