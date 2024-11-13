import { RESOURCE_URL } from '../configs/config';

export const LINK_TAG_ATTR_LIST = [
  {
    rel: 'shortcut icon',
    href: `${RESOURCE_URL}/favicon.ico`,
  },
  {
    rel: 'icon',
    href: `${RESOURCE_URL}/favicon.ico`,
  },
  {
    rel: 'icon',
    type: 'image/png',
    sizes: '16x16',
    href: `${RESOURCE_URL}/icons/favicon-16x16.png`,
  },
  {
    rel: 'icon',
    type: 'image/png',
    sizes: '32x32',
    href: `${RESOURCE_URL}/icons/favicon-32x32.png`,
  },
  {
    rel: 'apple-touch-icon',
    sizes: '128x128',
    href: `${RESOURCE_URL}/icons/favicon-128x128.png`,
  },
  {
    rel: 'apple-touch-icon',
    sizes: '144x144',
    href: `${RESOURCE_URL}/icons/favicon-144x144.png`,
  },
  {
    rel: 'apple-touch-icon',
    sizes: '152x152',
    href: `${RESOURCE_URL}/icons/favicon-152x152.png`,
  },
  {
    rel: 'apple-touch-icon',
    sizes: '167x167',
    href: `${RESOURCE_URL}/icons/favicon-167x167.png`,
  },
  {
    rel: 'apple-touch-icon',
    sizes: '180x180',
    href: `${RESOURCE_URL}/icons/favicon-180x180.png`,
  },
  {
    rel: 'apple-touch-icon',
    sizes: '192x192',
    href: `${RESOURCE_URL}/icons/favicon-192x192.png`,
  },
  {
    rel: 'apple-touch-startup-image',
    media: '(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2)',
    href: `${RESOURCE_URL}/images/splashs/iphone5_splash.png`,
  },
  {
    rel: 'apple-touch-startup-image',
    media: '(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2)',
    href: `${RESOURCE_URL}/images/splashs/iphone6_splash.png`,
  },
  {
    rel: 'apple-touch-startup-image',
    media: '(device-width: 621px) and (device-height: 1104px) and (-webkit-device-pixel-ratio: 3)',
    href: `${RESOURCE_URL}/images/splashs/iphoneplus_splash.png`,
  },
  {
    rel: 'apple-touch-startup-image',
    media: '(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3)',
    href: `${RESOURCE_URL}/images/splashs/iphonex_splash.png`,
  },
  {
    rel: 'apple-touch-startup-image',
    media: '(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2)',
    href: `${RESOURCE_URL}/images/splashs/iphonexr_splash.png`,
  },
  {
    rel: 'apple-touch-startup-image',
    media: '(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3)',
    href: `${RESOURCE_URL}/images/splashs/iphonexsmax_splash.png`,
  },
  {
    rel: 'apple-touch-startup-image',
    media: '(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2)',
    href: `${RESOURCE_URL}/images/splashs/ipad_splash.png`,
  },
  {
    rel: 'apple-touch-startup-image',
    media: '(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2)',
    href: `${RESOURCE_URL}/images/splashs/ipadpro1_splash.png`,
  },
  {
    rel: 'apple-touch-startup-image',
    media: '(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2)',
    href: `${RESOURCE_URL}/images/splashs/ipadpro3_splash.png`,
  },
  {
    rel: 'apple-touch-startup-image',
    media: '(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2)',
    href: `${RESOURCE_URL}/images/splashs/ipadpro2_splash.png`,
  },
] as const;
