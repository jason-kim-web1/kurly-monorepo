import { useDispatch } from 'react-redux';
import { useEffect, useMemo } from 'react';

import { addHours } from 'date-fns';

import { find, reject } from 'lodash';

import { useAppSelector } from '../../shared/store';
import { loadMainPopupNotice, removeNoticePopup } from '../slice';
import { selectActiveMainPopupNotices } from '../main.selector';
import { loadClosedMainNotices, storeClosedMainNotice, storeMainNotice } from '../service/main-notice.storage.service';
import { isPC } from '../../../util/window/getDevice';
import { MainPopupNotice } from '../interfaces/PopupNotice.interface';

export default function useMainNoticePopup() {
  const { hasSession } = useAppSelector(({ auth }) => auth);
  const notices = useAppSelector(selectActiveMainPopupNotices);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!hasSession) {
      return;
    }
    dispatch(loadMainPopupNotice());
  }, [dispatch, hasSession]);

  const removePopup = (targetId: number) => (noShowHours: number) => {
    if (noShowHours > 0) {
      const noShowDate = addHours(Date.now(), noShowHours);
      storeMainNotice({ id: targetId, noShowTime: noShowDate.getTime() });
    } else {
      storeClosedMainNotice({ id: targetId });
    }

    dispatch(removeNoticePopup(targetId));
  };

  const popupNotices = useMemo(() => {
    if (isPC) return notices;

    const closedItems = loadClosedMainNotices();
    return reject(notices, (item) => find(closedItems, { id: item.id })) as MainPopupNotice[];
  }, [notices]);

  return { popupNotices, removePopup };
}
