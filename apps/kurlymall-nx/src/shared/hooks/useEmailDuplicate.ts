import { useCallback, useMemo, useState } from 'react';

import { DuplicationKeys } from '../interfaces';
import { useDuplicateInfo } from './useDuplicateInfo';
import { EMAIL_REGEX } from '../constant';
import { useFormEvent } from './useFormEvent';

function useEmailDuplicate<T>() {
  const formEvent = useFormEvent<T>();

  const {
    values,
    context: { setFieldValue },
    validationEvents,
    handleChange,
  } = formEvent;

  const { email, originalEmail, isDuplicateCheckEmail } = values as unknown as {
    email: string;
    originalEmail: string;
    isDuplicateCheckEmail: boolean;
  };

  const { handleDuplicate, loading } = useDuplicateInfo();

  const [duplicateStatus, setDuplicateStatus] = useState<{
    status: null | 'success' | 'failed';
    message: null | string;
  }>({ status: null, message: null });

  const { touched, validationMessage } = useMemo(() => {
    return {
      touched: validationEvents('email').touched,
      validationMessage: validationEvents('email').validationMessage,
    };
  }, [validationEvents]);

  const handleDuplicateEmail = useCallback(
    async (params) => {
      const emailInput = params.value;

      if (originalEmail && originalEmail === emailInput) {
        return;
      }

      if (!new RegExp(EMAIL_REGEX).test(emailInput)) {
        return;
      }

      await handleDuplicate({
        value: emailInput,
        key: DuplicationKeys.EMAIL,
        validation: '',
        onSuccess: () => setDuplicateStatus({ status: 'success', message: '사용 가능한 이메일 입니다.' }),
        onFailure: () => setDuplicateStatus({ status: 'failed', message: '사용 불가능한 이메일 입니다.' }),
        onDuplicate: () => {
          setFieldValue('isDuplicateCheckEmail', false);
        },
        onNotDuplicate: () => {
          setFieldValue('isDuplicateCheckEmail', true);
        },
      });
    },
    [handleDuplicate, setFieldValue, originalEmail],
  );

  const handleChangeEmail = useCallback(
    (event: { name: string; value: string }) => {
      if (event.name === 'email') {
        if (originalEmail && originalEmail === event.value) {
          setFieldValue('isDuplicateCheckEmail', true);
        } else if (isDuplicateCheckEmail) {
          setFieldValue('isDuplicateCheckEmail', false);
        }
        setDuplicateStatus({ status: null, message: null });
      }
      handleChange(event);
    },
    [handleChange, originalEmail, isDuplicateCheckEmail, setFieldValue],
  );

  const inputGroupProps = useMemo(() => {
    return {
      touched,
      validationMessage,
      ...(duplicateStatus.status === 'failed' ? { validationMessage: duplicateStatus.message || '' } : {}),
      ...(duplicateStatus.status === 'success' && !validationMessage
        ? { successMessage: duplicateStatus.message || '' }
        : {}),
    };
  }, [duplicateStatus, touched, validationMessage]);

  return {
    inputGroupProps,
    email,
    loading,
    handleDuplicateEmail,
    handleChangeEmail,
  };
}

export default useEmailDuplicate;
