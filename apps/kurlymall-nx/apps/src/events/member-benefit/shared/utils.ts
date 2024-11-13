import { isAfter } from 'date-fns';

import { MemberBenefitUpdate } from '../../../shared/api/events/member/benefit.api';

export const getMemberBenefitUpdate = (data?: MemberBenefitUpdate) => {
  if (!data) {
    return null;
  }
  const isUpdateDate = isAfter(new Date(), new Date(data.updateDate));
  return isUpdateDate ? data.updateVersion : data.defaultVersion;
};
