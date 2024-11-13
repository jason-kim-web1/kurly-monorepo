import { ContentTypes } from './constants';

type LinkType = {
  appLink?: string;
  webLink?: string;
  type?: 'link' | 'tel' | 'conditional-link' | 'external-link';
};

type LinkAction = {
  buttonType?: string;
  pageName?: string;
  text?: string;
} & LinkType;

type SectionButton = {
  device?: ('pc' | 'moWeb' | 'webview')[];
  type?: 'link' | 'tel' | 'conditional-link' | 'external-link';
  id?: string;
  text?: string;
  condition?: {
    property: string;
    value: string;
  };
  styles?: string;
} & LinkType;

type StyleType = {
  backgroundColor?: string;
  textColor?: string;
  subTextColor?: string;
};

type SectionNotice = {
  title: string;
  list: { main: string; sub?: string[] }[];
  styles?: StyleType;
};

type ImageType = {
  id?: string;
  pcImageUrl?: string;
  moWebImageUrl?: string;
} & LinkType;

type ContentBody = {
  id?: string;
  styles?: StyleType;
  images?: ImageType[];
  buttons?: SectionButton[];
  notices?: SectionNotice;
  text?: string;
  list?: string[];
  tabs?: string[];
  terms?: string;
  benefit?: {
    type: 'random-number' | 'keyword';
    identifier?: string;
    code?: string;
    maxCount?: number;
  };
  config?: Config;
};

type Config = {
  publicationPeriod: { start: string; end: string };
};

type Content<T> = {
  type: T;
  title: string;
  body?: ContentBody;
  id: string;
  badge?: string;
};

type TabType = {
  id: string;
  title: string;
  badge?: string;
};

type ContentData<T> = {
  data: {
    content: Content<T>[];
  };
  error: Error | null;
  tabs?: TabType[];
};

type ContentTypeKey = typeof ContentTypes[keyof typeof ContentTypes];

export type { ContentBody, LinkType, SectionButton, LinkAction, ContentData, Content, TabType, ContentTypeKey };
