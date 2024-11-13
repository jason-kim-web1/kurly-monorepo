export type PrivacyPolicyStatusType = 'AGREE' | 'DISAGREE' | 'EXPIRED';

export const PrivacyPolicyStatus: Record<PrivacyPolicyStatusType, PrivacyPolicyStatusType> = {
  AGREE: 'AGREE',
  DISAGREE: 'DISAGREE',
  EXPIRED: 'EXPIRED',
};
