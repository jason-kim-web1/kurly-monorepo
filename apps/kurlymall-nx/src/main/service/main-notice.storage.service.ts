import { loadLocalStorage, storeLocalStorage } from '../../shared/services/storage.service';
import { loadSessionStorage, storeSessionStorage } from '../../shared/services/session.storage.service';

const KEY = 'mainNotice';

interface MainNoticeItem {
  id: number;
  noShowTime: number;
}

export const loadMainNotices = (): MainNoticeItem[] => {
  return loadLocalStorage(KEY) || [];
};

export const storeMainNotice = (notice: MainNoticeItem) => {
  const previousNotices = loadMainNotices();

  return storeLocalStorage(KEY, [...previousNotices.filter(({ id }) => id !== notice.id), notice]);
};

export const loadClosedMainNotices = (): Omit<MainNoticeItem, 'noShowTime'>[] => {
  return loadSessionStorage(KEY) || [];
};

export const storeClosedMainNotice = (notice: Omit<MainNoticeItem, 'noShowTime'>) => {
  const previousNotices = loadClosedMainNotices();

  return storeSessionStorage(KEY, [...previousNotices.filter(({ id }) => id !== notice.id), notice]);
};
