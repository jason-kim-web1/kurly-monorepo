import { useCallback, useState } from 'react';

import { AxiosError } from 'axios';

import Alert from '../components/Alert/Alert';
import { getMemberInfoDuplicationStatus } from '../services';
import { BaseApiResponse, DuplicationKeys } from '../interfaces';

export function useDuplicateInfo() {
  const [loading, setLoading] = useState(false);

  const handleDuplicate = useCallback(
    async ({
      value,
      key,
      validation,
      onSuccess,
      onFailure,
      onDuplicate,
      onNotDuplicate,
    }: {
      value: string;
      key: DuplicationKeys;
      onSuccess: () => void;
      onFailure: () => void;
      validation?: string;
      onDuplicate?: () => void;
      onNotDuplicate?: () => void;
    }) => {
      if (!value || validation) {
        return;
      }

      try {
        setLoading(true);

        const isDuplicated = await getMemberInfoDuplicationStatus({ key, value });

        if (isDuplicated) {
          onFailure();
          onDuplicate?.();

          return;
        }

        onSuccess();
        onNotDuplicate?.();
      } catch (e) {
        const error = e as AxiosError<BaseApiResponse<{ message: string }>>;

        if (error.response?.status === 400) {
          await Alert({
            text: '세션 정보가 누락되었습니다. 페이지를 새로고침해주세요.',
            showConfirmButton: true,
            confirmButtonText: '새로고침',
            handleClickConfirmButton: () => {
              window.location.reload();
            },
          });
        } else {
          await Alert({
            text: error.response?.data.message ?? '중복 확인에 실패 하였습니다. 다시 시도해 주세요!',
          });
        }
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  return {
    handleDuplicate,
    loading,
  };
}
