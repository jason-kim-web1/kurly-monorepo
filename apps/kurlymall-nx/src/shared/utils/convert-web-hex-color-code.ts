import { hexColorRegex } from '../constant';

/**
 * @param appColorCode APP의 hex color code 형태 #AARRGGBB
 * @returns WEB hex color code 형태 #RRGGBBAA
 */
const convertWebHexColorCode = (appColorCode: string) => {
  if (!hexColorRegex.test(appColorCode)) return;
  return `#${appColorCode.slice(3)}${appColorCode.slice(1, 3)}`;
};

export default convertWebHexColorCode;
