import { useMemo } from 'react';

const FirstStep = 0;

export default function useFirstStep(stepIndex: number) {
  const isFirstStep: boolean = useMemo(() => stepIndex === FirstStep, [stepIndex]);

  return {
    isFirstStep,
  };
}
