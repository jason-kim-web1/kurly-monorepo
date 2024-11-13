import { TabInfo } from '../../interfaces/AppConfig';

type RequiredTabInfo = Pick<TabInfo, 'id' | 'name' | 'badge' | 'segmentFilter' | 'type' | 'pageKey'> & {
  link: string;
};

export type { RequiredTabInfo };
