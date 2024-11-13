import { AxiosResponse } from 'axios';

import { APP_DEVICE, DEVICE, URL_DATA } from '../constants';

export type LegoEventUrlParams = {
  lego: string;
  tempLego: string;
  isSubTab: string;
};

export interface IContent {
  html: string;
  scripts: string[];
  styles: string[];
}

export type FileUrlParam = {
  isPC: boolean;
  environment: keyof typeof URL_DATA;
  path: string;
};

export interface IWebStatus {
  appCheck: boolean;
  appDevice: keyof typeof APP_DEVICE;
  is_sess: boolean;
  is_release_build: boolean;
  device: keyof typeof DEVICE;
}

export interface IKurlyTracker {
  sendData: () => void;
  setAction: (eventName: string, eventData?: unknown) => ExtendedWindow['kurlyTracker'];
}

interface IKurlyApiParams {
  method: 'get' | 'post';
  url: string;
  data?: object;
}

export type KurlyApi = (params: IKurlyApiParams) => Promise<AxiosResponse>;

export type ExtendedWindow = Window &
  typeof globalThis & {
    webStatus: IWebStatus;
    kurlyApi: KurlyApi;
    _oldAlert: (message?: string) => void;
    kurlyTracker: IKurlyTracker;
  };

export interface VersionInfoUpdate {
  title: string;
  defaultVersion: string;
  updateInfos: {
    version: string;
    periods: [Date, Date];
  }[];
}

export type LegoInfoType = {
  id: string;
  legoUrl: string;
  legoUrlPerf: string;
  legoUrlStg: string;
  legoUrlDev: string;
};
