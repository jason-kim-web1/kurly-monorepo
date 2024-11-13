import { toPairs, map, get, fromPairs, toNumber, toString, isEmpty } from 'lodash';
import { useRouter } from 'next/router';
import { useEffect, useState, useMemo, useCallback, useRef } from 'react';

import type { ParsedUrlQuery } from 'querystring';

import useInquiryProductsInvalidate from '../../../../products/hooks/useInquiryProductsInvalidate';
import useInquiryProductUpdateMutation from '../../../../products/hooks/useInquiryProductUpdateMutation';
import { isWebview } from '../../../../../../../util/window/getDevice';

import { INFINITE_QUERY_KEY } from '../../../../products/constants';

import Form from '../../../components/m/Form';
import CautionDialog from '../../../components/m/CautionDialog';
import LoadingForm from '../../../components/m/LoadingForm';
import Alert from '../../../../../../shared/components/Alert/Alert';

export interface URLBasedFormData {
  inquiryId: number;
  contentProductNo: number;
  subject: string;
  contents: string;
  isSecret: boolean;
}

const INVALID_ID = -1;
const INVALID_STR = INVALID_ID.toString();

type QueryParamTypeItem = {
  type: string;
  defaultValue: string | number | boolean;
};

const QUERY_PARAMS_TYPE_MAP: Record<keyof URLBasedFormData, QueryParamTypeItem> = {
  inquiryId: {
    type: 'number',
    defaultValue: INVALID_ID,
  },
  contentProductNo: {
    type: 'number',
    defaultValue: INVALID_ID,
  },
  subject: {
    type: 'string',
    defaultValue: INVALID_STR,
  },
  contents: {
    type: 'string',
    defaultValue: INVALID_STR,
  },
  isSecret: {
    type: 'boolean',
    defaultValue: false,
  },
};

const parseURLQueryParams = (query: ParsedUrlQuery): URLBasedFormData => {
  return fromPairs(
    map(toPairs(QUERY_PARAMS_TYPE_MAP), (queryItem) => {
      const [queryKey, content] = queryItem;
      const { type, defaultValue } = content;
      const targetQueryValue = get(query, queryKey);
      if (!targetQueryValue) {
        return [queryKey, defaultValue];
      }
      if (type === 'number') {
        return [queryKey, toNumber(targetQueryValue)];
      }
      if (type === 'string') {
        return [queryKey, toString(targetQueryValue)];
      }
      if (type === 'boolean') {
        return [queryKey, targetQueryValue === 'true'];
      }
      return [queryKey, defaultValue];
    }),
  ) as unknown as URLBasedFormData;
};

const FormContainer = () => {
  const isInitializedRef = useRef(false);
  const { query, replace } = useRouter();
  const [cautionDialogOpened, setCautionDialogOpened] = useState<boolean>(false);
  const originalFormData = useMemo(() => parseURLQueryParams(query), [query]);
  const [formData, setFormData] = useState<URLBasedFormData | null>(null);
  const { invalidate } = useInquiryProductsInvalidate(INFINITE_QUERY_KEY);
  const { mutate, isSuccess, isLoading, isError, reset } = useInquiryProductUpdateMutation();
  const isFormValid = useMemo(() => {
    if (!formData) {
      return false;
    }
    const { subject, contents } = formData;
    return !(isEmpty(subject) || isEmpty(contents));
  }, [formData]);

  const handleChange = useCallback((key: keyof URLBasedFormData, value: unknown) => {
    setFormData((prevState) => {
      const nextState = {
        ...prevState,
        [key]: value,
      } as URLBasedFormData;
      return nextState;
    });
  }, []);

  const handleSave = useCallback(() => {
    if (!originalFormData || !formData) {
      return;
    }
    const { contentProductNo, inquiryId } = originalFormData;
    mutate({
      productNo: contentProductNo,
      contentId: inquiryId,
      formData,
    });
  }, [mutate, formData, originalFormData]);

  const handleCloseCautionDialog = useCallback(() => setCautionDialogOpened(() => false), []);

  const handleNavigateToInquiryProductsList = useCallback(() => {
    const isWebViewEnv = isWebview();
    const url = isWebViewEnv ? '/webview/mypage/inquiry/products' : '/mypage/inquiry/products';
    replace(url);
  }, [replace]);

  const handleUpdateMutationSuccess = useCallback(async () => {
    if (!originalFormData || !formData) {
      return;
    }
    reset();
    const { inquiryId, contentProductNo } = originalFormData;
    const { contents, subject, isSecret } = formData;
    const isWebViewEnv = isWebview();
    const pathname = isWebViewEnv
      ? '/webview/mypage/inquiry/products/[inquiryId]'
      : '/mypage/inquiry/products/[inquiryId]';
    await replace({
      pathname,
      query: {
        inquiryId,
        contentProductNo,
        contents,
        subject,
        isSecret,
      },
    });
    await invalidate();
    await Alert({
      text: '문의가 정상적으로 등록되었습니다.',
      handleClickConfirmButton: handleNavigateToInquiryProductsList,
    });
  }, [originalFormData, formData, replace, reset, invalidate, handleNavigateToInquiryProductsList]);

  useEffect(() => {
    const isInitialized = isInitializedRef.current;
    if (!originalFormData) {
      return;
    }
    if (!isInitialized) {
      setCautionDialogOpened(() => true);
    }
    isInitializedRef.current = true;
    setFormData({ ...originalFormData });
  }, [originalFormData]);

  useEffect(() => {
    if (!isSuccess) {
      return;
    }
    handleUpdateMutationSuccess();
  }, [isSuccess, handleUpdateMutationSuccess]);

  useEffect(() => {
    if (!isError) {
      return;
    }
    reset();
    // TODO: 최대 재시도 횟수 제한
    Alert({
      text: '네트워크 오류가 발생했습니다.\n잠시후 다시 시도해 주세요.',
    });
  }, [isError, reset]);

  return (
    <main>
      {formData !== null ? (
        <Form {...formData} isValid={isFormValid} isLoading={isLoading} onChange={handleChange} onSave={handleSave} />
      ) : (
        <LoadingForm />
      )}
      <CautionDialog open={cautionDialogOpened} onClose={handleCloseCautionDialog} />
    </main>
  );
};

export default FormContainer;
