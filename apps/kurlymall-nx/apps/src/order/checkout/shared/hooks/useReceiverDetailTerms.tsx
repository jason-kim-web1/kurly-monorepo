import { useEffect, useState } from 'react';

import useToggle from './useToggle';
import { ignoreError } from '../../../../shared/utils/general';
import { getReceiverDetailTerms } from '../utils/getReceiverDetailTerms';

export const useReceiverDetailTerms = () => {
  const [terms, setTerms] = useState<string>();
  const { isOpen, toggle } = useToggle();

  useEffect(() => {
    ignoreError(async () => {
      const result = await getReceiverDetailTerms();
      setTerms(result);
    });
  }, []);

  return { terms, isOpen, handleClickToggleButton: toggle };
};
