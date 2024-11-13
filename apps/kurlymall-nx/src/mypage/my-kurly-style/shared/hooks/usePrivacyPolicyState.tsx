import { useMemo } from 'react';
import { isEmpty } from 'lodash';

export default function usePrivacyPolicyState(privacyPolicyStatus: string) {
  const isAgreement = useMemo(
    () => privacyPolicyStatus === 'AGREE', //약관 동의 상태
    [privacyPolicyStatus],
  );

  const isDisagreement = useMemo(
    () => privacyPolicyStatus === 'DISAGREE', //약관 미동의 상태
    [privacyPolicyStatus],
  );

  const updatedPrivacyPolicy = useMemo(
    () => privacyPolicyStatus === 'EXPIRED', //새로운 약관이 업데이트 된 상태
    [privacyPolicyStatus],
  );

  const changePrivacyPolicyStatus = useMemo(
    () => privacyPolicyStatus !== 'AGREE' && !isEmpty(privacyPolicyStatus), //약관 미동의 상태거나, 새로운 약관이 업데이트 된 상태
    [privacyPolicyStatus],
  );

  return {
    isAgreement,
    isDisagreement,
    updatedPrivacyPolicy,
    changePrivacyPolicyStatus,
  };
}
