import { useCallback, useState } from 'react';

import Alert from '../../../shared/components/Alert/Alert';
import { getRecommendUserInfo } from '../../../shared/services';
import { DuplicationKeys } from '../../../shared/interfaces';

export default function useVerifyExistent() {
  const [isLoading, setLoading] = useState(false);
  const [verified, setVerified] = useState(false);
  const [memberId, setMemberId] = useState('');

  const handleVerifyExistent = useCallback(async () => {
    if (!memberId) {
      await Alert({
        text: '아이디를 입력해 주세요',
      });
      return;
    }

    setLoading(true);

    try {
      const isExistent = await getRecommendUserInfo({
        key: DuplicationKeys.MEMBER_ID,
        value: memberId,
      });

      let existentMessage;

      if (isExistent) {
        existentMessage = '존재하는 아이디 입니다.\n친구초대 이벤트에 참여 가능해요.';
        setVerified(true);
      } else {
        existentMessage = '존재하지 않는 아이디 입니다.';
      }

      await Alert({
        text: existentMessage,
      });
    } catch (_) {
      await Alert({
        text: '조회에 실패 하였습니다.',
      });
    } finally {
      setLoading(false);
    }
  }, [memberId]);

  const clearVerified = () => {
    if (verified) {
      setVerified(false);
    }

    if (isLoading) {
      setLoading(false);
    }
  };

  return {
    handleVerifyExistent,
    verified,
    isLoading,
    setMemberId,
    clearVerified,
  };
}
