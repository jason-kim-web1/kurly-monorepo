import { isEmpty } from 'lodash';

import { ContentType, GroupKeyType } from '../detail/types';

interface Props {
  dealProductLength: number;
  isGroupProduct: boolean;
  groupKeys: {
    title: string;
    descriptionType: GroupKeyType;
  }[];
}

export const getContentType = ({ dealProductLength, isGroupProduct, groupKeys }: Props): ContentType => {
  if (dealProductLength > 1) {
    return 'MULTI';
  }

  if (!isGroupProduct) {
    return 'SINGLE';
  }

  const isReservationContents = groupKeys.filter((key) => key.descriptionType === 'YEAR_MONTH_DAY');

  if (!isEmpty(isReservationContents)) {
    return 'CALENDAR';
  }

  return 'OPTION';
};
