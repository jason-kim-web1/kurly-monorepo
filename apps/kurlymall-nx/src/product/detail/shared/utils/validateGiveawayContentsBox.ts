import { isNotEmpty } from '../../../../shared/utils/lodash-extends';

import { ProductDetailGiveawayContentsBox } from '../../types';

export const hasGiveawayContentsBox = (giveawayContentsBox: ProductDetailGiveawayContentsBox) => {
  return isNotEmpty(giveawayContentsBox);
};

export const validateGiveawayContentsBox = (
  giveawayContentsBox: ProductDetailGiveawayContentsBox,
): giveawayContentsBox is NonNullable<ProductDetailGiveawayContentsBox> => {
  if (!hasGiveawayContentsBox(giveawayContentsBox)) {
    return false;
  }

  if (!giveawayContentsBox?.bannerImage || !giveawayContentsBox?.mainImage) {
    return false;
  }

  if (!giveawayContentsBox.bannerImage.productContentsBoxBannerUrl || !giveawayContentsBox.bannerImage.text) {
    return false;
  }

  if (!giveawayContentsBox.mainImage.productContentsBoxMainUrl) {
    return false;
  }

  if (!giveawayContentsBox.term || !giveawayContentsBox.attention) {
    return false;
  }

  return true;
};
