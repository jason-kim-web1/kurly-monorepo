export interface SubMenuLists {
  name: string;
  url: string;
}

export interface SubMenuInfo {
  id: number;
  title?: string;
  lists?: SubMenuLists[];
}

export interface IntroduceMenu {
  id: number;
  name: string;
  url: string;
  subMenuInfo?: SubMenuInfo[];
  isExternalLink?: boolean;
}
