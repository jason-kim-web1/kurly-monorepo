import { isEmpty } from 'lodash';

import { DisplayType, CategoryType } from '../interfaces/Coupon.interfaces';
import HurdleButton from './HurdleButton';
import { isIosAccessVersion, makeCategoryLink, makeCategoryName, makeProductLink } from '../utils/conditionText';
import { getAppVersion, isWebview } from '../../../../../util/window/getDevice';
import { compareIosVersion } from '../constants';

interface Props {
  hurdleType: string;
  hurdleCategories: CategoryType[];
  displayHurdle: DisplayType;
  displayTarget: DisplayType;
}

export default function OrderHurdleLanding({ hurdleType, hurdleCategories, displayHurdle, displayTarget }: Props) {
  if (hurdleType === 'ALLOWED_CATEGORY' && !isEmpty(displayHurdle.allowedCategories)) {
    const isNonDuplicateCategories =
      displayTarget.allowedCategories.length !== displayHurdle.allowedCategories.length ||
      displayTarget.allowedCategories.some((item, index) => item.code !== displayHurdle.allowedCategories[index].code);

    if (!isNonDuplicateCategories) {
      return null;
    }

    const { name, code, siteKey, status } = displayHurdle.allowedCategories[0];

    const categoryName = makeCategoryName({ categories: hurdleCategories, displayCode: code, name });

    const isIosAccessVersionCheck = isIosAccessVersion({
      webview: isWebview(),
      userVer: getAppVersion(),
      compareVer: compareIosVersion,
    });

    return (
      <HurdleButton
        name={categoryName}
        isLinkAvailable={siteKey !== 'now' && status && isIosAccessVersionCheck}
        url={makeCategoryLink({ webview: isWebview(), code, siteKey })}
        categories={hurdleCategories?.[0]}
      />
    );
  }

  if (hurdleType === 'ALLOWED_PRODUCT' && !isEmpty(displayHurdle.allowedProducts)) {
    const isNonDuplicateProducts =
      displayTarget.allowedProducts.length !== displayHurdle.allowedProducts.length ||
      displayTarget.allowedProducts.some(
        (item, index) => item.contentsProductNo !== displayHurdle.allowedProducts[index].contentsProductNo,
      );

    if (!isNonDuplicateProducts) {
      return null;
    }

    const { dealProductName, contentsProductNo, siteAttributes } = displayHurdle.allowedProducts[0];
    return (
      <HurdleButton
        isLinkAvailable={siteAttributes[0] !== 'NOW'}
        name={dealProductName}
        url={makeProductLink({ webview: isWebview(), contentsProductNo })}
        contentsProductNo={contentsProductNo}
        dealProductName={dealProductName}
      />
    );
  }

  return null;
}
