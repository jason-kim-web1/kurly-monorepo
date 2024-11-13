import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '../shared/store';
import { loadMainNotices } from './service/main-notice.storage.service';
import { MainPopupNoticeAvailableSites } from './main.config';

const selectMain = ({ main }: RootState) => main;

export const selectActiveMainPopupNotices = createSelector([selectMain], ({ popupNotices, site }) => {
  if (!MainPopupNoticeAvailableSites.includes(site)) {
    return [];
  }

  const savedNoticeItems = loadMainNotices();
  const currentDateTime = Date.now();

  return popupNotices.filter((notice) => {
    const savedItem = savedNoticeItems.find(({ id }) => id === notice.id);

    if (!savedItem) {
      return true;
    }

    const { noShowTime } = savedItem;
    return noShowTime < currentDateTime;
  });
});
