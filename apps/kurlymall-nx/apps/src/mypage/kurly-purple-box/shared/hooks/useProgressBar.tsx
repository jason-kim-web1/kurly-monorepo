import { useCallback, useState } from 'react';

import { COMPLETED, REQUESTED } from '../constants/requestConstant';
import { useCompleteRequest } from './usePersonalBoxQuery';
import { RequestStateType } from '../types/requestStateType';

export default function useProgressBar(personalBox: RequestStateType | '' | undefined) {
  const [progressBarWidth, setProgressBarWidth] = useState(0);
  const { data: completeRequest } = useCompleteRequest();

  const progressBarAnimation = useCallback(() => {
    if (completeRequest) {
      return;
    }
    const animationTimer = setTimeout(() => {
      if (personalBox === 'REQUESTED') {
        setProgressBarWidth(REQUESTED);
      } else {
        setProgressBarWidth(COMPLETED);
      }
      clearTimeout(animationTimer);
    }, 200);
  }, [completeRequest, personalBox]);
  return {
    progressBarWidth,
    progressBarAnimation,
  };
}
