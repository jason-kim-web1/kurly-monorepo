import { head } from 'lodash';

import { isMobileDevice } from '../../../../../util/window/getDevice';

import { GroupMemberSubOption } from '../../types';

export const getProductOptions = (members: GroupMemberSubOption[]) => {
  return members.map((it) => {
    if (!it.subOptions) {
      return {
        id: it.contentsProductNo ?? 0,
        value: String(it.contentsProductNo),
        name: it.description ?? '',
        imageUrl: it.imageUrl ?? '',
        disabled: it.isSoldOut ?? true,
      };
    }

    const subOptionsHead = head(it.subOptions);

    if (!subOptionsHead) {
      return { id: 0, value: '', name: '', disabled: true };
    }

    const filteredNotSoldOut = it.subOptions.filter((sub) => !sub.isSoldOut);
    const isSoldOut = filteredNotSoldOut.length === 0;

    return {
      id: subOptionsHead.contentsProductNo ?? 0,
      value: String(subOptionsHead.contentsProductNo),
      name: it.description ?? '',
      imageUrl: subOptionsHead.imageUrl ?? '',
      disabled: isSoldOut ?? true,
    };
  });
};

export function getProductOptionLinkUrl(targetNumber: string) {
  if (isMobileDevice) {
    return `/m/goods/${targetNumber}`;
  }

  return `/goods/${targetNumber}`;
}
