export const APP_DEVICE = {
  android: 'A',
  ios: 'I',
} as const;

export const DEVICE = {
  pc: 'pc',
  mobile: 'mobile',
} as const;

export const URL_DATA = {
  production: '',
  stage: 'stg',
  performance: 'stg',
  development: 'dev',
  localhost: 'dev',
} as const;

export const DEFAULT_EVENT_NAME = {
  VIEW_EVENT_DETAIL: 'view_event_detail',
  VIEW_EVENT_DETAIL_25: 'view_event_detail_25%',
  VIEW_EVENT_DETAIL_50: 'view_event_detail_50%',
  VIEW_EVENT_DETAIL_75: 'view_event_detail_75%',
  VIEW_EVENT_DETAIL_100: 'view_event_detail_100%',
  SHARE_EVENT: 'share_event',
};
