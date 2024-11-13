import type { ShowcaseType } from './index';

interface ShowcaseMetaResponse {
  name: string;
  code: number;
  imageUrl: string;
  shareUrl: string;
}

interface ShowcaseDataResponse {
  data: ShowcaseType;
  meta: ShowcaseMetaResponse;
}

interface ShowcaseMetaProps {
  id: string;
  title: string;
  description: string;
  image: string;
  url: string;
  shareUrl: string;
  type: string;
}

interface ShowcasePageProps {
  accessToken: string;
  data: ShowcaseType | null;
  meta: ShowcaseMetaProps;
}

export type { ShowcaseDataResponse, ShowcaseMetaResponse, ShowcasePageProps, ShowcaseMetaProps };
