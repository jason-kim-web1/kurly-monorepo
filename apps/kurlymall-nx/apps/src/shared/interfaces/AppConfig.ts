import { MainSite } from '../../main/interfaces/MainSection.interface';

export enum SiteType {
  RECOMMENDATION = 'recommendation',
  WEBVIEW = 'webview',
  COLLECTION_GROUP = 'collection_group',
  COLLECTION_GROUP_GALLERY = 'collection_group_gallery',
  COLLECTION = 'collection',
  BANNER = 'banner',
}

export enum BadgeType {
  NEW = 'new',
  HOT = 'hot',
  DOT = 'dot',
}

export interface TabInfo {
  id: string;
  name: string;
  type: SiteType;
  pageKey: string | null;
  badge: BadgeType | null;
  refreshHours: number[] | null;
  segmentFilter: string[];
}

export interface SiteInfo {
  id: Lowercase<MainSite>;
  name: string;
  tabInfos: TabInfo[];
}

export interface ElectronicBoard {
  startDateTime: string;
  endDateTime: string;
}
export interface AppConfig {
  defaultSite: Lowercase<MainSite>;
  mainSiteShowPolicy: null;
  siteInfos: SiteInfo[];
  electronicBoard: ElectronicBoard;
}
