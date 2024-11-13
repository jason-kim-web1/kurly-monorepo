import { add, differenceInSeconds } from 'date-fns';
import { AxiosError } from 'axios';

import { useCallback, useEffect, useState } from 'react';

import { useInterval } from './useInterval';

import { getVerificationInfo } from '../services';

import Alert from '../components/Alert/Alert';

const TimerSeconds = 180;

const createSecondToMinuteFormat = (seconds: number) => {
  const diffSeconds = seconds % 60;

  const diffMinutes = (seconds - diffSeconds) / 60;

  const formatMinutes = `0${diffMinutes}`.slice(-2);
  const formatSeconds = `0${diffSeconds}`.slice(-2);

  return `${formatMinutes}:${formatSeconds}`;
};

export function useVerification(expiredMessage?: string) {
  const [step, setStep] = useState<'INITIAL' | 'SENT' | 'SUCCESS'>('INITIAL');

  const [delay, setDelay] = useState<number>(1000);
  const [timer, setTimer] = useState(createSecondToMinuteFormat(TimerSeconds));
  const [remainCount, setRemainCount] = useState<Date>(new Date());
  const [loading, setLoading] = useState(false);

  const setRemainSeconds = useCallback((count: number) => {
    const newRemainCount = add(new Date(), { seconds: count });

    setRemainCount(newRemainCount);
  }, []);

  useInterval(() => {
    const currentDate = new Date();
    const diff = differenceInSeconds(remainCount, currentDate);
    if (diff < 0) {
      setDelay(0);
      setTimer(createSecondToMinuteFormat(0));
      setStep('INITIAL');
      void Alert({
        text: expiredMessage ?? '유효 시간이 만료되었습니다.\n다시 시도해 주세요.',
        returnFocus: false,
      });
      setLoading(false);
      return;
    }

    setTimer(createSecondToMinuteFormat(diff));
  }, delay);

  useEffect(() => {
    if (step !== 'SENT') {
      setDelay(0);
      return;
    }

    setTimer(createSecondToMinuteFormat(TimerSeconds));
    setDelay(1000);
  }, [step]);

  const handleRequestVerification = useCallback(
    async ({ path, mobileNumber }: { path: 'sign-up' | 'update-member'; mobileNumber: string }) => {
      try {
        setLoading(true);

        const { message } = await getVerificationInfo({
          path,
          mobileNumber,
        });

        await Alert({
          text: message || '인증번호가 발송되었습니다.',
          returnFocus: false,
        });

        setRemainSeconds(TimerSeconds);
        setStep('SENT');
      } catch (error) {
        await Alert({
          text: (error as AxiosError).response?.data?.message || '인증번호 요청 중 오류가 발생 했습니다.',
          returnFocus: false,
        });
      } finally {
        setLoading(false);
      }
    },
    [setRemainSeconds],
  );

  const handleCodeVerification = useCallback(
    async (
      { path, mobileNumber, authCode }: { path: 'sign-up' | 'update-member'; mobileNumber: string; authCode: string },
      onSuccess?: () => void,
      onFail?: () => void,
    ) => {
      try {
        setLoading(true);

        const { message } = await getVerificationInfo({
          path,
          mobileNumber,
          authCode,
        });

        setStep('SUCCESS');

        onSuccess?.();

        await Alert({
          text: message || '인증에 성공 하였습니다.',
          returnFocus: false,
        });
      } catch (error) {
        onFail?.();

        await Alert({
          text: (error as AxiosError).response?.data?.message || '인증코드 확인 중 오류가 발생했습니다.',
          returnFocus: false,
        });
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  return {
    step,
    timer,
    loading,
    setStep,
    setRemainSeconds,
    handleRequestVerification,
    handleCodeVerification,
  };
}
