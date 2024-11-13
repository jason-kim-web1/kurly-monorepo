import { RESOURCE_URL } from '../../../shared/configs/config';

export const kurlyFreshImgUrl = `${RESOURCE_URL}/images/event/kf365`;

export interface NavigatorMenu {
  id: string;
  name: string;
}

export interface ImageList {
  id: string;
  imageUrl: string;
}

export interface FreshCertifyInfo {
  id: string;
  name: string;
  infoText: string;
  infoImageUrl: string;
  infoImageUrlMo: string;
  imageList: ImageList[];
}

export const PC_NAV_IMG_URL = `${kurlyFreshImgUrl}/pc/tab_menu.jpg`;
export const ZOOM_ICON_URL = `${RESOURCE_URL}/mobile/service/goods/1903/ico_certify_zoom_v2.png`;
