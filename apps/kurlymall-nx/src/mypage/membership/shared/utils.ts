import { isAfter } from 'date-fns';

import { amplitudeService } from '../../../shared/amplitude';
import {
  SelectMembershipCollection,
  SelectMembershipUnsubscribeConfirm,
} from '../../../shared/amplitude/events/membership';
import { MemberBenefitUpdate } from '../../../shared/api/events/member/benefit.api';

interface AmplitudeButton {
  pageName: 'survey' | 'confirmsheet' | 'confirmsheet_agreement';
  message: string;
  clickAction: () => void | Promise<void>;
}
interface MembershipCollectionSelectionType {
  selectionType: 'item' | 'all';
}

export const handleClickUnsubscribeConfirm = ({ pageName, message, clickAction }: AmplitudeButton) => {
  amplitudeService.logEvent(
    new SelectMembershipUnsubscribeConfirm({
      pageName,
      message,
    }),
  );
  clickAction();
};

export const getUpdateData = (data?: MemberBenefitUpdate) => {
  if (!data) {
    return null;
  }
  const isUpdateDate = isAfter(new Date(), new Date(data.updateDate));
  return isUpdateDate ? data.updateVersion : data.defaultVersion;
};

export const logEventMembershipCollection = ({ selectionType }: MembershipCollectionSelectionType) => {
  amplitudeService.logEvent(new SelectMembershipCollection({ selectionType }));
};
