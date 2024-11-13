import { useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';

import { putPersonalCustomsCode } from '../../../../../shared/api';
import { notify } from '../../../../../shared/reducers/page';

const useMutatePersonalCustomsCode = () => {
  const dispatch = useDispatch();
  const queryResult = useMutation(putPersonalCustomsCode);
  const { error } = queryResult;

  useEffect(() => {
    if (error instanceof Error) {
      dispatch(notify(error.message));
    }
  }, [error, dispatch]);

  return queryResult;
};

export default useMutatePersonalCustomsCode;
