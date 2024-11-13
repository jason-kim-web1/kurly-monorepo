import { verifyNormalUser } from '../../shared/services';
import { MemberBenefitPolicy } from '../../shared/interfaces';
import { Grade } from '../../shared/enums';

export const verifyBenefitUser = (
  userGrade: Grade,
  benefitRatio: number,
  isSubscribed: boolean,
  benefitPolicy?: string,
) => {
  if (!benefitPolicy) {
    return false;
  }

  const isNormalUser = verifyNormalUser(userGrade);
  const isEventNormalUser = isNormalUser && benefitRatio > 0;

  if (benefitPolicy !== MemberBenefitPolicy.MEMBER_BENEFIT_POLICY && isSubscribed) {
    return false;
  }

  return !isNormalUser || isEventNormalUser;
};
