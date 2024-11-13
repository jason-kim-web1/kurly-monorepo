import { isMobileWeb, isPC, isWebview } from '../../../util/window/getDevice';

const ContentTypes = {
  Image: 'image',
  Tabs: 'tabs',
  Text: 'text',
  Summary: 'summary',
  Information: 'information',
} as const;

const DEVICE_MAP = {
  pc: isPC,
  moWeb: isMobileWeb && !isWebview(),
  webview: isWebview(),
};

export { ContentTypes, DEVICE_MAP };
