import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import useGetPersonalCustomsCode from './queries/useGetPersonalCustomsCode';
import useMutatePersonalCustomsCode from './queries/useMutatePersonalCustomsCode';
import { isPC, isWebview } from '../../../../../util/window/getDevice';
import appService from '../../../../shared/services/app.service';
import { REFETCH_PERSONAL_CUSTOMS_CODE } from '../interfaces/CustomMessageEvent';
import { notify } from '../../../../shared/reducers/page';

const checkValidation = (value: string) => {
  if (value === '') {
    return '개인통관고유부호를 입력해 주세요.';
  }
  if (!/^P\d{12}$/.test(value)) {
    return '개인통관고유부호가 올바르지 않습니다.\n영문대문자와 숫자를 포함한 13자리를 입력해주세요.';
  }
};

const usePersonalCustomsCodeForm = () => {
  const dispatch = useDispatch();
  const { data, isLoading, isError } = useGetPersonalCustomsCode();
  const { mutateAsync } = useMutatePersonalCustomsCode();

  const [editingPersonalCustomsCode, setEditingPersonalCustomsCode] = useState('');
  const [isAgreed, setIsAgreed] = useState(false);

  const savedPersonalCustomsCode = data?.personalCustomsCode;

  const disabledSaveButton = !savedPersonalCustomsCode && !isAgreed;

  const hasPCC = !!data?.personalCustomsCode;

  const showAgreeCheckbox = !isLoading && !hasPCC;

  const handleChange = (params: { name?: string | undefined; value: string }) => {
    setEditingPersonalCustomsCode(params.value);
  };

  const handleClickCheckbox = () => {
    setIsAgreed(!isAgreed);
  };

  const handleSubmit = async () => {
    const validationMessage = checkValidation(editingPersonalCustomsCode);

    if (validationMessage) {
      dispatch(notify(validationMessage));
      return;
    }

    await mutateAsync(editingPersonalCustomsCode);

    if (isWebview()) {
      appService.closeWebview({ callback_function: `${REFETCH_PERSONAL_CUSTOMS_CODE}()` });
    } else {
      const messageType = { type: REFETCH_PERSONAL_CUSTOMS_CODE };
      const target = isPC ? window.opener : window.parent;

      target?.postMessage(messageType, origin);

      if (isPC) window.close();
    }
  };

  useEffect(() => {
    if (data) {
      setEditingPersonalCustomsCode(data.personalCustomsCode);
    }
  }, [data]);

  return {
    isLoading,
    isError,
    isAgreed,
    showAgreeCheckbox,
    savedPersonalCustomsCode,
    editingPersonalCustomsCode,
    disabledSaveButton,
    handleChange,
    handleClickCheckbox,
    handleSubmit,
  };
};

export default usePersonalCustomsCodeForm;
