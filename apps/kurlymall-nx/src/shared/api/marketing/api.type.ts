import { Content } from '../../../marketing/shared/type';
import { VipLevelType } from '../../../member/shared/constants';

type MetaResponse = {
  title: string;
  defaultVersion: string;
  updateVersion: string;
  updateDate: Date;
};

type ContentResponse<T> = {
  pages: { level: VipLevelType | 'common'; content: Content<T>[] }[];
};

export type { MetaResponse, ContentResponse };
